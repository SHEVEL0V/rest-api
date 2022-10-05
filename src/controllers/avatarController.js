/** @format */
const RequestError = require("../helpers/requestError");
const { updateUserProfile } = require("../services/auth/update");
const { ObjectId } = require("mongoose").Types;
const { uploadFile } = require("../services/upload");

const updateAvatars = async (req, res, next) => {
  const userId = ObjectId(req.user._id);
  if (!req.file) {
    throw RequestError(404);
  }

  const { path: tempUpload, filename } = req.file;
  const { mediaLink } = await uploadFile(tempUpload, filename);
  const { name, email } = await updateUserProfile(userId, mediaLink);
  return res.json({ name, email, avatarURL: mediaLink });
};

module.exports = { updateAvatars };
