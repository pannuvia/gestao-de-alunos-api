import {api} from '../helpers/api.js';

export async function obterToken(email, senha) {
  const login = await api()
    .post('/api/auth/login')
    .send({
      email: email,
      senha: senha,
    });

  return login.body.token;
}