const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const model = require('../../../lib/car/model');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { car } = require('../../fixtures');

describe('#GET Casos de Test Car', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar 202 e inserir carro quando não encontrado.', (done) => {
      const input = car.dbModel();

      const stub = sinon.stub(model, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback(null, input));

      request(app)
        .get('/car')
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
    it('Deve retonar 404 quando não informado body.', (done) => {
      request(app)
        .get('/car')
        .send()
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Placa incorreta.', (done) => {
      const input = car.dbModel({ board: '1234AAA' });

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Placa for undefined.', (done) => {
      const input = car.dbModel();

      input.board = undefined;
      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Placa for vazio.', (done) => {
      const input = car.dbModel();

      input.board = '';
      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Marca for undefined.', (done) => {
      const input = car.dbModel();

      input.brand = undefined;
      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Marca for vazio.', (done) => {
      const input = car.dbModel();

      input.brand = '';
      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });
});
