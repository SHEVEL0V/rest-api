/** @format */

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(".contacts.json");

const listContacts = async () => {
  return await fs
    .readFile(contactsPath)
    .then((data) => data)
    .catch((err) => err.message);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
