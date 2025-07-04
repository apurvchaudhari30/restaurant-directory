const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/addUser', userController.signup);
router.post('/',userController.getAllSignupUsers);

module.exports = router;
