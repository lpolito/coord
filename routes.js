const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  // all of our routes will be prefixed with /api
  app.use('/api', router);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
};
