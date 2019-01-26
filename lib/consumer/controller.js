const { httpStatusCode } = require('../commons/utils');
const { insert } = require('./service');

const createConsumer = (req, res) => {
  const { body } = req;

  insert(body, (err, consumer) => {
    if (err) {
      res.status(httpStatusCode.internalServerError).send(err);
      return;
    }

    res.status(httpStatusCode.accepted).send(consumer);
  });
};

module.exports = {
  createConsumer
};
