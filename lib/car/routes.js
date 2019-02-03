const app = require('express');

const { getCarOrCreate, insertManyBrands } = require('./controller');
const validator = require('../validate');

const router = app.Router();

router.get('/car', validator.car, getCarOrCreate);
router.post('/brands', validator.brand, insertManyBrands);

module.exports = router;
