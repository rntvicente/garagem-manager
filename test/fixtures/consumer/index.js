const Chance = require('chance');

const model = require('../../../lib/consumer/model');

const chance = new Chance();

const dbModel = (data = {}) => ({
  mobile: data.mobile || '5511982247171',
  name: data.name || chance.name({ nationality: 'it' })
});

const populate = (query, callback) => model.insertOne(query, callback);

module.exports = { dbModel, populate };
