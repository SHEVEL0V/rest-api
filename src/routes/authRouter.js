/** @format */

const express = require("express");
const router = express.Router();

const {
  registrationUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControliers");
const { authUserValidation } = require("../middlewares/loginValidation");

router.post("/register", authUserValidation, registrationUser);
router.post("/login", authUserValidation, loginUser);
router.post("/logout/:id", logoutUser);

module.exports = { authRouter: router };
