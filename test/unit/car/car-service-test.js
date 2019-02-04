const { assert } = require('chai');
const sinon = require('sinon');

const { httpStatusCode } = require('../../../lib/commons/utils');
const service = require('../../../lib/car/service');
const modelCar = require('../../../lib/car/model-car');
const modelBrand = require('../../../lib/car/model-brand');
const { car } = require('../../fixtures');

describe('# Casos de Test Unit Car Service', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar Carro quando chamado modelCar.findOneAndUpdate', () => {
      const result = car.dbModel();
      const query = {};
      const setOnInsert = {};

      const stub = sinon.stub(modelCar, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback(null, result));

      service.findOneAndUpdateCar(query, setOnInsert, (err, res) => {
        assert.isNull(err);
        assert.strictEqual(res, result);
        stub.restore();
      });
    });

    it('Deve inserir Marcas quando chamado model.insertManyBrands', () => {
      const result = {
        name: 'AUDI',
        nameFipe: 'Audi',
        key: 'audi-6'
      };

      const stub = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback(null, result));

      service.insertManyBrands(result, (err, res) => {
        assert.isNull(err);
        assert.strictEqual(res, result);
        stub.restore();
      });
    });

    it('Deve retornar Marca quando informado o nameFipe modelBrand.findOne', () => {
      const query = {
        nameFipe: 'Audi'
      };

      const result = car.findOneBrand(query.nameFipe);

      const stub = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(null, result));

      service.findOneBrand(query, (err, res) => {
        assert.isNull(err);
        assert.strictEqual(res, result);
        stub.restore();
      });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar erro quando banco estiver fora modelCar.finOneAndUpdate', () => {
      const query = {};
      const setOnInsert = {};
      const error = 'Internal server error.';

      const stub = sinon.stub(modelCar, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback(error));

      service.findOneAndUpdateCar(query, setOnInsert, (err) => {
        assert.isNotNull(err);
        assert.equal(err, error);
        stub.restore();
      });
    });

    it('Deve retonar erro quando banco estiver fora model.insertManyBrands', () => {
      const error = 'Internal Server Error';
      const query = {};

      const stub = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback(error));

      service.insertManyBrands(query, (err) => {
        assert.isNotNull(err);
        assert.equal(err, error);
        stub.restore();
      });
    });

    it('Deve retonar 500 quando tentar gravar uma Marca existente model.insertManyBrands', () => {
      const brand = 'Audi';

      const error = {
        message: 'Internal Server Error',
        status: httpStatusCode.internalServerError
      };

      const stub = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback(error));

      service.insertManyBrands(brand, (err) => {
        assert.isNotNull(err);
        assert.strictEqual(err, error);
        stub.restore();
      });
    });

    it('Deve retornar erro quando banco estiver fora modelBrand.findOne', () => {
      const query = {
        nameFipe: 'Audi'
      };

      const error = 'Internal Server Error';

      const stub = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(error));

      service.findOneBrand(query, (err) => {
        assert.isNotNull(err);
        assert.strictEqual(err, error);
        stub.restore();
      });
    });

    it('Deve retonar null quando não encontrado Modelo modelBrand.findOne', () => {
      const query = {
        nameFipe: 'batata'
      };

      const stub = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(null, null));

      service.findOneBrand(query, (err, res) => {
        assert.isNull(err);
        assert.strictEqual(res, null);
        stub.restore();
      });
    });
  });
});
