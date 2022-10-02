/** @format */
const fs = require("fs/promises");
const { Storage } = require("@google-cloud/storage");
const { authModel } = require("./auth");

const uploadFile = async (userId, tempUpload, filename) => {
  const bucketName = "bucket-shevelov";
  const storage = new Storage();
  const options = {
    destination: filename,
  };

  await authModel();

  const [File] = await storage.bucket(bucketName).upload(tempUpload, options);

  fs.unlink(tempUpload);

  if (!File) {
    throw new Error("Error upload file");
  }
  return File.metadata;
};

//   try {
//     const avatarsDir = path.join(__dirname, "../../../", "tmp");
//     const resultUpload = path.join(avatarsDir, filename);
//     await fs.rename(tempUpload, resultUpload);
//     const avatarURL = path.join("public", "avatars", filename);

//     const res = await User.findByIdAndUpdate(userId, { avatarURL });
//     if (!res) {
//       throw new Error("Not authorized");
//     }
//     return avatarURL;
//   } catch {
//     fs.unlink(tempUpload);
//     throw new Error("Not authorized");
//   }
// };

module.exports = { uploadFile };