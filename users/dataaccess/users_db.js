var { client } = require("./db_client");
var jwt = require("jsonwebtoken");
var fs = require("fs");

var privateKEY = fs.readFileSync("./private.key", "utf8");
var publicKEY = fs.readFileSync("./public.key", "utf8");

async function add_user(user) {
  await client.query(
    `INSERT INTO users (user_id, username, password, email, phone_number, role) VALUES ('${user.user_id}', '${user.username}', '${user.password}', '${user.email}', '${user.phone_number}', '${user.role}') ON CONFLICT DO NOTHING;`
  );
}

async function get_user_by_id(user_id) {
  const rows = await client.query(
    `SELECT * FROM users WHERE user_id='${user_id}'`
  );
  return rows.rows[0];
}

async function get_user_by_username(username) {
  const rows = await client.query(
    `SELECT * FROM users WHERE username='${username}'`
  );
  return rows.rows[0];
}

function get_token(user) {
  const payload = {
    user_id: user.user_id,
    role: user.role,
    username: user.username,
  };

  return jwt.sign(payload, privateKEY, { algorithm: "RS256" });
}

function verify_token(token) {
  return jwt.verify(token, publicKEY);
}

module.exports = {
  add_user,
  get_user_by_id,
  get_user_by_username,
  get_token,
  verify_token,
};
