/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const changeUserContacts = async (id, data) => {
  const { name, email, phone } = data;
  const response = await Contacts.findByIdAndUpdate(id, {
    $set: { name, email, phone },
  });
  if (!response) {
    throw RequestError(404);
  }
  return response;
};

module.exports = {
  changeUserContacts,
};
