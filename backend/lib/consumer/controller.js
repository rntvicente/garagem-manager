const { httpStatusCode } = require('../commons/utils');

const create = (req, res) => {
  res.status(httpStatusCode.accepted).end();
};

module.exports = {
  create
};
