const mongoose = require("mongoose");

const connectDB = async () => {
  const connectString = process.env.MONGO_URI || "mongodb://localhost/products";

  try {
    const conn = await mongoose.connect(connectString);
    console.log(`MongoDB connected. Connected to database: ${connectString}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
