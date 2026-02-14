const express = require('express');
const router = express.Router();
const { addAddress, getAddresses } = require('../controllers/addressController');

// Add address
router.post('/add', addAddress);

// Get addresses by userId
router.get('/:userId', getAddresses);

module.exports = router;
