#!/usr/bin/env node
/**
 * Fix tawaheen.nounmotion.store DNS + add tah.nounmotion.store alias.
 * Uses EasyPanel for domain + Cloudflare worker redeploy.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const EP = process.env.EASYPANEL_URL || 'http://76.13.43.170:3000';
const ACCOUNT = '26638150902bc9aee806c25fb3a1a06c';
const PROJECT = 'nounmotion';
const SERVICE = 'tawaheen';
const ALIAS_HOST = 'tah.nounmotion.store';
const PRIMARY_HOST = 'tawaheen.nounmotion.store';

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;
if (!password) throw new Error('Set EASYPANEL_PASSWORD or pass as argv[3]');

function cfToken() {
  const cfg = readFileSync(
    join(homedir(), 'AppData/Roaming/xdg.config/.wrangler/config/default.toml'),
    'utf8',
  );
  return cfg.match(/oauth_token\s*=\s*"([^"]+)"/)?.[1];
}

async function cf(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfToken()}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  return text ? JSON.parse(text) : { success: res.ok };
}

async function trpc(name, body, token) {
  const res = await fetch(`${EP}/api/trpc/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

async function trpcGet(name, input, token) {
  const q = encodeURIComponent(JSON.stringify({ json: input }));
  const res = await fetch(`${EP}/api/trpc/${name}?input=${q}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

async function ensureEpDomain(token, host) {
  const domains =
    (await trpcGet('domains.listDomains', { projectName: PROJECT, serviceName: SERVICE }, token))
      ?.result?.data?.json ?? [];
  if (domains.some((d) => d.host === host)) {
    console.log(`   EP domain OK: ${host}`);
    return;
  }
  await trpc(
    'domains.createDomain',
    {
      json: {
        id: crypto.randomUUID(),
        projectName: PROJECT,
        serviceName: SERVICE,
        host,
        https: true,
        path: '/',
        port: 80,
        middlewares: [],
        certificateResolver: '',
        wildcard: false,
        destinationType: 'service',
        serviceDestination: {
          protocol: 'http',
          port: 80,
          path: '/',
          projectName: PROJECT,
          serviceName: SERVICE,
          composeService: '',
        },
      },
    },
    token,
  );
  console.log(`   EP domain created: ${host}`);
}

async function main() {
  console.log('1/4 EasyPanel login + domains...');
  const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
  const token = login?.result?.data?.json?.token;
  if (!token) throw new Error('EasyPanel login failed');

  await ensureEpDomain(token, PRIMARY_HOST);
  await ensureEpDomain(token, ALIAS_HOST);

  console.log('2/4 Redeploy Cloudflare worker (tawaheen + tah)...');
  execSync('npx wrangler deploy --config wrangler-tawaheen.toml', { stdio: 'inherit' });

  console.log('3/4 Redeploy EasyPanel...');
  await trpc(
    'services.app.deployService',
    { json: { projectName: PROJECT, serviceName: SERVICE, forceRebuild: true } },
    token,
  );

  console.log('4/4 Verify (wait 20s)...');
  await new Promise((r) => setTimeout(r, 20000));

  const domains = await cf(`/accounts/${ACCOUNT}/workers/domains`);
  const hosts = domains.result?.filter((d) => d.hostname?.includes('tawaheen') || d.hostname?.includes('tah.'));
  console.log('   worker domains:', hosts?.map((d) => d.hostname).join(', '));

  for (const url of [
    `https://${PRIMARY_HOST}/`,
    `https://${ALIAS_HOST}/`,
    'https://nounmotion-tawaheen.znnri1.easypanel.host/',
  ]) {
    try {
      const r = await fetch(url, { redirect: 'follow' });
      console.log(`   ${url} → ${r.status}`);
    } catch (e) {
      console.log(`   ${url} → ${e.message}`);
    }
  }
}

main().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
