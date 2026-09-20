const mongoose = require('mongoose');

let isConnected = 0;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodkart';
    const conn = await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });

    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection warning:", error.message);
  }
};

module.exports = connectDB;
