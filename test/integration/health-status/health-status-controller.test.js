const { assert } = require('chai');
const request = require('supertest');

const { httpStatusCode } = require('../../../lib/commons/utils');
const applicationServer = require('../../../lib/server');

describe('#Health Status Success case', () => {
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

  it('Should return status code 200', (done) => {
    request(app)
      .get('/health-status')
      .expect(httpStatusCode.ok)
      .end((err) => {
        assert.isNull(err);
        done();
      });
  });
});
