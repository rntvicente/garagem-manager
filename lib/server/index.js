const express = require('express');
const parser = require('body-parser');

const routeConsumer = require('../consumer/routes');
const routeHealthStatus = require('../health-status/routes');
const routeCar = require('../car/routes');

const app = express();

app.set('json spaces', 2);

app.use(parser.urlencoded({
  extended: true
}));

app.use(parser.json());
app.use(routeHealthStatus);
app.use(routeConsumer);
app.use(routeCar);

module.exports = app;
