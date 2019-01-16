const express = require('express');
const { get } = require('./controller');

const router = express.Router();

router.get('/health-status', get);

module.exports = router;
