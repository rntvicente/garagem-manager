const app = require('express');

const { createConsumer, getConsumerByMobile } = require('./controller');
const validate = require('../validate');

const router = app.Router();

router.post('/consumers', validate, createConsumer);
router.get('/consumers/mobile/:mobile', getConsumerByMobile);

module.exports = router;
