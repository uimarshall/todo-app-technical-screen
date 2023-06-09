const express = require('express');
const {
  registerUser,
  loginUser,
} = require('../controllers/userAuthController');

const router = express.Router();

// Create/Register user
router.post('/register', registerUser);
// Login user
router.post('/login', loginUser);

module.exports = router;
