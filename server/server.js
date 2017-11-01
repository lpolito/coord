const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const google = require('googleapis');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

// set up googleapis and global defaults
google.options({
  auth: 'AIzaSyDLWZ_wsNwvHnF91EuDYO_FdDc5xV7F7Tw'
});

require('./api/')(app);

// START THE SERVER
app.listen(port, () => {
  console.log(`Express server at: http://localhost:${port}/`);
});
