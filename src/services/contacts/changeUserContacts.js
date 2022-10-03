/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const changeUserContacts = async (id, data) => {
  const { name, email, phone } = data;
  const respons = await Contacts.findByIdAndUpdate(id, {
    $set: { name, email, phone },
  });
  if (!respons) {
    throw RequestError(404);
  }
  return respons;
};

module.exports = {
  changeUserContacts,
};
