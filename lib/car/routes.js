const app = require('express');

const { getCarOrCreate } = require('./controller');

const router = app.Router();

router.post('/car/board/:board', getCarOrCreate);

module.exports = router;
