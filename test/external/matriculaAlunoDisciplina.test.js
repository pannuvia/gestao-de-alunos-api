import request from 'supertest';
import { expect } from 'chai';
import { obterToken } from '../helpers/auth.js';

describe('Cenarios de Cadastro de Aluno em Disciplina', () => {
  it('deve cadastrar um aluno numa disciplina', async () => {

    const token = await obterToken('admin@escola.com', 'admin123');
  
        const alunos = await request('http://localhost:3000')
            .post('/api/admin/alunos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Pannuvia Monteiro',
                email: 'pannuvia@email.com',
                matricula: '2026003',
                senha: 'senha123',
        });

        let alunoId = alunos.body.id;
  
        const disciplinas = await request('http://localhost:3000')
            .post('/api/admin/disciplinas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Biologia 2',
                codigo: 'BIO102',
        });
        
        let disciplinaId = disciplinas.body.id;

        const matricula = await request('http://localhost:3000')
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
