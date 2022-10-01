/** @format */

const Contacts = require("../../db/contactModel");

const deleteUserContacts = async (id) => {
  const respons = await Contacts.findByIdAndDelete(id);
  if (!respons) {
    throw new Error("Not found");
  }
  return respons;
};

module.exports = {
  deleteUserContacts,
};
