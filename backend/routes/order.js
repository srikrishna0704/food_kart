const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');

// Place order
router.post('/place', placeOrder);

// Get orders by userId
router.get('/:userId', getOrders);

module.exports = router;
