const { assert } = require('chai');
const sinon = require('sinon');

const model = require('../../../lib/consumer/model');
const service = require('../../../lib/consumer/service');
const { consumer } = require('../../fixtures');

describe('# Casos de Test Unit Consumer Service', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar um consumer com mobile 5511982247171', (done) => {
      const input = consumer.dbModel({ mobile: '5511982247171' });

      const stub = sinon.stub(model, 'findOne')
        .callsFake((arg1, callback) => callback(null, input));

      service.findOne(input.mobile, (err, res) => {
        assert.isNull(err);
        assert.strictEqual(res, input);
        stub.restore();
        done();
      });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar erro quando chamado Banco de Dados.', (done) => {
      const input = consumer.dbModel();

      const stub = sinon.stub(model, 'findOne')
        .callsFake((arg1, callback) => callback('error'));

      service.findOne(input.mobile, (err) => {
        assert.isNotNull(err);
        stub.restore();
        done();
      });
    });
  });
});
