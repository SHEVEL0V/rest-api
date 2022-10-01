/** @format */
const User = require("../../db/authModel");

const veretification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new Error("Not Found");
  }
  user.verify = true;

  await user.save();
  return { message: "Verification successful", user };
};

module.exports = { veretification };
