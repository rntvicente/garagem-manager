const app = require('express');

const { getCarOrCreate } = require('./controller');
const validator = require('../validate');

const router = app.Router();

router.post('/car', validator.car, getCarOrCreate);

module.exports = router;
