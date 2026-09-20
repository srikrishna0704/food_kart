const mongoose = require('mongoose');

let isConnected = 0;

const DEFAULT_MONGODB_URI = 'mongodb+srv://srikrishna0704_db_user:dhA9hIA5xv7a7HSY@cluster0.szprour.mongodb.net/foodkart?retryWrites=true&w=majority';

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const dbUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
    const conn = await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });

    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
