/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../db/authModel");

const registration = async (email, password) => {
  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email),
  });

  if (await User.findOne({ email })) {
    throw new Error("Email in use");
  }
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`No user with email: ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error(`password:${password} is wrong  `);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return [token, user];
};

const logout = async (id) => {
  const respons = await User.findByIdAndRemove(id);
  if (!respons) {
    throw new Error("Not authorized");
  }
  return respons;
};

module.exports = { registration, login, logout };
