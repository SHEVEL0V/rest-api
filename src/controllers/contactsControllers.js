/** @format */
const {
  getUserContacts,
  getUserContactsById,
  postUserContact,
  deleteUserContacts,
  changeUserContacts,
  changeUserStatusContacts,
} = require("../services/contacts");

const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const params = req.query;

  getUserContacts(userId, params)
    .then(({ contacts, total }) =>
      res.status(200).json({ code: 200, total, contacts })
    )
    .catch((err) => next(err));
};

const getContactsId = async (req, res, next) => {
  const { contactId } = req.params;

  getUserContactsById(contactId)
    .then((contact) =>
      res.status(200).json({ status: "success", code: 200, contact })
    )
    .catch((err) => next(err));
};

const addContacts = async (req, res, next) => {
  const owner = req.user._id;
  const { name, email, phone } = req.body;

  postUserContact(owner, name, email, phone)
    .then((contact) => res.status(200).json({ code: 200, data: contact }))
    .catch((err) => next(err));
};

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;
  deleteUserContacts(contactId)
    .then((contacts) =>
      res.status(200).json({ message: "contact deleted", code: 200, contacts })
    )
    .catch((err) => next(err));
};

const changeContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const data = req.body;

  changeUserContacts(contactId, data)
    .then((respons) =>
      res
        .status(200)
        .json({ message: "contact updated", code: 200, data: respons })
    )
    .catch((err) => next(err));
};

const changeStatusContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  changeUserStatusContacts(contactId, favorite)
    .then((respons) =>
      res.status(200).json({ message: "contact updated", code: 200, respons })
    )
    .catch((err) => next(err));
};

module.exports = {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  changeStatusContacts,
  deleteContacts,
};
