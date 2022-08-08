/** @format */
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [type, token] = req.headers.authorization?.split(" ");
    // ---------------------------------------------------------

    if (!token) {
      next(new Error("Please , provide a token"));
    }

    try {
      const user = jwt.decode(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch {
      next(res.status(401).json({ message: "Not authorized" }));
    }
  },
};
