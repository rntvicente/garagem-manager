const database = require('../commons/database');

const collectionName = 'brands';

const insertMany = (array, callback) => {
  const brand = database.getCollection(collectionName);

  brand.insertMany(array, callback);
};

const findOne = (query, callback) => {
  const brand = database.getCollection(collectionName);

  brand.findOne(query, callback);
};

module.exports = {
  insertMany,
  findOne
};
