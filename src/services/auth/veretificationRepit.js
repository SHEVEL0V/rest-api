/** @format */
const User = require("../../db/authModel");
const { sentMail } = require("../messege");

const veretificationRepit = async (email) => {
  if (!email) {
    throw new Error("Missing required field email");
  }
  const userM = await User.findOne({ email });
  if (!userM) {
    throw new Error("This email not found");
  }

  const userV = await User.findOne({ email, verify: true });
  if (userV) {
    throw new Error(`Verification has already been passed`);
  }
  const user = await User.findOne({ email, verify: false });
  if (user) {
    await sentMail(email, user.verificationToken);
  }
};

module.exports = { veretificationRepit };
