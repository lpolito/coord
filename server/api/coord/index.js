const express = require('express');
const CoordController = require('./coord.controller');

const router = express.Router();

router.get('/coord/:id', CoordController.get);

module.exports = router;
