/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const getUserContactsById = async (id) => {
  const contact = await Contacts.findById(id, "-createdAt -updatedAt");

  if (!contact) {
    throw RequestError(404);
  }
  return contact;
};

module.exports = {
  getUserContactsById,
};
