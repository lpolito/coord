module.exports = function (app) {
  var express = require('express');
  var router = express.Router();

  router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  // all of our routes will be prefixed with /api
  app.use('/api', router);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}