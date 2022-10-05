/** @format */

const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const updateUserProfile = async (id, avatarURL) => {
  const respons = await User.findByIdAndUpdate(id, {
    $set: { avatarURL },
  });

  if (!respons) {
    throw RequestError(404);
  }
  return respons;
};

module.exports = {
  updateUserProfile,
};
