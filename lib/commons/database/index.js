const { MongoClient } = require('mongodb');
const debug = require('debug')('server:database');
const chalk = require('chalk');

const database = {};
let db = {};

database.connect = (url, callback) => {
  debug(chalk.cyan('Database connecting ...'));

  MongoClient.connect(url, (err, _db) => {
    if (err) {
      debug(chalk.red(`Database failed to connect. ${err.message}`));
      return callback(err);
    }

    db = _db;

    debug(chalk.green('Database connected.'));
    return callback(null, db);
  });
};

module.exports = database;
