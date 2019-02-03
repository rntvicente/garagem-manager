const debug = require('debug')('server:consumer');
const chalk = require('chalk');

const { httpStatusCode } = require('../commons/utils');
const service = require('./service');

const createConsumer = (req, res) => {
  const { mobile, name } = req.body;

  const consumer = {
    mobile,
    name,
    created: new Date()
  };

  service.insert(consumer, (err, result) => {
    if (err) {
      res.status(httpStatusCode.internalServerError).end();
      return;
    }

    debug(chalk.green(`Consumer created ${JSON.stringify(result)}.`));
    res.status(httpStatusCode.accepted).send(result);
  });
};

const getConsumerByMobile = (req, res) => {
  const { mobile } = req.params;

  const mobilePattern = /^(?:(55[0-9]{2})|[0-9]{2})[6-9][0-9]{8}$/;

  if (!mobilePattern.test(mobile)) {
    debug(chalk.yellow(`Mobile ${mobile} invalid.`));
    res.status(httpStatusCode.badRequest).end();
    return;
  }

  service.findOne({ mobile }, (err, consumer) => {
    if (err) {
      res.status(httpStatusCode.internalServerError).send(err.stack);
      return;
    }

    if (!consumer) {
      res.status(httpStatusCode.notFound).send({ message: `Mobile ${mobile} not found.` });
      return;
    }

    res.status(httpStatusCode.ok).send(consumer);
  });
};

module.exports = {
  createConsumer,
  getConsumerByMobile
};
