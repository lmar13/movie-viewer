/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/generate-env.ts
const fs = require('fs');
const path = require('path');

const apiKey = process.env['API_KEY'] || '';

const output = `
export const environment = {
  production: true,
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: '${apiKey}'
};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.ts'), output);
console.log('✅ environment.ts generated');
