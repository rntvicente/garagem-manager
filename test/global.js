const config = require('../lib/commons/conf');
const db = require('../lib/commons/database');

before((done) => {
  db.connect(config.get('MONGO_URL_TEST'), () => {
    done();
  });
});

after((done) => {
  db.dropDatabase(() => {
    db.close(done);
  });
});
