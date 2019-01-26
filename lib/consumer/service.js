const debug = require('debug')('server:consumer');
const chalk = require('chalk');

const model = require('./model');

const insert = (body, callback) => {
  model.insertOne(body, (err, consumer) => {
    if (err) {
      debug(chalk.red(`Database error insert Consumer: ${err}`));
      callback(err);
      return;
    }

    callback(null, consumer);
  });
};

module.exports = {
  insert
};
