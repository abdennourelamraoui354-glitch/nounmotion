#!/usr/bin/env node
/** Cloudflare DNS: tawaheen.nounmotion.store → EasyPanel */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ZONE_ID = 'fd607c0ad343acb62232835626b67e0d';
const NAME = 'tawaheen';
const TARGET = 'nounmotion-tawaheen.znnri1.easypanel.host';

function readWranglerToken() {
  const cfg = readFileSync(
    join(homedir(), 'AppData/Roaming/xdg.config/.wrangler/config/default.toml'),
    'utf8',
  );
  return cfg.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
}

async function cf(token, path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  return res.json();
}

const token = process.env.CLOUDFLARE_API_TOKEN || readWranglerToken();
const fqdn = `${NAME}.nounmotion.store`;

const list = await cf(token, `/zones/${ZONE_ID}/dns_records?name=${fqdn}`);
if (!list.success) throw new Error(JSON.stringify(list.errors));

const existing = list.result?.find((r) => r.type === 'CNAME' || r.type === 'A' || r.type === 'AAAA');
const body = { type: 'CNAME', name: NAME, content: TARGET, proxied: true, ttl: 1 };

if (existing) {
  if (existing.type === 'CNAME' && existing.content === TARGET && existing.proxied) {
    console.log(`DNS already OK: ${fqdn} → ${TARGET}`);
  } else {
    const upd = await cf(token, `/zones/${ZONE_ID}/dns_records/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    if (!upd.success) throw new Error(JSON.stringify(upd.errors));
    console.log(`DNS updated: ${fqdn} → ${TARGET}`);
  }
} else {
  const created = await cf(token, `/zones/${ZONE_ID}/dns_records`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!created.success) throw new Error(JSON.stringify(created.errors));
  console.log(`DNS created: ${fqdn} → ${TARGET}`);
}
