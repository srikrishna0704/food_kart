const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String }
});

const restaurantSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 4.0 },
    cuisine: { type: String },
    category: { type: String },
    image: { type: String },
    deliveryTime: { type: String },
    offer: { type: String },
    menu: [menuItemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
