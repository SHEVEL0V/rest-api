/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const getUserContacts = async (
  userId,
  { limit = 5, page = 1, favorite = "false" }
) => {
  if (!userId) {
    throw RequestError(400, "Not userId");
  }

  const skip = Number((page - 1) * limit);

  const contacts = await Contacts.find({ owner: userId })
    .skip(skip)
    .limit(Number(limit))
    .find(favorite === "false" ? {} : { favorite });

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
