/** @format */

const { ObjectId } = require("mongoose").Types;

const { avatarRename } = require("../services/avatar");

const updateAvatars = async (req, res) => {
  const userId = ObjectId(req.user._id);
  const { path: tempUpload, filename } = req.file;

  avatarRename(userId, tempUpload, filename)
    .then((avatarURL) =>
      res.status(200).json({
        avatarURL,
      })
    )
    .catch(({ message }) => res.status(401).json({ message }));
};

module.exports = { updateAvatars };
