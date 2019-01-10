const ip = require('ip');

const packageJson = require('../../package.json');
const { httpStatusCode } = require('../commons/utils');

const get = (req, res) => {
  const health = {
    datetime: new Date(),
    service: packageJson.name,
    version: packageJson.version,
    ip: ip.address(),
    container: process.env.HOSTNAME
  };

  return res.status(httpStatusCode.ok).send(health);
};

module.exports = {
  get
};
