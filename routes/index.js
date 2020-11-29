const express = require('express');
const router = express.Router();
// const upload = require('../config/storage.js');
const { 
    renderHome, renderChef, renderLogin, renderRegister, renderPlatesForm, renderNotFound 
} = require('../controllers/indexController');

/* GET home page. */
router.get('/', renderHome);

/* GET register page. */
router.get('/register', renderRegister);

/* GET login page. */
router.get('/login', renderLogin);

/* GET chef page. */
router.get('/:chef_id', renderChef);

/* GET plate form page. */
router.get('/:chef_id/plates', renderPlatesForm);
router.get('/:chef_id/plates/:plate_id', renderPlatesForm);


/* GET Not Found page. */
router.get('*', renderNotFound);

module.exports = router;
