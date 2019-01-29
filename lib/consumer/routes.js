const app = require('express');

const { createConsumer, getConsumerByMobile } = require('./controller');
const validator = require('../validate');

const router = app.Router();

router.post('/consumers', validator.consumer, createConsumer);
router.get('/consumers/mobile/:mobile', getConsumerByMobile);

module.exports = router;
