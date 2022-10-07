/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const changeUserStatusContacts = async (id, favorite) => {
  const response = await Contacts.findByIdAndUpdate(id, {
    favorite,
  });
  if (!response) {
    throw RequestError(404);
  }
  return response;
};

module.exports = {
  changeUserStatusContacts,
};
