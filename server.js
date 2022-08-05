/** @format */

const conectMongo = require("./src/db/connection");

const app = require("./src/app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
  conectMongo().catch((err) => {
    console.log(err);
    return process.exit(1);
  });
});
