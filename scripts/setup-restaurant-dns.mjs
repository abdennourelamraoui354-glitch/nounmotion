#!/usr/bin/env node
/** Ensure taj + turkishhouse DNS CNAME → EasyPanel (proxied) */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ZONE_ID = 'fd607c0ad343acb62232835626b67e0d';

const SITES = [
  { name: 'taj', target: 'nounmotion-taj.znnri1.easypanel.host' },
  { name: 'turkishhouse', target: 'nounmotion-turkishhouse.znnri1.easypanel.host' },
];

function readWranglerToken() {
  const cfg = readFileSync(
    join(homedir(), 'AppData/Roaming/xdg.config/.wrangler/config/default.toml'),
    'utf8',
  );
  return cfg.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
}

async function cf(token, path, init = {}) {
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
        ...init,
        signal: AbortSignal.timeout(30000),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...(init.headers || {}),
        },
      });
      const j = await res.json();
      if (!j.success) throw new Error(`${path}: ${JSON.stringify(j.errors)}`);
      return j;
    } catch (e) {
      lastErr = e;
      console.warn(`CF API retry ${i + 1}/3:`, e.message);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
  throw lastErr;
}

const token = process.env.CLOUDFLARE_API_TOKEN || readWranglerToken();
if (!token) throw new Error('No Cloudflare token');

for (const { name, target } of SITES) {
  const fqdn = `${name}.nounmotion.store`;
  const list = await cf(token, `/zones/${ZONE_ID}/dns_records?name=${fqdn}`);
  const existing = list.result?.find((r) => r.type === 'CNAME' || r.type === 'A' || r.type === 'AAAA');
  const body = { type: 'CNAME', name, content: target, proxied: true, ttl: 1 };

  if (existing) {
    await cf(token, `/zones/${ZONE_ID}/dns_records/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    console.log(`Updated: ${fqdn} → ${target}`);
  } else {
    await cf(token, `/zones/${ZONE_ID}/dns_records`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log(`Created: ${fqdn} → ${target}`);
  }
}
