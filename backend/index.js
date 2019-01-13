const chalk = require('chalk');
const debug = require('debug')('server');

const server = require('./lib/server');

const shutdown = event => () => {
  debug(chalk.yellow(`Gracefully shutdown in progress, with event ${event}`));
  server.stop(() => {
    process.exit(0);
  });
};

process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('SIGHUP', shutdown('SIGHUP'))
  .on('uncaughtException', (err) => {
    chalk.green(`uncaughtException caught the error: ${err}`);
    throw err;
  })
  .on('exit', (code) => {
    chalk.red(`Node process exit with code: ${code}`);
  });

server.start((err) => {
  if (err) {
    chalk.red('[APP] initialization failed', err);
  }

  chalk.yellow('[APP] initialized SUCCESSFULLY');
});
