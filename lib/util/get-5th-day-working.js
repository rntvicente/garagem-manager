const debug = require('debug')('sserver:fifty-day');
const chalk = require('chalk');
const moment = require('moment');

const get = (referenceDate) => {
  if (!referenceDate) {
    debug(chalk.yellow('Date inavlid or not infomed.'));
    throw new Error('Date inavlid or not infomed.');
  }

  return moment();
};

module.exports = { get };
