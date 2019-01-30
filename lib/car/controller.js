const debug = require('debug')('server:car');
const chalk = require('chalk');

const { httpStatusCode } = require('../commons/utils');
const service = require('./service');

const getCarOrCreate = (req, res) => {
  const { body } = req;

  const query = {
    board: body.board
  };

  const setOnInsert = {
    $setOnInsert: {
      board: body.board,
      model: body.model,
      brand: body.brand,
      year: body.year,
      create: new Date()
    }
  };

  service.findOneAndUpdate(query, setOnInsert, (err, result) => {
    if (err) {
      res.status(httpStatusCode.internalServerError).end();
      return;
    }

    debug(chalk.green(`Car find ${JSON.stringify(result)}.`));
    res.status(httpStatusCode.accepted).send(result);
  });
};

module.exports = {
  getCarOrCreate
};
