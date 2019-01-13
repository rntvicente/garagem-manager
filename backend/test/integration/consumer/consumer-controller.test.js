const { assert } = require('chai');
const request = require('supertest');

const { httpStatusCode } = require('../../../lib/commons/utils');
const applicationServer = require('../../../lib/server');

describe('# Caso de Test Consumers', () => {
  let app;

  beforeEach((done) => {
    applicationServer.start((err, express) => {
      app = express;
      done();
    });
  });

  afterEach((done) => {
    applicationServer.stop(done);
  });

  describe('Casos de sucesso', () => {
    it('Deve retornar 202 quando chamada a route /post', (done) => {
      const input = {
        mobile: '11982247184'
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
  });
});
