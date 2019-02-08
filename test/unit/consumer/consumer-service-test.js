const { assert } = require('chai');
const sinon = require('sinon');

const model = require('../../../lib/consumer/model');
const service = require('../../../lib/consumer/service');
const { consumer } = require('../../fixtures');

describe('# Casos de Test Unit Consumer Service', () => {
  describe('Casos de Sucesso', () => {
    it('Deve inserir um consumer com mobile 5511982247171', (done) => {
      const input = consumer.dbModel({ mobile: '5511982247171' });

      service.insert(input, (error) => {
        assert.isNull(error);

        service.findOne({ mobile: input.mobile }, (err, res) => {
          assert.isNull(err);
          assert.equal(res.mobile, input.mobile);
          done();
        });
      });
    });

    it('Deve retonar vazio quando não encontrado mobile inserido', (done) => {
      const input = consumer.dbModel({ mobile: '5511982247171' });

      service.insert(input, (error) => {
        assert.isNull(error);

        service.findOne({ mobile: '5511982247272' }, (err, res) => {
          assert.isNull(err);
          assert.isNull(res);
          done();
        });
      });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar erro qunado tentado inserir um consumer, mas Banco falhou.', (done) => {
      const input = consumer.dbModel();

      const stub = sinon.stub(model, 'insertOne')
        .callsFake((arg1, callback) => callback('error'));

      service.insert(input, (err) => {
        assert.isNotNull(err);
        stub.restore();
        done();
      });
    });

    it('Deve retornar erro quando buscar um mobile, mas Banco falhou', (done) => {
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
