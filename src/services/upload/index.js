/** @format */
const fs = require("fs/promises");
const { authModel } = require("./auth");
const { Storage } = require("@google-cloud/storage");

const uploadFile = async (tempUpload, filename) => {
  const jwt = await authModel();
  const bucketName = "buket-image";
  const storage = new Storage({ authClient: jwt });
  const options = {
    destination: filename,
  };

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
