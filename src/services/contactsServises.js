/** @format */

const Contacts = require("../db/contactModel");

const getUserContacts = async (userId, { page = 1, limit = 5, favorite }) => {
  if (!userId) {
    throw new Error("Not userId");
  }
  const skip = Number(page * limit - limit);

  const contact = await Contacts.find({ owner: userId })
    .skip(skip)
    .limit(Number(limit))
    .find(favorite ? { favorite: favorite } : {});

  if (!contact) {
    throw new Error("Not found data");
  }

  return contact;
};

const getUserContactsById = async (id) => {
  const contact = await Contacts.findById(id);

  if (!contact) {
    throw new Error("Not found");
  }
  return contact;
};

const postUserContact = async (owner, name, email, phone) => {
  const contact = new Contacts({
    owner,
    name,
    email,
    phone,
  });

  await contact.save();
  return contact;
};

const deleteUserContacts = async (id) => {
  const respons = await Contacts.findByIdAndDelete(id);
  if (!respons) {
    throw new Error("Not found");
  }
  return respons;
};

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
  getUserContacts,
  postUserContact,
  getUserContactsById,
  deleteUserContacts,
  changeUserContacts,
  changeUserStatusContacts,
};
