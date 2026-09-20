const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Health / status endpoints
app.get('/', (req, res) => res.json({ status: 'active', message: 'FoodKart API Server is running' }));
app.get('/api', (req, res) => res.json({ status: 'active', message: 'FoodKart Backend API', endpoints: ['/api/auth', '/api/address', '/api/orders', '/api/restaurants'] }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/address', require('./routes/address'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/restaurants', require('./routes/restaurant'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
