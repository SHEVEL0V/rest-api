/** @format */

const { ObjectId } = require("mongoose").Types;

const { uploadFile } = require("../services/upload");

const updateAvatars = async (req, res, next) => {
  const userId = ObjectId(req.user._id);
  const { path: tempUpload, filename } = req.file;

  uploadFile(userId, tempUpload, filename)
    .then((avatarURL) =>
      res.status(200).json({
        avatarURL,
      })
    )
    .catch((err) => next(err));
};

module.exports = { updateAvatars };
