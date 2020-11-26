const express = require('express');
const router = express.Router();
// const upload = require('../config/storage.js');
const { renderHome, renderChef } = require('../controllers/indexController');

/* GET home page. */
router.get('/', renderHome);

/* GET chef page. */
router.get('/:id', renderChef);

module.exports = router;
