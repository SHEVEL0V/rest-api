/** @format */
const { registration, login, logout } = require("../services/authServices");

const registrationUser = async (req, res) => {
  const { email, password } = req.body;

  registration(email, password)
    .then(() =>
      res.status(409).json({
        user: {
          email: email,
          subscription: "starter",
        },
      })
    )
    .catch(({ message }) => res.status(409).json({ message }));
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  login(email, password)
    .then((token) =>
      res.status(200).json({
        token,
        user: {
          email,
          subscription: "starter",
        },
      })
    )
    .catch(({ message }) => res.status(401).json({ message }));
};

const logoutUser = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  logout(id)
    .then((respons) =>
      res.status(200).json({
        token: respons,
        Authorization: `Bearer ${token}`,
      })
    )
    .catch(({ message }) => res.status(401).json({ message }));
};

module.exports = { registrationUser, loginUser, logoutUser };
