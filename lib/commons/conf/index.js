const nconf = require('nconf');

nconf.argv()
  .env()
  .file('config/garage-manager-config.json')
  .defaults({
    PORT: 3000
  });

module.exports = nconf;
