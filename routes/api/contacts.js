/** @format */

const express = require("express");
const router = express.Router();

const contacs = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const data = await contacs.listContacts();
  console.log("!!!", data);
  res.json({
    status: "success",
    code: 200,
    data: "()_()",
  });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
