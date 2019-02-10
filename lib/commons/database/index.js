const { MongoClient } = require('mongodb');
const async = require('async');
const debug = require('debug')('server:database');
const chalk = require('chalk');

const Database = {};
const self = Database;
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

Database.dropCollections = (...theArgs) => {
  const lastIndex = theArgs.length - 1;
  const collectionsToDrop = [];
  let done;

  for (let i = 0; i < theArgs.length; i += 1) {
    const arg = theArgs[i];
    if (i === lastIndex && typeof arg === 'function') {
      done = arg;
    } else {
      const collection = self.getCollection(arg);

      if (collection) {
        collectionsToDrop.push(collection);
      }
    }
  }

  if (done) {
    async.each(collectionsToDrop, (collectionDrop, callback) => {
      collectionDrop.drop(() => {
        callback();
      });
    }, done);
  }
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
