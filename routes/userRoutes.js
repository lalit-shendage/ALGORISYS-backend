
const express = require('express');
const UserController = require('../controller/userContreoller');

const router = express.Router();


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);


router.get('/profile', UserController.getProfile);

module.exports = router;
