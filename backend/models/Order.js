const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Pending' },
    deliveryTime: { type: String, default: '30-45 mins' },
    estimatedArrival: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
