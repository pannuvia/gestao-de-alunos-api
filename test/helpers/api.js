import request from 'supertest';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const envPath = fileURLToPath(new URL('../config/.env', import.meta.url));
dotenv.config({ path: envPath });

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export function api() {
  return request(BASE_URL);
}

export default api;