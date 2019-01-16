const chalk = require('chalk');
const debug = require('debug')('server');

const server = require('./lib/server');
const database = require('./lib/commons/database');
const conf = require('./lib/commons/conf');

const shutdown = event => () => {
  debug(chalk.yellow(`Gracefully shutdown in progress, with event ${event}`));
  process.exit(0);
};

database.connect(conf.get('MONGO_URL'), (err) => {
  if (err) {
    debug(chalk.red('Shutdown the application because an error occurred when connecting to database'));
    process.exit(1);
  }
});

process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('SIGHUP', shutdown('SIGHUP'))
  .on('uncaughtException', (err) => {
    debug(chalk.green(`uncaughtException caught the error: ${err}`));
    throw err;
  })
  .on('exit', (code) => {
    debug(chalk.red(`Node process exit with code: ${code}`));
  });

const app = server.listen(conf.get('PORT'), (err) => {
  if (err) {
    debug(chalk.red(`Error on listen port. ${err.message}`));
  }

  debug(chalk.green(`Server starting at ${app.address().address}, ${app.address().port}`));

  app.on('close', () => {
    debug(chalk.bgYellow('Shutdown the application server'));
  });
});

module.exports = app;
