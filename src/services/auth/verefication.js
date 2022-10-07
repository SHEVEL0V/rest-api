/** @format */
const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const verefication = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404);
  }
  user.verify = true;

  await user.save();
  return { message: "Verification successful", user };
};

module.exports = { verefication };
