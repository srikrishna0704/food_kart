const Address = require('../models/Address');

exports.addAddress = async (req, res) => {
    try {
        const { userId, fullName, address, city, pincode, state, phone } = req.body;
        const newAddress = new Address({
            userId,
            fullName,
            address,
            city,
            pincode,
            state,
            phone
        });
        await newAddress.save();
        res.status(201).json({ message: 'Address saved successfully', address: newAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await Address.find({ userId });
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
