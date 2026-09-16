import {api} from '../helpers/api.js';
import { expect } from 'chai';
import { obterToken } from '../helpers/auth.js';
import 'dotenv/config.js';

describe('Cenarios de Cadastro de Aluno em Disciplina', () => {
  it('deve cadastrar um aluno numa disciplina', async () => {

    const token = await obterToken(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  
        const alunos = await api()
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Pannuvia Monteiro',
                email: 'pannuvia@email.com',
                matricula: '20230101',
                senha: 'senha123',
        });

        let alunoId = alunos.body.id;
  
        const disciplinas = await api()
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Biologia 1118',
                codigo: 'BIO1118',
        });
        
        let disciplinaId = disciplinas.body.id;

        const matricula = await api()
            .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
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
