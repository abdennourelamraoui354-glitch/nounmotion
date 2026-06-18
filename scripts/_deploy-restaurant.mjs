#!/usr/bin/env node
/** Shared deploy helper for restaurant demos */
import { execSync } from 'node:child_process';

export const EP = process.env.EASYPANEL_URL || 'http://76.13.43.170:3000';
export const PROJECT = 'nounmotion';
export const GITHUB_OWNER = 'abdennourelamraoui354-glitch';
export const GITHUB_REPO = 'nounmotion';

export async function trpc(name, body, token) {
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

export async function trpcGet(name, input, token) {
  const q = encodeURIComponent(JSON.stringify({ json: input }));
  const res = await fetch(`${EP}/api/trpc/${name}?input=${q}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${name} HTTP ${res.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

export function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

export async function deployRestaurant({
  service,
  dockerfile,
  domain,
  epHost,
  wranglerConfig,
  commitMsg,
  backupPath,
  email,
  password,
  skipBuild = false,
  skipGit = false,
}) {
  if (!password) throw new Error('Set EASYPANEL_PASSWORD or pass as argv[3]');

  if (!skipBuild) {
    console.log('1/6 Build...');
    run('npm run build');
  }

  if (!skipGit) {
    console.log('2/6 Git push...');
    run('git add -A');
    const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (dirty) {
      run(
        `git -c user.email="abdennourelamraoui354@gmail.com" -c user.name="abdennourelamraoui354-glitch" commit -m "${commitMsg}"`,
      );
    }
    run('git push origin main');
  }

  console.log('3/6 EasyPanel login...');
  const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
  const token = login?.result?.data?.json?.token;
  if (!token) throw new Error('Login failed');

  console.log(`4/6 Create ${service} service (if missing)...`);
  const inspect = await trpcGet('projects.inspectProject', { projectName: PROJECT }, token);
  const services = inspect?.result?.data?.json?.services ?? [];
  const exists = services.some((s) => s.name === service);

  const domains = [{ host: epHost, https: true, port: 80, path: '/' }];
  if (domain) domains.push({ host: domain, https: true, port: 80, path: '/' });

  if (!exists) {
    await trpc(
      'services.app.createService',
      {
        json: {
          projectName: PROJECT,
          serviceName: service,
          source: {
            type: 'github',
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            ref: 'main',
            path: '/',
            autoDeploy: false,
          },
          build: { type: 'dockerfile', file: dockerfile },
          env: '',
          domains,
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
          serviceName: service,
          build: { type: 'dockerfile', file: dockerfile },
        },
      },
      token,
    ).catch(() => {});
  }

  console.log('5/6 Deploy EasyPanel' + (wranglerConfig ? ' + Cloudflare worker...' : '...'));
  await trpc(
    'services.app.deployService',
    { json: { projectName: PROJECT, serviceName: service, forceRebuild: true } },
    token,
  );
  if (wranglerConfig) run(`npx wrangler deploy --config ${wranglerConfig}`);

  console.log('6/6 Waiting 90s...');
  await new Promise((r) => setTimeout(r, 90000));

  const urls = [`https://${epHost}/`];
  if (domain) urls.unshift(`https://${domain}/`);
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      console.log(`${url} → ${res.status}`);
    } catch (e) {
      console.log(`${url} → ${e.message}`);
    }
  }

  if (domain) console.log(`\nLive: https://${domain}/`);
  console.log(`EasyPanel: https://${epHost}/`);
  if (backupPath) console.log(`Backup: https://nounmotion.store${backupPath}`);
}
