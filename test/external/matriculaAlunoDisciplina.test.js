import { api } from '../helpers/api.js';
import { expect } from 'chai';
import { obterTokenAdmin } from '../helpers/auth.js';
import 'dotenv/config.js';

describe('Cenarios de Cadastro de Aluno em Disciplina', () => {
  it('deve cadastrar um aluno numa disciplina', async () => {
 
        const alunos = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', await obterTokenAdmin())
            .send({
                nome: 'Pannuvia Monteiro',
                email: 'pannuvia11@email.com',
                matricula: '202301191',
                senha: 'senha123',
        });

        let alunoId = alunos.body.id;
  
        const disciplinas = await api()
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', await obterTokenAdmin())
            .send({
                nome: 'Biologia 11110',
                codigo: 'BIO11110',
        });
        
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
});
