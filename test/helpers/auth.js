import {api} from './api.js';
import 'dotenv/config.js';

export async function obterToken(email, senha) {
  const login = await api()
    .post('/api/auth/login')
    .send({
      email: email,
      senha: senha,
    });

  return login.body.token;
}

let tokenAdmin = null;

export async function obterTokenAdmin() {
  if (!tokenAdmin) {
    const login = await api()
      .post('/api/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        senha: process.env.ADMIN_PASSWORD,
      });
    
      tokenAdmin = login.body.token;
  }
  return `Bearer ${tokenAdmin}`;
}