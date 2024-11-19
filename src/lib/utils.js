// src/lib/utils.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getUploadDir = () => {
  return join(__dirname, '..', 'uploads');
};