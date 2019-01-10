const { create } = require('./controller');

module.exports = (app) => {
  app.post('/consumers', create);
};
