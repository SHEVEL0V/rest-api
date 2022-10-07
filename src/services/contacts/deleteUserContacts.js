/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const deleteUserContacts = async (id) => {
  const response = await Contacts.findByIdAndRemove(id);
  if (!response) {
    throw RequestError(404);
  }
  return response;
};

module.exports = {
  deleteUserContacts,
};
