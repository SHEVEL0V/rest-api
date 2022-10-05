/** @format */
const {
  getUserContacts,
  getUserContactsById,
  postUserContact,
  deleteUserContacts,
  changeUserContacts,
  changeUserStatusContacts,
} = require("../services/contacts");

const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const params = req.query;

  const { contacts, total } = await getUserContacts(userId, params);
  return res.json({ total, contacts });
};

const getContactsId = async (req, res, next) => {
  const { contactId } = req.params;

  const response = await getUserContactsById(contactId);
  return res.status(200).json({ contact: response });
};

const addContacts = async (req, res, next) => {
  const owner = req.user._id;
  const { name, email, phone } = req.body;

  const response = await postUserContact(owner, name, email, phone);
  return res.json({ data: response });
};

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;

  const response = await deleteUserContacts(contactId);
  return res.json({ message: "contact deleted", contacts: response });
};

const changeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const data = req.body;

  const response = await changeUserContacts(contactId, data);
  return res.json({ message: "contact updated", data: response });
};

const changeStatusContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const response = await changeUserStatusContacts(contactId, favorite);
  return res.status(200).json({ message: "contact updated", response });
};

module.exports = {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  changeStatusContacts,
  deleteContacts,
};
