const debug = require('debug')('server:consumer');
const chalk = require('chalk');

const model = require('./model');

const findOneAndUpdate = (query, setOnInsert, callback) => {
  model.findOneAndUpdate(query, setOnInsert, (err, car) => {
    if (err) {
      debug(chalk.red(`Database error insert car: ${JSON.stringify(query)} - ${err}`));

      callback(err);
      return;
    }

    callback(null, car);
  });
};

module.exports = {
  findOneAndUpdate
};
