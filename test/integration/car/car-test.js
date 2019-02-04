const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const modelCar = require('../../../lib/car/model-car');
const modelBrand = require('../../../lib/car/model-brand');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { car } = require('../../fixtures');

describe('#GET Casos de Test Car', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar 201 quando a placa não existir.', (done) => {
      const input = car.dbModel();

      const brand = car.findOneBrand(input.brand);

      const stubBrand = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(null, brand));

      const stubCar = sinon.stub(modelCar, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback(null, input));

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.created)
        .end((err) => {
          assert.isNull(err);
          stubCar.restore();
          stubBrand.restore();
          done();
        });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar 500 quando chamado modelCar.findOneAndUpdate falhar.', (done) => {
      const result = car.findOneBrand('GM - Chevrolet');

      const input = car.dbModel();

      const stubBrand = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(null, result));

      const stubCar = sinon.stub(modelCar, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback('Internal Server Error'));

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stubBrand.restore();
          stubCar.restore();
          done();
        });
    });

    it('Deve retornar 500 quando chamado modelBrand.findOne falhar.', (done) => {
      const input = car.dbModel();

      const stubBrand = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback('Internal Server Error'));

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stubBrand.restore();
          done();
        });
    });

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

    it('Deve retonar 404 quando Marca não existir.', (done) => {
      const input = car.dbModel({ brand: 'batata' });

      const stub = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback(null, null));

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.notFound)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });

    it('Deve retonar 400 quando Modelo for undefined.', (done) => {
      const input = car.dbModel();

      input.model = undefined;

      request(app)
        .get('/car')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Modelo for vazio.', (done) => {
      const input = car.dbModel();

      input.model = '';

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

describe('#POST Casos de Test Brand', () => {
  describe('Casos de Sucessos', () => {
    it('Deve retornar 201 quando informando Marca.', (done) => {
      const result = car.findOneBrand('GM - Chevrolet');

      const input = {
        brands: [{
          name: 'CHEVROLET',
          nameFipe: 'GM - Chevrolet',
          key: 'gm-chevrolet-23'
        }]
      };

      const stubBrand = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback(null, result));

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.created)
        .end((err, res) => {
          assert.isNull(err);
          assert.deepEqual(res.body, result);
          stubBrand.restore();
          done();
        });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar 500 quando banco falhar.', (done) => {
      const input = {
        brands: [{
          name: 'CHEVROLET',
          nameFipe: 'GM - Chevrolet',
          key: 'gm-chevrolet-23'
        }]
      };

      const stubBrand = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback('INternal Server Error'));

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stubBrand.restore();
          done();
        });
    });

    it('Deve retornar 400 quando body for vazio.', (done) => {
      request(app)
        .post('/brands')
        .send()
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando Brands for undenifed.', (done) => {
      const input = {
        brands: undefined
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando Brands tiver array vazio.', (done) => {
      const input = {
        brands: [{}]
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando não informado name.', (done) => {
      const input = {
        brands: [{
          nameFipe: 'GM - Chevrolet',
          key: 'gm-chevrolet-23'
        }]
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando não informado nameFipe.', (done) => {
      const input = {
        brands: [{
          name: 'CHEVROLET',
          key: 'gm-chevrolet-23'
        }]
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando não informado key.', (done) => {
      const input = {
        brands: [{
          name: 'CHEVROLET',
          nameFipe: 'GM - Chevrolet',
        }]
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 500 quando duplicar Marca.', (done) => {
      const input = {
        brands: [{
          name: 'CHEVROLET',
          nameFipe: 'GM - Chevrolet',
        }]
      };

      const stubBrand = sinon.stub(modelBrand, 'insertMany')
        .callsFake((arg1, callback) => callback('Duplicate register'));

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          stubBrand.restore();
          done();
        });
    });
  });
});
