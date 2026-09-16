import { api } from '../helpers/api.js';
import { expect } from 'chai';
import { obterTokenAdmin } from '../helpers/auth.js';
import { gerarAluno } from '../factories/alunosFactory.js';
import { gerarDisciplina } from '../factories/disciplinasFactory.js';

describe('Cenarios de Cadastro de Aluno numa Disciplina', () => {
  it('deve cadastrar um aluno numa disciplina', async () => {
 
        const alunos = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', await obterTokenAdmin())
            .send(gerarAluno());

        let alunoId = alunos.body.id;
  
        const disciplinas = await api()
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', await obterTokenAdmin())
            .send(gerarDisciplina());

        let disciplinaId = disciplinas.body.id;

        const matricula = await api()
            .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
            .set('Content-Type', 'application/json')
            .set('Authorization', await obterTokenAdmin())
            .send(
                {
                    alunoId: alunoId,
                }
            );

        expect(matricula.status).to.equal(201);
        expect(matricula.body.alunoId).to.equal(alunoId);
        expect(matricula.body.disciplinaId).to.equal(disciplinaId);
        
    });

})
