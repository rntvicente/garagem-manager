const tv4 = require('tv4');

const consumerSchema = require('./consumer-schema.json');
const { httpStatusCode } = require('../commons/utils');

module.exports = (req, res, next) => {
  const { body } = req;

  const valid = tv4.validate(body, consumerSchema);

  if (!valid) {
    return res.status(httpStatusCode.badRequest)
      .send({ message: 'Failed operation.' });
  }

  next();
};
