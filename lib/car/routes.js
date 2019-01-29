const app = require('express');

const { getCarOrCreate } = require('./controller');
const validator = require('../validate');

const router = app.Router();

router.post('/car/board/:board', validator.carBoard, getCarOrCreate);

module.exports = router;
