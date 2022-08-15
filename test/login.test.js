/** @format */
require("dotenv").config();

const conectMongo = require("../src/db/connection");
const { login } = require("../src/services/authServices");

test("login response status 200", async () => {
  await conectMongo();

  const email = "den@mail.com";
  const password = "12345678";

  await login(email, password).then((res) =>
    expect(res.user).toEqual({
      email: email,
      subscription: "starter",
    })
  );
});
