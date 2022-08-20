/** @format */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const { authRouter } = require("./routes/authRouter");
const { contactsRouter } = require("./routes/contactsRouter");
const swaggerDocument = require("../contacts-api.json");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
