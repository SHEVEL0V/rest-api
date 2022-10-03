/** @format */
const User = require("../../db/authModel");
const { sentMail } = require("../messege");
const RequestError = require("../../helpers/requestError");

const veretificationRepit = async (email) => {
  if (!email) {
    throw RequestError(400, "Missing required field email");
  }
  const userM = await User.findOne({ email });
  if (!userM) {
    throw RequestError(400, "This email not found");
  }

  const userV = await User.findOne({ email, verify: true });
  if (userV) {
    throw RequestError(400, "Verification has already been passed");
  }
  const user = await User.findOne({ email, verify: false });
  if (user) {
    await sentMail(email, user.verificationToken);
  }
};

module.exports = { veretificationRepit };
