import { api } from './api.js';

const senhaAdmin = process.env.ADMIN_PASSWORD || process.env.ADMIN_SENHA || 'admin123';

export async function obterToken(email, senha) {
  const login = await api()
    .post('/api/auth/login')
    .send({
      email,
      senha,
    });

  return login.body.token;
}

let tokenAdmin = null;

export async function obterTokenAdmin() {
  if (!tokenAdmin) {
    const login = await api()
      .post('/api/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL || 'admin@escola.com',
        senha: senhaAdmin,
      });

    tokenAdmin = login.body.token;
  }
  return `Bearer ${tokenAdmin}`;
}