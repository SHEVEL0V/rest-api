/** @format */
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Please , provide Header: 'Authorization' ");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Please , provide a token");
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch {
      next(res.status(401).json({ message: "Not authorized" }));
    }
  },
};
