/** @format */
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const User = require("../../db/authModel");
const { sentMail } = require("../messege");

const registration = async (email, password, name) => {
  if (await User.findOne({ email })) {
    throw new Error("This email in use");
  }
  const user = new User({
    name,
    email,
    verificationToken: uuidv4(),
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email),
  });

  await user.save();
  return await sentMail(email, user.verificationToken);
};

module.exports = { registration };
