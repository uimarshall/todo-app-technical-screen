const express = require('express');
const { registerUser } = require('../controllers/userAuthController');

const router = express.Router();

// Create/Register user
router.post('/register', registerUser);

module.exports = router;
