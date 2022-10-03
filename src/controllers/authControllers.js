/** @format */
const {
  registration,
  veretification,
  veretificationRepit,
  login,
  logout,
} = require("../services/auth");

const registrationUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  registration(email, password, name)
    .then((respons) => res.status(200).json(respons))
    .catch((err) => next(err));
};

const veretificationUser = (req, res, next) => {
  const { verificationToken } = req.params;
  veretification(verificationToken)
    .then(() => {
      res
        .status(200)
        .send(
          `<html><body><p>Please go to <a href=${process.env.REDIRECT_CONTACTS_URL}>Link</a></p></body></html>`
        );
    })
    .catch((err) => next(err));
};

const veretificationUserRepit = (req, res, next) => {
  const { email } = req.body;

  veretificationRepit(email)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => next(err));
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  login(email, password)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => next(err));
};

const logoutUser = (req, res, next) => {
  const { id } = req.params;
  const token = null;

  logout(id)
    .then(() =>
      res.status(204).json({
        Authorization: `Bearer ${token}`,
        message: "No Content",
      })
    )
    .catch((err) => next(err));
};

module.exports = {
  registrationUser,
  veretificationUser,
  veretificationUserRepit,
  loginUser,
  logoutUser,
};
