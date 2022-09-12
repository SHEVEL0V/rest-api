/** @format */

const { changeUserContacts } = require("./changeUserContacts");
const { changeUserStatusContacts } = require("./changeUserStatusContacts");
const { deleteUserContacts } = require("./deleteUserContacts");
const { getUserContacts } = require("./getUserContacts");
const { getUserContactsById } = require("./getUserContactsById");
const { postUserContact } = require("./postUserContact");

module.exports = {
  getUserContacts,
  postUserContact,
  getUserContactsById,
  deleteUserContacts,
  changeUserContacts,
  changeUserStatusContacts,
};
