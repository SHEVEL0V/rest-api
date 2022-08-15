/** @format */
const fs = require("fs/promises");
const path = require("path");
const User = require("../db/authModel");

const avatarRename = async (userId, tempUpload, filename) => {
  try {
    const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", filename);

    const res = await User.findByIdAndUpdate(userId, { avatarURL });
    if (!res) {
      throw new Error("Not authorized");
    }
    return avatarURL;
  } catch {
    fs.unlink(tempUpload);
    throw new Error("Not authorized");
  }
};

module.exports = { avatarRename };
