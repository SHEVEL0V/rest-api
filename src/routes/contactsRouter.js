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
const cntrWrapper = require("../helpers/cntrWrapper");
const { auth } = require("../middlewares/authorization");

router.use(auth);

router.get("/", cntrWrapper(getContacts));
router.get("/:contactId", cntrWrapper(getContactsId));
router.post("/", postContactsValidation, cntrWrapper(addContacts));
router.put("/:contactId", putContactsValidation, cntrWrapper(changeContacts));
router.put(
  "/:contactId/favorite",
  putContactsStatusValidation,
  cntrWrapper(changeStatusContacts)
);
router.delete("/:contactId", cntrWrapper(deleteContacts));

module.exports = { contactsRouter: router };
