const { create } = require('./controller');
const validate = require('../validate');

module.exports = (app) => {
  app.post('/consumers', validate, create);
};
