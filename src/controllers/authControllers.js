/** @format */
const {
  registration,
  verefication,
  vereficationRepit,
  login,
  logout,
} = require("../services/auth");

const registrationUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  const response = await registration(email, password, name);
  return res.status(201).json(response);
};

const vereficationUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  await verefication(verificationToken);
  return res.send(
    `<html><body><p>Please go to <a href=${process.env.REDIRECT_CONTACTS_URL}>Link</a></p></body></html>`
  );
};

const vereficationUserRepit = async (req, res, next) => {
  const { email } = req.body;

  const response = await vereficationRepit(email);
  return res.json(response);
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const response = await login(email, password);
  return res.json(response);
};

const logoutUser = async (req, res, next) => {
  const { id } = req.params;
  const token = null;

  await logout(id);
  return res.status(204).json({
    Authorization: `Bearer ${token}`,
    message: "No Content",
  });
};

module.exports = {
  registrationUser,
  vereficationUser,
  vereficationUserRepit,
  loginUser,
  logoutUser,
};
