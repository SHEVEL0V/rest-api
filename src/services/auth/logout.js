/** @format */
const User = require("../../db/authModel");

const logout = async (id) => {
  const respons = await User.findByIdAndRemove(id);
  if (!respons) {
    throw new Error("Not authorized");
  }
  return respons;
};

module.exports = { logout };
