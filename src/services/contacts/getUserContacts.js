/** @format */

const Contacts = require("../../db/contactModel");
const RequestError = require("../../helpers/requestError");

const getUserContacts = async (userId, { limit = 5, page = 1, favorite }) => {
  if (!userId) {
    throw RequestError(400, "Not userId");
  }

  const skip = Number((page - 1) * limit);
  const query = favorite ? { favorite } : null;

  const contacts = await Contacts.find(
    { owner: userId, ...query },
    "-createdAt -updatedAt",
    { skip, limit }
  );

  if (!contacts) {
    throw RequestError(400, "Not found data");
  }
  const total = await Contacts.find({ owner: userId, ...query }).count();

  return { contacts, total };
};

module.exports = {
  getUserContacts,
};
