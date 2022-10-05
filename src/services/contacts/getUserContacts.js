/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const getUserContacts = async (
  userId,
  { page = 1, limit = 5, favorite = false }
) => {
  if (!userId) {
    throw RequestError(400, "Not userId");
  }

  const skip = Number(page * limit - limit);

  const contacts = await Contacts.find({ owner: userId })
    .skip(skip)
    .limit(Number(limit))
    .find({ favorite });

  if (!contacts) {
    throw RequestError(400, "Not found data");
  }

  const total = await Contacts.find({ owner: userId })
    .find(JSON.parse(favorite) ? { favorite: favorite } : {})
    .count();

  return { contacts, total };
};

module.exports = {
  getUserContacts,
};
