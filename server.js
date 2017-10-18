var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 3001;

require('./routes')(app);

// START THE SERVER
app.listen(port, () => {
  console.log(`Express server at: http://localhost:${port}/`);
});