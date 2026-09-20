const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Ensure DB connection on serverless calls
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB Connection error in serverless request:", err);
        next();
    }
});

const authRoutes = require('../backend/routes/auth');
const addressRoutes = require('../backend/routes/address');
const orderRoutes = require('../backend/routes/order');
const restaurantRoutes = require('../backend/routes/restaurant');

// Support both /api/... and /... routes for Vercel serverless function
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/address', addressRoutes);
app.use('/address', addressRoutes);

app.use('/api/orders', orderRoutes);
app.use('/orders', orderRoutes);

app.use('/api/restaurants', restaurantRoutes);
app.use('/restaurants', restaurantRoutes);

app.get(['/api', '/'], (req, res) => res.json({ status: 'active', message: 'FoodKart API on Vercel' }));

module.exports = app;
