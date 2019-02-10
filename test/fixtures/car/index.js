const Chance = require('chance');

const listBrand = require('./brands');
const modelCar = require('../../../lib/car/model-car');
const modelBrands = require('../../../lib/car/model-brand');

const chance = new Chance();

const dbModel = (data = {}) => ({
  board: data.board || `${chance.word({ length: 3 }).toUpperCase()}${chance.year()}`,
  brand: data.brand || chance.pickone(listBrand.map(item => item.nameFipe)),
  model: data.model || chance.first(),
  year: data.year || Number(chance.year())
});

const findOneAndUpdate = (query, set, callback) => modelCar.findOneAndUpdate(query, set, callback);

const populateBrands = (brands, callback) => modelBrands.insertMany(brands, callback);

module.exports = {
  dbModel,
  findOneAndUpdate,
  populateBrands,
  listBrand
};
