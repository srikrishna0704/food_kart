const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// @route   GET /api/restaurants
// @desc    Get all restaurants or filter by category
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { cuisine: { $regex: search, $options: 'i' } }
            ];
        }

        const restaurants = await Restaurant.find(query);
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving restaurants', error: error.message });
    }
});

// @route   GET /api/restaurants/:id
// @desc    Get single restaurant by custom id
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ id: Number(req.params.id) });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Server error retrieving restaurant', error: error.message });
    }
});

module.exports = router;
