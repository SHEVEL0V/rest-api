/** @format */

const User = require("../../db/authModel");
const RequestError = require("../../helpers/requestError");

const updateUserProfile = async (id, avatarURL) => {
  const response = await User.findByIdAndUpdate(id, {
    $set: { avatarURL },
  });

  if (!response) {
    throw RequestError(404);
  }
  return response;
};

module.exports = {
  updateUserProfile,
};
