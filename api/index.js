const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Middleware to ensure DB connection on serverless calls
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("DB Connection error in serverless request:", err);
        next();
    }
});

// Health / status endpoints
app.get('/api', (req, res) => res.json({ status: 'active', message: 'FoodKart API on Vercel', endpoints: ['/api/auth', '/api/address', '/api/orders', '/api/restaurants'] }));

// Routes
app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/address', require('../backend/routes/address'));
app.use('/api/orders', require('../backend/routes/order'));
app.use('/api/restaurants', require('../backend/routes/restaurant'));

module.exports = app;
