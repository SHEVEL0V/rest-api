/** @format */
const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const logout = async (id) => {
  const response = await User.findByIdAndRemove(id);
  if (!response) {
    throw RequestError(401);
  }
  return response;
};

module.exports = { logout };
