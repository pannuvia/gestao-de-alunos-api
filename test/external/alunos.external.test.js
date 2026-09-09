import request from 'supertest';
import { expect } from 'chai';
import { obterToken } from '../helpers/auth.js';

describe('Cenarios de Alunos', () => {
  it('deve cadastrar um aluno quando fornecer dados válidos', async () => {

    const token = await obterToken('admin@escola.com', 'admin123');

    const alunos = await request('http://localhost:3000')
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Pannuvia Monteiro',
        email: 'pannuvia@monteiro.com',
        matricula: '2026001',
        senha: 'senha123',
      });

    expect(alunos.status).to.equal(201);
    expect(alunos.body).to.have.property('nome', 'Pannuvia Monteiro');
    expect(alunos.body).to.have.property('email', 'pannuvia@monteiro.com');
    expect(alunos.body).to.have.property('matricula', '2026001');
  });

  it('nao deve cadastrar um aluno quando aluno ja existir', async () => {

    const token = await obterToken('admin@escola.com', 'admin123');

    const alunos = await request('http://localhost:3000')
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Ana Souza',
        email: 'ana.souza@example.com',
        matricula: '202401',
        senha: 'senha123',
      });

    expect(alunos.status).to.equal(409);
    expect(alunos.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.');
  });   
});