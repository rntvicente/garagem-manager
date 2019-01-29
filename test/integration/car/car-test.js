const { assert } = require('chai');
const request = require('supertest');

const app = require('../../../lib/server');
const { httpStatusCode } = require('../../../lib/commons/utils');

describe('#POST Casos de Test Car', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar 202 quando quando chamado route.', (done) => {
      request(app)
        .post('/car/board/FFF1234')
        .send()
        .expect(httpStatusCode.accepted)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retonar 404 quando não informando route correto.', (done) => {
      request(app)
        .post('/car')
        .send()
        .expect(httpStatusCode.notFound)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 404 quando não tiver placa informada.', (done) => {
      request(app)
        .post('/car/board/')
        .send()
        .expect(httpStatusCode.notFound)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando placa incorreta.', (done) => {
      request(app)
        .post('/car/board/1234AAA')
        .send()
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });
});
