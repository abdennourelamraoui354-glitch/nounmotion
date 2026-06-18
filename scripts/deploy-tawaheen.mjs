#!/usr/bin/env node
/**
 * Deploy Tawaheen Al Hawa → tawaheen.nounmotion.store
 * Usage: node scripts/deploy-tawaheen.mjs
 * Requires: EASYPANEL_PASSWORD env or argv[3]
 */
import { execSync } from 'node:child_process';

const EP = process.env.EASYPANEL_URL || 'http://76.13.43.170:3000';
const PROJECT = 'nounmotion';
const SERVICE = 'tawaheen';
const DOMAIN = 'tawaheen.nounmotion.store';
const EP_HOST = 'nounmotion-tawaheen.znnri1.easypanel.host';
const GITHUB_OWNER = 'abdennourelamraoui354-glitch';
const GITHUB_REPO = 'nounmotion';

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;
if (!password) throw new Error('Set EASYPANEL_PASSWORD or pass as argv[3]');

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

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

async function main() {
  console.log('1/7 Build...');
  run('npm run build');

  console.log('2/7 Git commit + push...');
  run('git add -A');
  const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (dirty) {
    run(
      'git -c user.email="abdennourelamraoui354@gmail.com" -c user.name="abdennourelamraoui354-glitch" commit -m "Deploy Tawaheen Al Hawa to tawaheen.nounmotion.store"',
    );
  }
  run('git push -u origin main');

  console.log('3/7 EasyPanel login...');
  const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
  const token = login?.result?.data?.json?.token;
  if (!token) throw new Error('Login failed');

  console.log('4/7 Create tawaheen service (if missing)...');
  const inspect = await trpcGet('projects.inspectProject', { projectName: PROJECT }, token);
  const services = inspect?.result?.data?.json?.services ?? [];
  const exists = services.some((s) => s.name === SERVICE);

  if (!exists) {
    await trpc(
      'services.app.createService',
      {
        json: {
          projectName: PROJECT,
          serviceName: SERVICE,
          source: {
            type: 'github',
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            ref: 'main',
            path: '/',
            autoDeploy: false,
          },
          build: { type: 'dockerfile', file: 'Dockerfile.tawaheen' },
          env: '',
          domains: [
            { host: EP_HOST, https: true, port: 80, path: '/' },
            { host: DOMAIN, https: true, port: 80, path: '/' },
          ],
        },
      },
      token,
    );
    console.log('   Service created');
  } else {
    await trpc(
      'services.app.updateBuild',
      {
        json: {
          projectName: PROJECT,
          serviceName: SERVICE,
          build: { type: 'dockerfile', file: 'Dockerfile.tawaheen' },
        },
      },
      token,
    ).catch(() => {});
  }

  console.log('5/7 Deploy EasyPanel...');
  await trpc(
    'services.app.deployService',
    { json: { projectName: PROJECT, serviceName: SERVICE, forceRebuild: true } },
    token,
  );

  console.log('6/7 Cloudflare DNS + worker...');
  run('node scripts/setup-tawaheen-dns.mjs');
  run('npx wrangler deploy --config wrangler-tawaheen.toml');

  console.log('7/7 Waiting 90s for build...');
  await new Promise((r) => setTimeout(r, 90000));

  for (const url of [`https://${DOMAIN}/`, `https://${EP_HOST}/`]) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      console.log(`${url} → ${res.status}`);
    } catch (e) {
      console.log(`${url} → error: ${e.message}`);
    }
  }

  console.log(`\nLive: https://${DOMAIN}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
