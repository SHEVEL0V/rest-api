/** @format */
const contacs = require("../models/contacts.js");

const getContacts = async (req, res, next) => {
  const data = await contacs.listContacts();

  res.json({
    status: "success",
    code: 200,
    data: data,
  });
};

const getContactsId = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacs.getContactById(contactId);
  data.length !== 0
    ? res.json({ status: "success", code: 200, data: data })
    : res.json({ message: "Not found", code: 404 });
};

const addContacts = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const id = new Date();

  const contact = { id, name, email, phone };

  contacs.addContact(contact);
  res.json({ code: 200, data: contact });
};

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacs.getContactById(contactId);

  if (data.length !== 0) {
    await contacs.removeContact(contactId);
    res.json({ message: "contact deleted", code: 200 });
  } else res.json({ message: "Not found", code: 404 });
};

const changeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  if (body) {
    const result = await contacs.updateContact(contactId, body);
    res.json(result);
  } else res.json({ message: "missing fields", code: 400 });
};

module.exports = {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  deleteContacts,
};
