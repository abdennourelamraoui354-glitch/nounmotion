#!/usr/bin/env node
import { deployRestaurant } from './_deploy-restaurant.mjs';

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;

deployRestaurant({
  service: 'misk',
  dockerfile: 'Dockerfile.misk',
  domain: null,
  epHost: 'nounmotion-misk.znnri1.easypanel.host',
  wranglerConfig: null,
  commitMsg: 'Deploy Misk Restaurant demo',
  backupPath: '/misk-restaurant',
  email,
  password,
  skipBuild: process.argv.includes('--skip-build'),
  skipGit: process.argv.includes('--skip-git'),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
