/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const postUserContact = async (owner, name, email, phone) => {
  const res = await Contacts.findOne({ owner, email });

  if (res) {
    throw RequestError(400, "This email already exists !");
  }
  const contact = new Contacts({
    owner,
    name,
    email,
    phone,
  });

  await contact.save();
  return contact;
};

module.exports = {
  postUserContact,
};
