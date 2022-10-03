/** @format */
const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const logout = async (id) => {
  const respons = await User.findByIdAndRemove(id);
  if (!respons) {
    throw RequestError(401);
  }
  return respons;
};

module.exports = { logout };
