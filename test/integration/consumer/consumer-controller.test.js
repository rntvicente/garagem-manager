const { assert } = require('chai');
const request = require('supertest');

const app = require('../../../lib/server');
const { httpStatusCode } = require('../../../lib/commons/utils');

describe('# Caso de Test Consumers', () => {
  describe('Casos de sucesso', () => {
    it('Deve retornar 202 quando chamada a route /post', (done) => {
      const input = {
        mobile: '11982247184',
        name: 'Sr. Batata'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 202 quando informado mobile com DDI 55', (done) => {
      const input = {
        mobile: '5531982247878',
        name: 'Sr. Batata'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar 400 quando não informado body', (done) => {
      const body = {
        message: 'Failed operation.'
      };

      request(app)
        .post('/consumers')
        .send({})
        .expect(httpStatusCode.badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, body);
          done();
        });
    });

    it('Deve retornar 400 quando informado mobile invalido', (done) => {
      const input = {
        mobile: 'batata'
      };

      const body = {
        message: 'Failed operation.'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, body);
          done();
        });
    });

    it('Deve retornar 400 quando informado mobile sem DDD', (done) => {
      const input = {
        mobile: '982247777'
      };

      const body = {
        message: 'Failed operation.'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, body);
          done();
        });
    });

    it('Deve retornar 400 quando não informado nome', (done) => {
      const input = {
        mobile: '13982247475'
      };

      const body = {
        message: 'Failed operation.'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, body);
          done();
        });
    });

    it('Deve retonar 400 quando informado mobile number.', (done) => {
      const input = {
        mobile: 13982247475
      };

      const body = {
        message: 'Failed operation.'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, body);
          done();
        });
    });

    it.skip('Deve retornar 500 quando erro não encontrado Banco de Dados.', (done) => {
      const input = {
        mobile: '5531982247878',
        name: 'Sr. Batata'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });
});
