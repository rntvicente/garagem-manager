const { MongoClient } = require('mongodb');
const debug = require('debug')('server:database');
const chalk = require('chalk');

const Database = {};
let db = {};
const collections = [];

Database.connect = (url, callback) => {
  debug(chalk.cyan('Database connecting ...'));

  MongoClient.connect(url, { useNewUrlParser: true }, (err, _db) => {
    if (err) {
      debug(chalk.red(`Database failed to connect. ${err.message}`));
      return callback(err);
    }

    db = _db;

    debug(chalk.green('Database connected.'));
    return callback(null, db);
  });
};

Database.getCollection = (name) => {
  let collection = collections[name];

  if (!collection) {
    collection = db.db().collection(name);
    collections[name] = collection;
  }

  return collection;
};

Database.dropDatabase = (callback) => {
  db.db().dropDatabase(callback);
};

Database.close = (callback) => {
  debug(chalk.red('Database trying to disconnect'));

  if (db) {
    db.close((err) => {
      if (err) {
        debug(chalk.red('Error on closing database'));
      } else {
        debug(chalk.green('Database disconnected'));
      }

      callback(err);
    });
  }
};

module.exports = Database;
