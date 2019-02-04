const debug = require('debug')('server:car');
const chalk = require('chalk');

const { httpStatusCode } = require('../commons/utils');
const service = require('./service');

const getCarOrCreate = (req, res) => {
  const { body } = req;

  const setOnInsert = {
    $setOnInsert: {
      board: body.board,
      model: body.model,
      brand: body.brand,
      year: body.year,
      create: new Date()
    }
  };

  service.findOneBrand({ nameFipe: body.brand }, (errFindBrand, brand) => {
    if (errFindBrand) {
      res.status(httpStatusCode.internalServerError).end();
      return;
    }

    if (!brand) {
      res.status(httpStatusCode.notFound).send({ message: `${body.brand} not found.` });
      return;
    }

    service.findOneAndUpdateCar(body.board, setOnInsert, (err, result) => {
      if (err) {
        res.status(httpStatusCode.internalServerError).end();
        return;
      }

      debug(chalk.green(`Car find ${JSON.stringify(result)}.`));
      res.status(httpStatusCode.created).send(result);
    });
  });
};

const insertManyBrands = (req, res) => {
  const { brands } = req.body;

  service.insertManyBrands(brands, (err, result) => {
    if (err) {
      res.status(httpStatusCode.internalServerError).end();
      return;
    }

    debug(chalk.green(`Brands inserted with success ${JSON.stringify(result)}.`));
    res.status(httpStatusCode.created).send(result);
  });
};

module.exports = {
  getCarOrCreate,
  insertManyBrands
};
