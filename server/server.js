const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const google = require('googleapis');
const objection = require('objection');
const Knex = require('knex');

const config = require('./config');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up pg knex connection
const knex = Knex(config.pg);

// Give the connection to objection.
objection.Model.knex(knex);

// set up googleapis and global defaults
google.options({
  auth: 'AIzaSyDLWZ_wsNwvHnF91EuDYO_FdDc5xV7F7Tw'
});

require('./routes/')(app);

// START THE SERVER
app.listen(config.port, () => {
  console.log(`Express server at: http://localhost:${config.port}/`);
});
