const tv4 = require('tv4');

const consumerSchema = require('./consumer-schema.json');
const carSchema = require('./car-schema.json');
const brandSchema = require('./brand-schema.json');
const { httpStatusCode } = require('../commons/utils');

const Validator = {};
const self = Validator;

tv4.addSchema(carSchema);
tv4.addSchema(consumerSchema);
tv4.addSchema(brandSchema);

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
    res.status(httpStatusCode.badRequest).send(`Failed operation. ${result}`);
    return;
  }

  next();
};

Validator.consumer = buildMiddleware(consumerSchema);
Validator.car = buildMiddleware(carSchema);
Validator.brand = buildMiddleware(brandSchema);

module.exports = Validator;
