const { Client } = require("pg");
var dotenv = require("dotenv");

dotenv.config();

const client = new Client();
module.exports.client = client;

module.exports.init_db = async function () {
  console.log("Connecting to db...");
  await client.connect();
  await client.query(
    "CREATE TABLE IF NOT EXISTS users (user_id varchar primary key, username varchar, password varchar, email text, phone_number text, role varchar);"
  );
  console.log("DB Connected successfully");
};
