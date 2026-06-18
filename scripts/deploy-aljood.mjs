#!/usr/bin/env node
import { deployRestaurant } from './_deploy-restaurant.mjs';

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;

deployRestaurant({
  service: 'aljood',
  dockerfile: 'Dockerfile.aljood',
  domain: null,
  epHost: 'nounmotion-aljood.znnri1.easypanel.host',
  wranglerConfig: null,
  commitMsg: 'Deploy Al Jood Lebanese Restaurant demo',
  backupPath: '/al-jood-azaiba',
  email,
  password,
  skipBuild: process.argv.includes('--skip-build'),
  skipGit: process.argv.includes('--skip-git'),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
