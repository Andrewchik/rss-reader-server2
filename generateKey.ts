import fs from 'fs';
import crypto from 'crypto';

export const generateRandomKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secretKey = generateRandomKey();

fs.writeFileSync('config.ts', `export const config = { secretKey: '${secretKey}' };`);
console.log('Secret key generated and saved to config.ts');