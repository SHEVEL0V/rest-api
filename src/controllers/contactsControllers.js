/** @format */
const Contacts = require("../db/contactModel");

const getContacts = async (req, res, next) => {
  const contacts = await Contacts.find();

  res.status(200).json({ code: 200, contacts });
};

const getContactsId = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contacts.findById(contactId);

  !contact
    ? res.status(200).json({ status: "success", code: 200, data: contact })
    : res.status(404).json({ message: "Not found", code: 404 });
};

const addContacts = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = new Contacts({
    name,
    email,
    phone,
  });

  await contact.save();
  res.status(200).json({ code: 200, data: contact });
};

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;

  const respons = await Contacts.findByIdAndDelete(contactId);

  if (respons) {
    res
      .status(200)
      .json({ message: "contact deleted", code: 200, data: respons });
  } else res.status(404).json({ message: "Not found", code: 404 });
};

const changeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const respons = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  if (respons) {
    res
      .status(200)
      .json({ message: "contact updated", code: 200, data: respons });
  } else res.status(400).json({ message: "missing fields", code: 400 });
};

const changeStatusContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const respons = await Contacts.findByIdAndUpdate(contactId, {
    favorite,
  });

  if (respons) {
    res
      .status(200)
      .json({ message: "contact updated", code: 200, data: respons });
  } else res.status(404).json({ message: "missing Not found", code: 404 });
};

module.exports = {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  changeStatusContacts,
  deleteContacts,
};
