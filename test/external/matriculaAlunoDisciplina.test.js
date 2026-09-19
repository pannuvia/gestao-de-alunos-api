import { readFileSync } from 'node:fs';
import { api } from '../helpers/api.js';
import { expect } from 'chai';
import { obterTokenAdmin } from '../helpers/auth.js';
import { gerarAluno } from '../factories/alunosFactory.js';
import { gerarDisciplina } from '../factories/disciplinasFactory.js';

const testesDeMatriculas = JSON.parse(
  readFileSync(new URL('../fixtures/matriculas.json', import.meta.url), 'utf8')
);

describe('Cenarios de Cadastro de Aluno numa Disciplina', () => {
  it('deve cadastrar um aluno numa disciplina', async () => {
    const alunos = await api()
      .post('/api/admin/alunos')
      .set('Content-Type', 'application/json')
      .set('Authorization', await obterTokenAdmin())
      .send(gerarAluno());

    const alunoId = alunos.body.id;

    const disciplinas = await api()
      .post('/api/admin/disciplinas')
      .set('Content-Type', 'application/json')
      .set('Authorization', await obterTokenAdmin())
      .send(gerarDisciplina());

    const disciplinaId = disciplinas.body.id;

    const matricula = await api()
      .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
      .set('Content-Type', 'application/json')
      .set('Authorization', await obterTokenAdmin())
      .send({ alunoId });

    expect(matricula.status).to.equal(201);
    expect(matricula.body.alunoId).to.equal(alunoId);
    expect(matricula.body.disciplinaId).to.equal(disciplinaId);
  });

  testesDeMatriculas.forEach((testeDeMatricula) => {
    it(testeDeMatricula.descricaoDoTeste, async () => {
      const alunos = await api()
        .post('/api/admin/alunos')
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send(testeDeMatricula.dadosAluno);

      const alunoId = alunos.body.id;

      const disciplinas = await api()
        .post('/api/admin/disciplinas')
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send(testeDeMatricula.dadosDisciplina);

      const disciplinaId = disciplinas.body.id;

      const matricula = await api()
        .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
        .set('Content-Type', 'application/json')
        .set('Authorization', await obterTokenAdmin())
        .send({ alunoId });

      expect(matricula.status).to.equal(testeDeMatricula.status);
      expect(matricula.body.alunoId).to.equal(alunoId);
      expect(matricula.body.disciplinaId).to.equal(disciplinaId);
    });
  });
});

