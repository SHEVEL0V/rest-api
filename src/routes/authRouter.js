/** @format */

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  authUserValidation,
  loginUserValidation,
} = require("../middlewares/loginValidation");
const { auth } = require("../middlewares/authorization");

const {
  registrationUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const { updateAvatars } = require("../controllers/avatarController");

router.post("/register", authUserValidation, registrationUser);
router.post("/login", loginUserValidation, loginUser);
router.post("/logout/:id", auth, logoutUser);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatars);

module.exports = { authRouter: router };
