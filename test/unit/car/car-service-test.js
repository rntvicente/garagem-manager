const { assert } = require('chai');
const sinon = require('sinon');
const Chance = require('chance');

const { httpStatusCode } = require('../../../lib/commons/utils');
const service = require('../../../lib/car/service');
const modelCar = require('../../../lib/car/model-car');
const modelBrand = require('../../../lib/car/model-brand');
const { car } = require('../../fixtures');

const chance = new Chance();

describe('# Casos de Test Unit Car Service', () => {
  before((done) => {
    car.populateBrands(car.listBrand, (err) => {
      assert.isNull(err);
      done();
    });
  });

  describe('Casos de Sucesso', () => {
    it('Deve retornar Carro quando chamado modelCar.findOneAndUpdate', () => {
      const input = car.dbModel();
      input._id = chance.hash();
      input.created = new Date();

      const setOnInsert = {
        $setOnInsert: {
          board: input.board,
          model: input.model,
          brand: input.brand,
          year: input.year,
          created: input.created,
          _id: input._id
        }
      };

      service.findOneAndUpdateCar({ board: input.board }, setOnInsert, (err, res) => {
        assert.isNull(err);
        assert.deepEqual(res.value, input);
      });
    });

    it('Deve inserir Marcas quando chamado model.insertManyBrands', () => {
      const result = [{
        name: 'BATATA',
        nameFipe: 'Batata Frita',
        key: 'batata-6'
      }];

      service.insertManyBrands(result, (err, res) => {
        assert.isNull(err);
        assert.deepEqual(res.ops[0], result[0]);
      });
    });

    it('Deve retornar Marca quando informado o nameFipe modelBrand.findOne', () => {
      const query = {
        nameFipe: 'Audi'
      };

      const result = car.listBrand.find(f => f.nameFipe === query.nameFipe);

      service.findOneBrand(query, (err, res) => {
        assert.isNull(err);
        assert.deepEqual(res, result);
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
