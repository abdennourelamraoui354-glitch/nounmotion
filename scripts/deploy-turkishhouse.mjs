#!/usr/bin/env node
/** Deploy Turkish House → turkishhouse.nounmotion.store */
import { execSync } from 'node:child_process';

const EP = process.env.EASYPANEL_URL || 'http://76.13.43.170:3000';
const PROJECT = 'nounmotion';
const SERVICE = 'turkishhouse';
const DOMAIN = 'turkishhouse.nounmotion.store';
const EP_HOST = 'nounmotion-turkishhouse.znnri1.easypanel.host';
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
  console.log('1/6 Build...');
  run('npm run build');

  console.log('2/6 Git push...');
  run('git add -A');
  const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (dirty) {
    run(
      'git -c user.email="abdennourelamraoui354@gmail.com" -c user.name="abdennourelamraoui354-glitch" commit -m "Deploy Turkish House to turkishhouse.nounmotion.store"',
    );
  }
  run('git push origin main');

  console.log('3/6 EasyPanel login...');
  const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
  const token = login?.result?.data?.json?.token;
  if (!token) throw new Error('Login failed');

  console.log('4/6 Create turkishhouse service (if missing)...');
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
          build: { type: 'dockerfile', file: 'Dockerfile.turkishhouse' },
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
          build: { type: 'dockerfile', file: 'Dockerfile.turkishhouse' },
        },
      },
      token,
    ).catch(() => {});
  }

  console.log('5/6 Deploy EasyPanel + Cloudflare worker...');
  await trpc(
    'services.app.deployService',
    { json: { projectName: PROJECT, serviceName: SERVICE, forceRebuild: true } },
    token,
  );
  run('npx wrangler deploy --config wrangler-turkishhouse.toml');

  console.log('6/6 Waiting 90s...');
  await new Promise((r) => setTimeout(r, 90000));

  for (const url of [`https://${DOMAIN}/`, `https://${EP_HOST}/`]) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      console.log(`${url} → ${res.status}`);
    } catch (e) {
      console.log(`${url} → ${e.message}`);
    }
  }

  console.log(`\nLive: https://${DOMAIN}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
