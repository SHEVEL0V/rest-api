/** @format */

const express = require("express");
const router = express.Router();

const {
  postContactsValidation,
  putContactsValidation,
} = require("../middlewares/contactsValidation");

const {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  deleteContacts,
} = require("../controllers/contactsControllers");

router.get("/", getContacts);
router.get("/:contactId", getContactsId);
router.post("/", postContactsValidation, addContacts);
router.put("/:contactId", putContactsValidation, changeContacts);
router.delete("/:contactId", deleteContacts);

module.exports = { contactsRouter: router };
