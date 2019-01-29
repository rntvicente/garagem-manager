const { httpStatusCode } = require('../commons/utils');

const getCarOrCreate = (req, res) => {
  res.status(httpStatusCode.accepted).end();
};

module.exports = {
  getCarOrCreate
};
