#!/usr/bin/env node
/** Remove worker custom domains so zone CNAME can take over */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ACCOUNT = '26638150902bc9aee806c25fb3a1a06c';
const HOSTS = ['taj.nounmotion.store', 'turkishhouse.nounmotion.store', 'tawaheen.nounmotion.store'];

const token = readFileSync(
  join(homedir(), 'AppData/Roaming/xdg.config/.wrangler/config/default.toml'),
  'utf8',
).match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];

async function cf(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    signal: AbortSignal.timeout(60000),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  return res.json();
}

const domains = await cf(`/accounts/${ACCOUNT}/workers/domains`);
for (const host of HOSTS) {
  const hit = domains.result?.find((d) => d.hostname === host);
  if (!hit) {
    console.log(`${host}: no worker domain`);
    continue;
  }
  const del = await cf(`/accounts/${ACCOUNT}/workers/domains/${hit.id}`, { method: 'DELETE' });
  console.log(`${host}:`, del.success ? 'removed' : JSON.stringify(del.errors));
}
