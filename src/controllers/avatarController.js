/** @format */

const { ObjectId } = require("mongoose").Types;

const { uploadFile } = require("../services/upload");

const updateAvatars = async (req, res) => {
  const userId = ObjectId(req.user._id);
  const { path: tempUpload, filename } = req.file;

  uploadFile(userId, tempUpload, filename)
    .then((avatarURL) =>
      res.status(200).json({
        avatarURL,
      })
    )
    .catch(({ message }) => res.status(401).json({ message }));
};

module.exports = { updateAvatars };
