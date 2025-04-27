const mongoose = require("mongoose");
const config = require("./config");

const initializeDatabase = async () => {
  try {
    await mongoose.connect(config.database.uri, config.database.options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if database connection fails
  }
};

module.exports = initializeDatabase;
