const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, address, status, deliveryTime, estimatedArrival } = req.body;
        const newOrder = new Order({
            userId,
            items,
            totalPrice,
            address,
            status: status || 'Confirmed',
            deliveryTime: deliveryTime || '30 - 40 mins',
            estimatedArrival: estimatedArrival || '35 mins'
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder, orderId: newOrder._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
