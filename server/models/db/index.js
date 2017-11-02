const promise = require('bluebird');
const config = require('./../../config');

// set up postgres connection
const pgOptions = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(pgOptions);

module.exports = pgp(config.pg);
