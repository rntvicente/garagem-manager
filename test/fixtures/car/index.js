const Chance = require('chance');

const brands = require('./brands');

const chance = new Chance();

const dbModel = (data = {}) => ({
  board: data.board || `${chance.word({ length: 3 }).toUpperCase()}${chance.year()}`,
  brand: data.brand || chance.pickone(brands.map(item => item.nameFipe)),
  model: data.model || chance.first(),
  year: data.year || Number(chance.year())
});

const findOneBrand = brand => brands.find(f => f.nameFipe === brand);

module.exports = { dbModel, findOneBrand };
