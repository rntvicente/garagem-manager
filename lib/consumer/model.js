const database = require('../commons/database');

const collectionName = 'consumers';

const insertOne = (query, callback) => {
  const consumer = database.getCollection(collectionName);

  consumer.insertOne(query, callback);
};

const findOne = (query, callback) => {
  const consumer = database.getCollection(collectionName);

  consumer.findOne(query, callback);
};

module.exports = {
  insertOne,
  findOne
};
