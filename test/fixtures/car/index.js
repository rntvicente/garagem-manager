const Chance = require('chance');

const model = require('../../../lib/car/model');

const chance = new Chance();

const dbModel = (data = {}) => ({
  board: data.board || `${chance.word({ length: 3 }).toUpperCase()}${chance.year()}`,
  model: data.model || chance.first(),
  brand: data.brand || chance.last(),
  year: data.year || Number(chance.year())
});

const populate = (query, callback) => model.insertOne(query, callback);

module.exports = { dbModel, populate };
