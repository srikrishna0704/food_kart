const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodkart';
    const conn = await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 3000 });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection warning:", error.message);
    console.log("Backend server will continue running. Set MONGODB_URI in backend/.env to connect your database.");
  }
};

module.exports = connectDB;
