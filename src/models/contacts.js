/** @format */

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./src/models/contacts.json");

const listContacts = async () => {
  return await fs
    .readFile(contactsPath, "utf8")
    .then((data) => data)
    .catch((err) => err.message);
};

const getContactById = async (contactId) => {
  return await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      const contactsArey = JSON.parse(data);
      return contactsArey.filter((el) => el.id === contactId.toString());
    })
    .catch((err) => err.message);
};

const removeContact = async (contactId) => {
  try {
    const contacsArey = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    const newContacts = JSON.stringify(
      contacsArey.filter((el) => el.id !== contactId.toString())
    );

    await fs.writeFile(contactsPath, newContacts);
  } catch (err) {
    return err.message;
  }
};

const addContact = async (body) => {
  try {
    const contactsArey = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    const newContacts = JSON.stringify([...contactsArey, body]);

    await fs.writeFile(contactsPath, newContacts);
  } catch (err) {
    return err.message;
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const contactsArey = await fs
      .readFile(contactsPath, "utf8")
      .then((data) => JSON.parse(data));

    const index = contactsArey.findIndex((el) => el.id === contactId);

    if (index >= 0) {
      if (name) {
        contactsArey[index].name = name;
      }
      if (email) {
        contactsArey[index].email = email;
      }
      if (phone) {
        contactsArey[index].phone = phone;
      }
      await fs.writeFile(contactsPath, JSON.stringify(contactsArey));

      return { code: 200, data: contactsArey };
    } else return { message: "missing fields", code: 400 };
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
