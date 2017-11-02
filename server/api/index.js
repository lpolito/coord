// const ytVideos = require('./../models/google/youtube/videos');
const express = require('express');
const coords = require('./coords');

module.exports = (app) => {
  const router = express.Router();

  router.use(coords);

  // all of our routes will be prefixed with /api
  app.use('/api', router);

  // catch 404 and forward to error handler
  // app.use((req, res, next) => {
  //   const err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });
};
