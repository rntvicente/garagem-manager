const { get } = require('./controller');

module.exports = (app) => {
  app.get('/health-status', get);
};
