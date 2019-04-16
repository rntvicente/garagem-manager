const request = require('request');
const debug = require('debug')('server:fipe');
const chalk = require('chalk');

const config = require('../commons/conf');
const { httpStatusCode, validation } = require('../commons/utils');

const FIPE_URL = process.env.FIPE_URL ? process.env.FIPE_URL : config.get('FIPE_URL');

const getModelCarByFipeId = (id, callback) => {
  const url = `${FIPE_URL}${id}.json`;

  if (!validation.isNumber(id)) {
    const messagem = `Could not complete your request. ID: ${id}`;

    debug(chalk.yellow(messagem));

    callback(messagem);
    return;
  }

  request.get(url, (err, res) => {
    if (err) {
      debug(chalk.red(`Request ${url} error ${err.stack}`));

      callback(err);
      return;
    }

    if (res.statusCode >= httpStatusCode.multipleChoice) {
      debug(chalk.yellow(`Could not complete your request. ${JSON.stringify(res)}`));

      callback(res);
      return;
    }

    callback(null, res);
  });
};

module.exports = {
  getModelCarByFipeId
};
