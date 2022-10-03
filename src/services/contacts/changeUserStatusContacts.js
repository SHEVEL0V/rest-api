/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const changeUserStatusContacts = async (id, favorite) => {
  const respons = await Contacts.findByIdAndUpdate(id, {
    favorite,
  });
  if (!respons) {
    throw RequestError(404);
  }
  return respons;
};

module.exports = {
  changeUserStatusContacts,
};
