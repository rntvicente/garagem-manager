const app = require('express');

const { createConsumer } = require('./controller');
const validate = require('../validate');

const router = app.Router();

router.post('/consumers', validate, createConsumer);

module.exports = router;
