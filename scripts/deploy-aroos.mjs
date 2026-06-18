#!/usr/bin/env node
import { deployRestaurant } from './_deploy-restaurant.mjs';

const email = process.argv[2] || process.env.EASYPANEL_EMAIL || 'abdennourelamraoui354@gmail.com';
const password = process.argv[3] || process.env.EASYPANEL_PASSWORD;

deployRestaurant({
  service: 'aroos',
  dockerfile: 'Dockerfile.aroos',
  domain: 'aroos.nounmotion.store',
  epHost: 'nounmotion-aroos.znnri1.easypanel.host',
  wranglerConfig: 'wrangler-aroos.toml',
  commitMsg: 'Deploy Aroos Al Bahar to aroos.nounmotion.store',
  backupPath: '/aroos',
  email,
  password,
  skipBuild: process.argv.includes('--skip-build'),
  skipGit: process.argv.includes('--skip-git'),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
