/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const User = require("../db/authModel");
const { sentMail } = require("./messegeServises");

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

const veretification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new Error("Not Found");
  }

  user.verificationToken = "null";
  user.verify = true;

  await user.save();
  return { message: "Verification successful", user };
};

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

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new Error(`No user with email: ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error(`password:${password} is wrong  `);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return {
    status: 200,
    token,
    user,
  };
};

const logout = async (id) => {
  const respons = await User.findByIdAndRemove(id);
  if (!respons) {
    throw new Error("Not authorized");
  }
  return respons;
};

module.exports = {
  registration,
  veretification,
  veretificationRepit,
  login,
  logout,
};
