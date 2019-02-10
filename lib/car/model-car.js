const database = require('../commons/database');

const collectionName = 'cars';

const findOneAndUpdate = (query, setOnInsert, callback) => {
  const car = database.getCollection(collectionName);

  car.findOneAndUpdate(query, setOnInsert, { returnOriginal: false, upsert: true }, callback);
};

module.exports = {
  findOneAndUpdate
};
