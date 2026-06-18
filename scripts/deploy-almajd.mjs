#!/usr/bin/env node
/**
 * Deploy ONLY Al Majd Dental → almajd.nounmotion.store (EasyPanel)
 * Does NOT touch store, restaurants, or other services.
 *
 * Usage: EASYPANEL_PASSWORD=... node scripts/deploy-almajd.mjs
 */
import { execSync } from 'node:child_process';
import { trpc, trpcGet, run, PROJECT, GITHUB_OWNER, GITHUB_REPO } from './_deploy-restaurant.mjs';

const SERVICE = 'almajd';
const DOMAIN = 'almajd.nounmotion.store';
const EP_HOST = 'nounmotion-almajd.znnri1.easypanel.host';
const DOCKERFILE = 'Dockerfile.almajd';

const GIT_PATHS = [
  'Dockerfile.almajd',
  'nginx-almajd.conf',
  'scripts/deploy-almajd.mjs',
  'scripts/setup-almajd-dns.mjs',
  'src/al-majd-dental',
  'src/App.tsx',
  'dist',
].join(' ');

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;
if (!password) throw new Error('Set EASYPANEL_PASSWORD or pass as argv[3]');

async function ensureDomains(token) {
  const domains =
    (await trpcGet('domains.listDomains', { projectName: PROJECT, serviceName: SERVICE }, token))?.result?.data
      ?.json ?? [];
  const hosts = domains.map((d) => d.host);

  for (const host of [DOMAIN, EP_HOST]) {
    if (hosts.includes(host)) continue;
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
    console.log(`   Added domain ${host}`);
  }
}

async function main() {
  console.log('1/7 Build...');
  run('npm run build');

  console.log('2/7 Git push (almajd files only)...');
  run(`git add -f ${GIT_PATHS}`);
  const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (dirty) {
    run(
      'git -c user.email="abdennourelamraoui354@gmail.com" -c user.name="abdennourelamraoui354-glitch" commit -m "Deploy Al Majd Dental clinic to almajd.nounmotion.store"',
    );
  }
  run('git push origin main');

  console.log('3/7 EasyPanel login...');
  const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
  const token = login?.result?.data?.json?.token ?? login?.json?.token;
  if (!token) throw new Error('Login failed');

  console.log(`4/7 Ensure ${SERVICE} service exists...`);
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
          build: { type: 'dockerfile', file: DOCKERFILE },
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
          build: { type: 'dockerfile', file: DOCKERFILE },
        },
      },
      token,
    ).catch(() => {});
    await ensureDomains(token);
  }

  console.log('5/7 DNS → EasyPanel...');
  run('node scripts/setup-almajd-dns.mjs');

  console.log(`6/7 Deploy ONLY ${SERVICE} (no other services)...`);
  await trpc(
    'services.app.deployService',
    { json: { projectName: PROJECT, serviceName: SERVICE, forceRebuild: true } },
    token,
  );

  console.log('7/7 Waiting 120s for Docker build...');
  await new Promise((r) => setTimeout(r, 120000));

  for (const url of [`https://${DOMAIN}/`, `https://${EP_HOST}/`]) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(30000) });
      const html = await res.text();
      const ok = res.status === 200 && html.length > 500 && !/bad gateway/i.test(html);
      console.log(ok ? '✅' : '⏳', url, `→ ${res.status} (${html.length}b)`);
    } catch (e) {
      console.log('⏳', url, '→', e.message);
    }
  }

  console.log(`\nLive: https://${DOMAIN}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
