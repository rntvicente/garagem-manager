const database = require('../commons/database');

const collectionName = 'cars';

const findOneAndUpdate = (query, set, callback) => {
  const car = database.getCollection(collectionName);

  car.findOneAndUpdate(query, set, { returnOriginal: false, upsert: true }, callback);
};

module.exports = {
  findOneAndUpdate
};
