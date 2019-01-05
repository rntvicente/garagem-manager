const ip = require('ip');

const packageInfo = require('../../package.json');
const { httpStatusCode } = require('../commons/utils/http-status-code');

const healthStatusController = (req, res) => {
  const health = {
    datetime: new Date(),
    service: packageInfo.name,
    version: packageInfo.version,
    ip: ip.address(),
    container: process.env.HOSTNAME
  };

  return res.status(httpStatusCode.ok).send(health);
};

module.exports = healthStatusController;
