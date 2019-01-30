const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const model = require('../../../lib/car/model');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { car } = require('../../fixtures');

describe('#POST Casos de Test Car', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar 202 e inserir carro quando não encontrado.', (done) => {
      const input = car.dbModel();

      const stub = sinon.stub(model, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback(null, input));

      request(app)
        .post('/car')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retonar 404 quando não tiver placa informada.', (done) => {
      request(app)
        .post('/car')
        .send()
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando placa incorreta.', (done) => {
      request(app)
        .post('/car')
        .send()
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });
});
