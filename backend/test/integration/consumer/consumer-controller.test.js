const { assert } = require('chai');
const request = require('supertest');

const { httpStatusCode } = require('../../../lib/commons/utils');
const applicationServer = require('../../../lib/server');

describe('# Caso de Test Consumers', () => {
  let app;

  beforeEach((done) => {
    applicationServer.start((err, express) => {
      app = express;
      done();
    });
  });

  afterEach((done) => {
    applicationServer.stop(done);
  });

  it('Deve retornar 202 quando chamada a route /post', () => {
    request(app)
      .post('/consumers')
      .expect(httpStatusCode.accepted)
      .end((err) => {
        assert.isNull(err);
      });
  });
});
