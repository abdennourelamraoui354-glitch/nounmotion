#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ZONE_ID = 'fd607c0ad343acb62232835626b67e0d';
const ACCOUNT = '26638150902bc9aee806c25fb3a1a06c';

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
if (!token) throw new Error('No Cloudflare token');

const sites = [
  { name: 'taj', ep: 'nounmotion-taj.znnri1.easypanel.host', worker: 'taj-site' },
  { name: 'turkishhouse', ep: 'nounmotion-turkishhouse.znnri1.easypanel.host', worker: 'turkishhouse-site' },
  { name: 'tawaheen', ep: 'nounmotion-tawaheen.znnri1.easypanel.host', worker: 'tawaheen-site' },
];

const workerDomains = await cf(token, `/accounts/${ACCOUNT}/workers/domains`);
console.log('Worker custom domains:');
for (const s of sites) {
  const hit = workerDomains.result?.find((d) => d.hostname === `${s.name}.nounmotion.store`);
  console.log(`  ${s.name}.nounmotion.store → ${hit ? hit.service : 'MISSING'}`);
}

console.log('\nZone DNS records:');
for (const s of sites) {
  const fqdn = `${s.name}.nounmotion.store`;
  const list = await cf(token, `/zones/${ZONE_ID}/dns_records?name=${fqdn}`);
  const recs = list.result ?? [];
  console.log(`  ${fqdn}:`, recs.length ? recs.map((r) => `${r.type} ${r.content}`).join(' | ') : 'NONE');
}

console.log('\nGoogle DoH:');
for (const s of sites) {
  const r = await fetch(`https://dns.google/resolve?name=${s.name}.nounmotion.store&type=A`);
  const j = await r.json();
  const ips = j.Answer?.map((a) => a.data).join(', ') || `Status ${j.Status}`;
  console.log(`  ${s.name}.nounmotion.store → ${ips}`);
}
