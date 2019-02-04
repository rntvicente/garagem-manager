const nock = require('nock');

const config = require('../../lib/commons/conf');
const { httpStatusCode } = require('../../lib/commons/utils');

const getModelCarByFipeId = (id) => {
  nock(`${config.get('FIPE_URL')}${id}.json`)
    .get()
    .reply(httpStatusCode.accepted);
};

module.exports = { getModelCarByFipeId };
