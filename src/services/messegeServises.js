/** @format */

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Url = "http://localhost:3030/api/users/verify/";

const sentMail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "lybada@meta.ua",
    subject: "Verification Email to Contacts-Book",
    text: "Verification Email to Contacts-Book",
    html: `<h3>Follow this <a href='${Url}${verificationToken}'>link</a> to confirm login</h3>`,
  };

  return sgMail
    .send(msg)
    .then(() => {
      return { message: `Verification message sent to Email:${email}` };
    })
    .catch(() => {
      throw new Error("Error send messege verification");
    });
};
module.exports = { sentMail };
