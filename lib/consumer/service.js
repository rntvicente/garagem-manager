const debug = require('debug')('server:consumer');
const chalk = require('chalk');

const { insert } = require('./model');

const create = (body, callback) => {
  insert(body, (err, consumer) => {
    if (err) {
      debug(chalk.red(`Database error insert consumer: ${err}`));
      return callback(err);
    }

    return callback(null, consumer);
  });
};

module.exports = {
  create
};
