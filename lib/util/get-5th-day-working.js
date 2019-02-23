const debug = require('debug')('sserver:fifty-day');
const chalk = require('chalk');
const moment = require('moment');

const SUNDAY = 0;
const SATURDAY = 6;

const get = (referenceDate) => {
  const isValid = moment(referenceDate, 'YYYY-MM-DD');

  if (!referenceDate || !isValid.isValid()) {
    debug(chalk.yellow('Date invalid or not infomed.'));
    throw new Error('Date invalid or not infomed.');
  }

  const firstDay = moment(referenceDate).date(1);
  let count = 1;

  while (count < 5) {
    const day = moment(firstDay).day();

    if (day !== SATURDAY && day !== SUNDAY) {
      count += 1;
    }

    firstDay.add(1, 'days');
  }

  return moment(firstDay).format('YYYY-MM-DD');
};

module.exports = { get };
