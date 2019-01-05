const express = require('express');
const { healthStatusController } = require('../health-status');

const router = new express.Router();

router.get('/health-status', healthStatusController);

module.exports = router;
