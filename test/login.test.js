/** @format */
require("dotenv").config();
const connectMongoDB = require("../src/db/connection");
const { login } = require("../src/services/auth");

const email = "max@mail.com";
const password = "12345678";

test("fn login response token ", async () => {
  await connectMongoDB();
  expect(login(email, password)).resolves.toHaveProperty("token");
});

test("fn login response property 'status:200' ", () => {
  login(email, password).then((res) => expect(res.status).toBe(200));
});

test("fn login response property email,subscription ", () => {
  login(email, password).then((res) =>
    expect(res.user).toEqual({
      name: expect.any(String),
      avatarURL: expect.any(String),
      email: expect.any(String),
      subscription: expect.any(String),
    })
  );
});
