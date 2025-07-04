const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

router.post('/', adminController.getAllUsers);

module.exports = router;
