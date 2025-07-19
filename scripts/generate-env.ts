// scripts/generate-env.ts
import * as fs from 'fs';
import * as path from 'path';

const template = fs.readFileSync(path.resolve(__dirname, '../src/environments/environment.template.ts'), 'utf8');
const apiKey = process.env['API_KEY'] || '';

const output = template.replace('__API_KEY__', `'${apiKey}'`);
fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.ts'), output);
console.log('✅ environment.ts generated');
