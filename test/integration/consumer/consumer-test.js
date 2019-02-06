const { assert } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const app = require('../../../lib/server');
const model = require('../../../lib/consumer/model');
const { httpStatusCode } = require('../../../lib/commons/utils');
const { consumer } = require('../../fixtures');

describe('#POST Caso de Test Consumers', () => {
  describe('Casos de sucesso', () => {
    it('Deve retornar 202 quando chamado a rota', (done) => {
      const input = consumer.dbModel();

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.accepted)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 202 quando informado mobile com DDI 55', (done) => {
      const input = consumer.dbModel({ mobile: '5511982247878' });

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
      request(app)
        .post('/consumers')
        .send({})
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando mobile for invalido', (done) => {
      const input = {
        mobile: 'batata'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando informado mobile sem DDI', (done) => {
      const input = {
        mobile: '982247777'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando informado mobile sem DDD', (done) => {
      const input = {
        mobile: '982247777'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando informado mobile tipo number.', (done) => {
      const input = {
        mobile: 13982247475
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 400 quando não informado nome', (done) => {
      const input = {
        mobile: '13982247475'
      };

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          done();
        });
    });

    it('Deve retornar 500 quando houver alguma falha de banco.', (done) => {
      const input = consumer.dbModel();

      const stub = sinon.stub(model, 'insertOne')
        .callsFake((arg1, callback) => callback({ err: 'error' }));

      request(app)
        .post('/consumers')
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });
  });
});

describe('#GET Caso de Test Consumers', () => {
  describe('Casos de Sucesso', () => {
    it('Deve retornar 200 quando encontrar mobile 5511982247171', (done) => {
      const input = consumer.dbModel();

      consumer.populate(input, (error) => {
        assert.isNull(error);

        request(app)
          .get(`/consumers/mobile/${input.mobile}`)
          .send(input)
          .expect(httpStatusCode.ok)
          .end((err, res) => {
            assert.isNull(err);
            assert.equal(res.body.mobile, input.mobile);
            done();
          });
      });
    });
  });

  describe('Casos de Falhas', () => {
    it('Deve retonar 400 quando informado mobile sem DDD', (done) => {
      const input = consumer.dbModel({ mobile: '982247184' });

      const stub = sinon.stub(model, 'findOne')
        .callsFake((arg1, callback) => callback(null, input));

      request(app)
        .get(`/consumers/mobile/${input.mobile}`)
        .send(input)
        .expect(httpStatusCode.badRequest)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });

    it('Deve retornar 500 quando houver alguma falha de banco.', (done) => {
      const input = consumer.dbModel();

      const stub = sinon.stub(model, 'findOne')
        .callsFake((arg1, callback) => callback('Internal Server Error'));

      request(app)
        .get(`/consumers/mobile/${input.mobile}`)
        .send(input)
        .expect(httpStatusCode.internalServerError)
        .end((err) => {
          assert.isNull(err);
          stub.restore();
          done();
        });
    });

    it('Deve retornar 404 quando não encontrado mobile informado.', (done) => {
      const input = consumer.dbModel();

      consumer.populate(input, (error) => {
        assert.isNull(error);

        request(app)
          .get('/consumers/mobile/5511982247172')
          .send(input)
          .expect(httpStatusCode.notFound)
          .end((err) => {
            assert.isNull(err);
            done();
          });
      });
    });
  });
});
