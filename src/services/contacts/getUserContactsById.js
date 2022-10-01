/** @format */

const Contacts = require("../../db/contactModel");

const getUserContactsById = async (id) => {
  const contact = await Contacts.findById(id);

  if (!contact) {
    throw new Error("Not found");
  }
  return contact;
};

module.exports = {
  getUserContactsById,
};
