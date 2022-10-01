/** @format */

const mongoose = require("mongoose");

const conectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connection successful");
};
module.exports = conectMongo;
