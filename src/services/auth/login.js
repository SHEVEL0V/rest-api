/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return {
    status: 200,
    token,
    user,
  };
};

module.exports = { login };
