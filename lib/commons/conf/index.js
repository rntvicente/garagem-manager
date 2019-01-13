const nconf = require('nconf');

nconf.argv()
  .env()
  .file('config/power-car-config.json')
  .defaults({
    PORT: 3000,
    MONGO_URL_TEST: 'mongodb://127.0.0.1/powerCarTest'
  });

module.exports = nconf;
