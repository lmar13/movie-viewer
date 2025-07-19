/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/generate-env.ts
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.resolve(__dirname, '../src/environments/environment.template.ts'), 'utf8');
const apiKey = process.env['API_KEY'] || '';

const output = template.replace('__API_KEY__', `'${apiKey}'`);
fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.ts'), output);
console.log('✅ environment.ts generated');
