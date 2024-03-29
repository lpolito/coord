const express = require('express');
const CoordsController = require('./coords.controller');

const router = express.Router();

router.get('/coords', CoordsController.getAll);
router.get('/coords/:id', CoordsController.get);

module.exports = router;
