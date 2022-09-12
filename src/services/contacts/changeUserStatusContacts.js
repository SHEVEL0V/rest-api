/** @format */

const Contacts = require("../../db/contactModel");

const changeUserStatusContacts = async (id, favorite) => {
  const respons = await Contacts.findByIdAndUpdate(id, {
    favorite,
  });
  if (!respons) {
    throw new Error("Not found");
  }
  return respons;
};

module.exports = {
  changeUserStatusContacts,
};
