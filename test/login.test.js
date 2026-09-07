import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

describe('Cenarios de Login', () => {
  context('Cenário de Sucesso - Autenticação bem-sucedida', () => {
    it('deve autenticar com sucesso ao tentar login com credenciais válidas', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({   
          email: 'admin@escola.com',
          senha: 'admin123' });
    
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('token');
    });
  });

  context('Cenários de Falha - (Status HTTP 401)', () => {
    it('deve falhar ao tentar login com senha inválida', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: 'admin@escola.com',
            senha: 'admin1234' });

      expect(resposta.status).to.equal(401);
      expect(resposta.body.error).to.equal('E-mail ou senha inválidos.');
    });
    it('deve falhar ao tentar login com e-mail inválido', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: 'admin#escola.com',
            senha: 'admin123' });

      expect(resposta.status).to.equal(401);
      expect(resposta.body.error).to.equal('E-mail ou senha inválidos.');
    });
  });

  context('Cenários de Falha - (Status HTTP 400)', () => {
    it('deve falhar ao tentar login com senha vazia', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: 'admin#escola.com',
            senha: '' });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login com email vazio', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: '',
            senha: 'admin123' });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login com email e senha vazios', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: '',
            senha: '' });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login sem preencher senha', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: 'admin@escola.com'});

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login sem preencher email', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            senha: '' });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login sem preencher nenhum campo', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login com senha nula', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: 'admin#escola.com',
            senha: null });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login com email nulo', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: null,
            senha: 'admin123' });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
    it('deve falhar ao tentar login com email e senha nulos', async () => {
      const resposta = await request(app)
        .post('/api/auth/login')
        .send({ 
            email: null,
            senha: null });

      expect(resposta.status).to.equal(400);
      expect(resposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');
    });
  });
});
