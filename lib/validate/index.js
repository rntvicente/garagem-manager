const tv4 = require('tv4');

const consumerSchema = require('./consumer-schema.json');
const boardSchema = require('./board-schema.json');
const { httpStatusCode } = require('../commons/utils');

const Validator = {};
const self = Validator;

tv4.addSchema(boardSchema);
tv4.addSchema(consumerSchema);

Validator.validate = (json, schemaId) => tv4.validateMultiple(json, schemaId);

const buildMiddleware = schema => (req, res, next) => {
  const { body, params } = req;
  let value;

  if (Object.keys(body).length !== 0) {
    value = body;
  } else if (Object.keys(params).length !== 0) {
    value = params;
  } else {
    res.status(httpStatusCode.badRequest).send('Failed operation.');
    return;
  }

  const result = self.validate(value, schema);

  if (!result.valid) {
    res.status(httpStatusCode.badRequest).send('Failed operation.');
    return;
  }

  next();
};

Validator.consumer = buildMiddleware(consumerSchema);
Validator.carBoard = buildMiddleware(boardSchema);

module.exports = Validator;
