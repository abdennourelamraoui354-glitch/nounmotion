#!/usr/bin/env node
/** Create Cloudflare tunnel DNS rules for restaurant subdomains via EasyPanel */
const EP = 'http://76.13.43.170:3000';
const email = process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.env.EASYPANEL_PASSWORD;
if (!password) throw new Error('Set EASYPANEL_PASSWORD');

const SITES = [
  { subdomain: 'taj', service: 'taj' },
  { subdomain: 'turkishhouse', service: 'turkishhouse' },
];

async function trpc(name, body, token) {
  const r = await fetch(`${EP}/api/trpc/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${name} ${r.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

async function trpcGet(name, input, token) {
  const q = encodeURIComponent(JSON.stringify({ json: input }));
  const r = await fetch(`${EP}/api/trpc/${name}?input=${q}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${name} ${r.status}: ${text.slice(0, 800)}`);
  return JSON.parse(text);
}

const login = await trpc('auth.login', { json: { email, password, rememberMe: true } });
const token = login.result.data.json.token;

const zones = (await trpcGet('cloudflareTunnel.listZones', {}, token))?.result?.data?.json;
const zone = Array.isArray(zones) ? zones.find((z) => z.name === 'nounmotion.store') : null;
const zoneId = zone?.id ?? zones?.[0]?.id;
if (!zoneId) throw new Error('No Cloudflare zone in EasyPanel');

for (const { subdomain, service } of SITES) {
  console.log(`\n=== ${subdomain}.nounmotion.store (${service}) ===`);
  try {
    const rule = await trpc(
      'cloudflareTunnel.createTunnelRule',
      {
        json: {
          projectName: 'nounmotion',
          serviceName: service,
          subdomain,
          domain: 'nounmotion.store',
          path: '/',
          internalProtocol: 'http',
          internalPort: 80,
          zoneId,
        },
      },
      token,
    );
    console.log('Tunnel rule:', JSON.stringify(rule?.result?.data?.json ?? rule, null, 2)?.slice(0, 400));
  } catch (e) {
    console.warn('Tunnel rule:', e.message);
  }

  console.log('Redeploying...');
  await trpc(
    'services.app.deployService',
    { json: { projectName: 'nounmotion', serviceName: service, forceRebuild: true } },
    token,
  );
  console.log('Deploy triggered');
}

console.log('\nDone. Wait 2-3 min then test:');
for (const { subdomain } of SITES) {
  console.log(`  https://${subdomain}.nounmotion.store`);
}
