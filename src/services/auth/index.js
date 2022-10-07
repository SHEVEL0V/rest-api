/** @format */
const { login } = require("./login");
const { logout } = require("./logout");
const { registration } = require("./registration");
const { verefication } = require("./verefication");
const { vereficationRepit } = require("./vereficationRepit");

module.exports = {
  registration,
  verefication,
  vereficationRepit,
  login,
  logout,
};
