/** @format */

const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connection successful");
};
module.exports = connectMongoDB;
