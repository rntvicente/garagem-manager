const { httpStatusCode } = require('../commons/utils');
const { create } = require('./service');

const createConsumer = (req, res) => {
  const { body } = req;

  create(body, (err) => {
    if (err) {
      return res.status(httpStatusCode.internalServerError).send(err);
    }
  });

  return res.status(httpStatusCode.accepted).end();
};

module.exports = {
  createConsumer
};
