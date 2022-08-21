/** @format */
const {
  getUserContacts,
  getUserContactsById,
  postUserContact,
  deleteUserContacts,
  changeUserContacts,
  changeUserStatusContacts,
} = require("../services/contactsServises");

const getContacts = async (req, res, next) => {
  const userId = req.user._id;
  const params = req.query;

  getUserContacts(userId, params)
    .then(({ contacts, total }) =>
      res.status(200).json({ code: 200, total, contacts })
    )
    .catch(({ message }) => res.status(401).json({ code: 401, message }));
};

const getContactsId = async (req, res, next) => {
  const { contactId } = req.params;

  getUserContactsById(contactId)
    .then((contact) =>
      res.status(200).json({ status: "success", code: 200, contact })
    )
    .catch(({ message }) => res.status(404).json({ code: 404, message }));
};

const addContacts = async (req, res, next) => {
  const owner = req.user._id;
  const { name, email, phone } = req.body;

  postUserContact(owner, name, email, phone).then((contact) =>
    res
      .status(200)
      .json({ code: 200, data: contact })
      .catch(({ message }) => res.status(409).json({ message }))
  );
};

const deleteContacts = async (req, res, next) => {
  const { contactId } = req.params;
  deleteUserContacts(contactId)
    .then((contacts) =>
      res.status(200).json({ message: "contact deleted", code: 200, contacts })
    )
    .catch(({ message }) => res.status(404).json({ message }));
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
    .catch(({ message }) => res.status(400).json({ message }));
};

const changeStatusContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  changeUserStatusContacts(contactId, favorite)
    .then((respons) =>
      res.status(200).json({ message: "contact updated", code: 200, respons })
    )
    .catch(({ message }) => res.status(400).json({ message, code: 400 }));
};

module.exports = {
  getContacts,
  getContactsId,
  addContacts,
  changeContacts,
  changeStatusContacts,
  deleteContacts,
};
