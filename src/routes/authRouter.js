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
  vereficationUser,
  vereficationUserRepit,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");
const { updateAvatars } = require("../controllers/avatarController");
const cntrWrapper = require("../helpers/cntrWrapper");

router.post("/register", authUserValidation, cntrWrapper(registrationUser));
router.get("/verify/:verificationToken", cntrWrapper(vereficationUser));
router.post("/verify", cntrWrapper(vereficationUserRepit));
router.post("/login", cntrWrapper(loginUserValidation), cntrWrapper(loginUser));
router.post("/logout/:id", auth, cntrWrapper(logoutUser));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  cntrWrapper(updateAvatars)
);

module.exports = { authRouter: router };
