/** @format */

const express = require("express");
const router = express.Router();

const {
  postContactsValidation,
  putContactsValidation,
  putContactsStatusValidation,
} = require("../middlewares/contactsValidation");

const {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  changeStatusContacts,
  deleteContacts,
} = require("../controllers/contactsControllers");

router.get("/", getContacts);
router.get("/:contactId", getContactsId);
router.post("/", postContactsValidation, addContacts);
router.put("/:contactId", putContactsValidation, changeContacts);
router.put(
  "/:contactId/favorite",
  putContactsStatusValidation,
  changeStatusContacts
);
router.delete("/:contactId", deleteContacts);

module.exports = { contactsRouter: router };
