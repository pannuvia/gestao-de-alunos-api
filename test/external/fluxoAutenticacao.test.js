import { readFileSync } from 'node:fs';
import { faker } from '@faker-js/faker';
import { api } from '../helpers/api.js';
import { expect } from 'chai';
import { obterTokenAdmin } from '../helpers/auth.js';

const fluxos = JSON.parse(
  readFileSync(new URL('../fixtures/fluxoAutenticacao.json', import.meta.url), 'utf8')
);

describe('Fluxo completo de autenticação', () => {
  fluxos.forEach((fluxo) => {
    it(fluxo.descricao, async () => {
      const alunoPayload = {
        ...fluxo.aluno,
        email: faker.internet.email({ provider: 'example.com' }),
        matricula: faker.string.numeric({ length: 8 }),
      };

      const disciplinaPayload = {
        ...fluxo.disciplina,
        codigo: faker.string.alphanumeric({ length: 6, casing: 'upper' }),
      };

      const loginAdmin = await api()
        .post('/api/auth/login')
        .send(fluxo.admin);

      expect(loginAdmin.status).to.equal(200);
      expect(loginAdmin.body).to.have.property('token');

      const aluno = await api()
        .post('/api/admin/alunos')
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send(alunoPayload);

      expect(aluno.status).to.equal(201);
      expect(aluno.body).to.have.property('nome', fluxo.aluno.nome);
      expect(aluno.body).to.have.property('email', alunoPayload.email);
      expect(aluno.body).to.have.property('matricula', alunoPayload.matricula);

      const disciplina = await api()
        .post('/api/admin/disciplinas')
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send(disciplinaPayload);

      expect(disciplina.status).to.equal(201);
      expect(disciplina.body).to.have.property('nome', fluxo.disciplina.nome);
      expect(disciplina.body).to.have.property('codigo', disciplinaPayload.codigo);

      const matricula = await api()
        .post(`/api/admin/disciplinas/${disciplina.body.id}/matriculas`)
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send({ alunoId: aluno.body.id });

      expect(matricula.status).to.equal(201);
      expect(matricula.body.alunoId).to.equal(aluno.body.id);
      expect(matricula.body.disciplinaId).to.equal(disciplina.body.id);

      const loginAluno = await api()
        .post('/api/auth/login')
        .send({
          email: alunoPayload.email,
          senha: alunoPayload.senha,
        });

      expect(loginAluno.status).to.equal(200);
      expect(loginAluno.body).to.have.property('token');

      const trabalho = await api()
        .post(`/api/alunos/${aluno.body.id}/trabalhos`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${loginAluno.body.token}`)
        .send({
          disciplinaId: disciplina.body.id,
          titulo: fluxo.trabalho.titulo,
          descricao: fluxo.trabalho.descricao,
        });

      expect(trabalho.status).to.equal(201);
      expect(trabalho.body).to.have.property('titulo', fluxo.trabalho.titulo);
      expect(trabalho.body).to.have.property('alunoId', aluno.body.id);
      expect(trabalho.body).to.have.property('disciplinaId', disciplina.body.id);
    });
  });
});
