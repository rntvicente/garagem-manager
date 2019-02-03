const debug = require('debug')('server:consumer');
const chalk = require('chalk');

const modelCar = require('./model-car');
const modelBrand = require('./model-brand');

const findOneAndUpdateCar = (query, setOnInsert, callback) => {
  modelCar.findOneAndUpdate(query, setOnInsert, (err, car) => {
    if (err) {
      debug(chalk.red(`Database error insert car: ${JSON.stringify(query)} - ${err}`));

      callback(err);
      return;
    }

    callback(null, car);
  });
};

const insertManyBrands = (query, callback) => {
  modelBrand.insertMany(query, (err, cars) => {
    if (err) {
      debug(chalk.red(`Database error insert many brand: ${JSON.stringify(query)} - ${err}`));

      callback(err);
      return;
    }

    callback(null, cars);
  });
};

const findOneBrand = (query, callback) => {
  modelBrand.findOne(query, (err, brand) => {
    if (err) {
      debug(chalk.red(`Database error find brand: ${JSON.stringify(query)} - ${err}`));

      callback(err);
      return;
    }

    callback(null, brand);
  });
};

module.exports = {
  findOneAndUpdateCar,
  insertManyBrands,
  findOneBrand
};
