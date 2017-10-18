var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 8080;

require('./routes')(app);

// START THE SERVER
app.listen(port, () => {
  console.log(`Find the server at: http://localhost:${port}/`);
});