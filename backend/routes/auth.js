const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Update profile
router.put('/profile', updateProfile);

module.exports = router;
