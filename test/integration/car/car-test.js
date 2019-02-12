const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const database = require('../../../lib/commons/database');
const modelCar = require('../../../lib/car/model-car');
const modelBrand = require('../../../lib/car/model-brand');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { car } = require('../../fixtures');

describe('#GET Casos de Test Car', () => {
  before((done) => {
    car.populateBrands(car.listBrand, (err) => {
      assert.isNull(err);
      done();
    });
  });

  after((done) => {
    database.dropCollections('cars', 'brands', done);
  });

  describe('Casos de Sucesso', () => {
    it('Deve retornar 201 quando a placa não existir.', (done) => {
      const input = car.dbModel();

      request(app)
        .get('/cars')
        .send(input)
        .expect(httpStatusCode.created)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.body.value.board, input.board);
          done();
        });
    });

    it('Deve retornar 201 quando já existir a placa e não deve inserir um novo.', (done) => {
      const input = car.dbModel();

      modelCar.findOneAndUpdate(
        { board: input.board },
        {
          $setOnInsert: {
            board: input.board,
            model: input.model,
            brand: input.brand,
            year: input.year,
            create: new Date()
          }
        }, (error, result) => {
          assert.isNull(error);
          assert.equal(result.value.board, input.board);

          request(app)
            .get('/cars')
            .send(input)
            .expect(httpStatusCode.created)
            .end((err, resultFind) => {
              assert.isNull(err);
              assert.equal(resultFind.body.value.board, input.board);
              done();
            });
        }
      );
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retornar 500 quando chamado modelCar.findOneAndUpdate falhar.', (done) => {
      const input = car.dbModel();

      const stubCar = sinon.stub(modelCar, 'findOneAndUpdate')
        .callsFake((arg1, arg2, callback) => callback('Internal Server Error'));

      request(app)
        .get('/cars')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stubCar.restore();
          done();
        });
    });

    it('Deve retornar 500 quando chamado modelBrand.findOne falhar.', (done) => {
      const input = car.dbModel();

      const stubBrand = sinon.stub(modelBrand, 'findOne')
        .callsFake((arg1, callback) => callback('Internal Server Error'));

      request(app)
        .get('/cars')
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
        .get('/cars')
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
        .get('/cars')
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
        .get('/cars')
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
        .get('/cars')
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
        .get('/cars')
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
        .get('/cars')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 404 quando Marca não existir.', (done) => {
      const input = car.dbModel({ brand: 'batata' });

      request(app)
        .get('/cars')
        .send(input)
        .expect(httpStatusCode.notFound)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retonar 400 quando Modelo for undefined.', (done) => {
      const input = car.dbModel();

      input.model = undefined;

      request(app)
        .get('/cars')
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
        .get('/cars')
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
  before((done) => {
    car.populateBrands(car.listBrand, (err) => {
      assert.isNull(err);
      done();
    });
  });

  after((done) => {
    database.dropCollections('cars', 'brands', done);
  });

  describe('Casos de Sucessos', () => {
    it('Deve retornar 201 quando informando Marca.', (done) => {
      const result = car.listBrand.find(f => f.nameFipe === 'GM - Chevrolet');

      const input = {
        brands: [{
          name: 'CHEVROLET',
          nameFipe: 'GM - Chevrolet',
          key: 'gm-chevrolet-23'
        }]
      };

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.created)
        .end((err, res) => {
          assert.isNull(err);
          assert.equal(res.body.ops[0].key, result.key);
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

      request(app)
        .post('/brands')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });
  });
});
