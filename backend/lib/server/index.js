const bodyParser = require('body-parser');
const express = require('express');
const compress = require('compression');
const chalk = require('chalk');
const debug = require('debug')('server');

const conf = require('../commons/conf');
const pkg = require('../../package.json');

const app = express();

const server = (() => {
  const env = process.env.NODE_ENV;
  let serverProcess;

  const start = (callback) => {
    app.set('port', conf.get('PORT'));
    app.use(bodyParser.json({
      type: '*/*',
      limit: '100mb'
    }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(compress());

    serverProcess = app.listen(app.get('port'), () => {
      debug(chalk.yellow('------------------------------------------------------------------'));
      debug(chalk.yellow(`${pkg.name} - Version: ${pkg.version}                             `));
      debug(chalk.yellow('------------------------------------------------------------------'));
      debug(chalk.yellow(`ATTENTION, ${env} ENVIRONMENT!                                    `));
      debug(chalk.yellow('------------------------------------------------------------------'));
      debug(chalk.yellow(`Express server listening on port: ${serverProcess.address().port} `));
      debug(chalk.yellow('------------------------------------------------------------------'));

      return callback(null, app);
    });
  };

  const stop = (callback) => {
    if (serverProcess) {
      serverProcess.close(callback);
    }
  };

  return {
    start,
    stop
  };
})();

module.exports = server;
