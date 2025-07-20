const fs = require('fs');

const envFile = `
export const environment = {
  production: true,
  apiKey: '${process.env.API_KEY}',
  apiUrl: 'https://api.themoviedb.org/3',
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', envFile);
console.log('✅ Environment file generated!');
