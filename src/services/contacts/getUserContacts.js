/** @format */

const Contacts = require("../../db/contactModel");

const getUserContacts = async (userId, { page = 1, limit = 5, favorite }) => {
  if (!userId) {
    throw new Error("Not userId");
  }

  const skip = Number(page * limit - limit);

  const contacts = await Contacts.find({ owner: userId })
    .skip(skip)
    .limit(Number(limit))
    .find(JSON.parse(favorite) ? { favorite } : {});

  if (!contacts) {
    throw new Error("Not found data");
  }

  const total = await Contacts.find({ owner: userId })
    .find(JSON.parse(favorite) ? { favorite: favorite } : {})
    .count();

  return { contacts, total };
};

module.exports = {
  getUserContacts,
};
