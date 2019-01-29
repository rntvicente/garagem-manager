const tv4 = require('tv4');

const consumerSchema = require('./consumer-schema.json');
const boardSchema = require('./board-schema.json');
const { httpStatusCode } = require('../commons/utils');

const Validator = {};
const self = Validator;

tv4.addSchema(boardSchema);
tv4.addSchema(consumerSchema);

Validator.getErrorMessages = (result) => {
  const errors = [];

  result.errors.forEach((error) => {
    errors.push(error.message);
  });

  return errors;
};

Validator.formatErrorMessage = (result) => {
  const errors = self.getErrorMessages(result);
  return `${errors.join('.\n')}.`;
};

Validator.validate = (json, schemaId) => tv4.validateMultiple(json, schemaId);

const buildMiddleware = schema => (req, res, next) => {
  const result = self.validate(req.body, schema);

  if (!result.valid) {
    const errorResult = 'Failed operation.';
    return res.status(httpStatusCode.badRequest).send(errorResult);
  }

  next();
};

Validator.consumer = buildMiddleware(consumerSchema);
Validator.carBoard = buildMiddleware(boardSchema);

module.exports = Validator;
