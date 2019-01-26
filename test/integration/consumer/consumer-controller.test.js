const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const model = require('../../../lib/consumer/model');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { consumer } = require('../../fixtures');

describe('# Caso de Test Consumers', () => {
  describe('Casos de sucesso', () => {
    it('Deve retornar 202 quando chamada a route /post', (done) => {
      const input = consumer.dbModel();

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((erro) => {
          assert.isNull(erro);

          done();
        });
    });

    it('Deve retornar 202 quando informado mobile com DDI 55', (done) => {
      const input = consumer.dbModel({ mobile: '5511982247878' });

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((erro) => {
          assert.isNull(erro);
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

    it('Deve retornar 400 quando mobile for invalido', (done) => {
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

    it('Deve retornar 400 quando informado mobile tipo number.', (done) => {
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

    it('Deve retornar 500 quando houver alguma falha de banco.', (done) => {
      const input = consumer.dbModel();

      const stub = sinon.stub(model, 'insertOne')
        .callsFake((arg1, callback) => callback({ err: 'error' }));

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });
  });
});
