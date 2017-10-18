const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

require('./routes')(app);

// START THE SERVER
app.listen(port, () => {
  console.log(`Express server at: http://localhost:${port}/`);
});
