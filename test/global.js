const chalk = require('chalk');

const database = require('../lib/commons/database');
const config = require('../lib/commons/conf');

before((done) => {
  database.connect(config.get('MONGO_TEST'), (err) => {
    if (err) {
      chalk.red('Shutdown the application because an error occurred when connecting to database');
      process.exit(1);
    }

    done(err);
  });
});

after((done) => {
  database.dropDatabase(() => {
    database.close(done);
  });
});
