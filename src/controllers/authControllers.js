/** @format */
const {
  registration,
  veretification,
  veretificationRepit,
  login,
  logout,
} = require("../services/authServices");

const registrationUser = async (req, res) => {
  const { email, password, name } = req.body;

  registration(email, password, name)
    .then((respons) => res.status(200).json(respons))
    .catch(({ message }) =>
      res
        .status(409)

        .json({ message })
    );
};

const veretificationUser = (req, res) => {
  const { verificationToken } = req.params;
  veretification(verificationToken)
    .then(() => {
      res
        .status(200)
        .send(
          `<html><body><p>Please go to <a href=${process.env.REDIRECT_CONTACTS_URL}>Link</a></p></body></html>`
        );
    })
    .catch(({ message }) => res.status(404).json({ message }));
};

const veretificationUserRepit = (req, res) => {
  const { email } = req.body;

  veretificationRepit(email)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(({ message }) => res.status(400).json({ message }));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(({ message }) => res.status(401).json({ message }));
};

const logoutUser = (req, res) => {
  const { id } = req.params;
  const token = null;

  logout(id)
    .then(() =>
      res.status(204).json({
        Authorization: `Bearer ${token}`,
        message: "No Content",
      })
    )
    .catch(({ message }) => res.status(401).json({ message }));
};

module.exports = {
  registrationUser,
  veretificationUser,
  veretificationUserRepit,
  loginUser,
  logoutUser,
};
