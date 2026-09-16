import { api } from '../helpers/api.js';
import { expect } from 'chai';
import { obterTokenAdmin } from '../helpers/auth.js';
import { gerarAluno } from '../factories/alunosFactory.js';

describe('Cenarios de Alunos', () => {
  it('deve cadastrar um aluno quando fornecer dados válidos', async () => {
    const aluno = gerarAluno();

    const alunos = await api()
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', await obterTokenAdmin())
      .send(aluno);

    expect(alunos.status).to.equal(201);
    expect(alunos.body).to.have.property('nome', aluno.nome);
    expect(alunos.body).to.have.property('email', aluno.email);
    expect(alunos.body).to.have.property('matricula', aluno.matricula);
  });

  it('nao deve cadastrar um aluno quando aluno ja existir', async () => {

    const alunos = await api()
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', await obterTokenAdmin())
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