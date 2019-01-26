const Chance = require('chance');

const { insert } = require('../../../lib/consumer/model');

const chance = new Chance();

const dbModel = (data = {}) => ({
  mobile: data.mobile || '5511982247171',
  name: data.name || chance.name({ nationality: 'it' })
});

const populate = (query, callback) => insert(query, callback);

module.exports = { dbModel, populate };
