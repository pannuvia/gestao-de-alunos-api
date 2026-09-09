import request from 'supertest';

export async function obterToken(email, senha) {
  const login = await request('http://localhost:3000')
    .post('/api/auth/login')
    .send({
      email: email,
      senha: senha,
    });

  return login.body.token;
}