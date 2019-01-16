const { assert } = require('chai');
const request = require('supertest');

const app = require('../../../lib/server');
const { httpStatusCode } = require('../../../lib/commons/utils');

describe('#Health Status Success case', () => {
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
