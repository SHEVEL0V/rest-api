/** @format */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const { authRouter } = require("./routes/authRouter");
const { contactsRouter } = require("./routes/contactsRouter");
const swaggerDocument = require("../contacts-api.json");

const app = express();

const formatsLogger =
  app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/views/helo.html"))
);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
