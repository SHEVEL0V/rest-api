/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const deleteUserContacts = async (id) => {
  const respons = await Contacts.findByIdAndDelete(id);
  if (!respons) {
    throw RequestError(404);
  }
  return respons;
};

module.exports = {
  deleteUserContacts,
};
