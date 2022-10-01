/** @format */

const Contacts = require("../../db/contactModel");

const changeUserContacts = async (id, data) => {
  const { name, email, phone } = data;
  const respons = await Contacts.findByIdAndUpdate(id, {
    $set: { name, email, phone },
  });
  if (!respons) {
    throw new Error("Not found");
  }
  return respons;
};

module.exports = {
  changeUserContacts,
};
