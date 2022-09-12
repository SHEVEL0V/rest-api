/** @format */
const { login } = require("./login");
const { logout } = require("./logout");
const { registration } = require("./registration");
const { veretification } = require("./veretification");
const { veretificationRepit } = require("./veretificationRepit");

module.exports = {
  registration,
  veretification,
  veretificationRepit,
  login,
  logout,
};
