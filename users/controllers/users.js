var users = require("../dataaccess/users_db");
var { v4 } = require("uuid");

async function signup(req, res, next) {
  try {
    const { username, password, password_repeat, email, phone_number } =
      req.body;

    if (password !== password_repeat) {
      throw "Passwords do not match";
    }

    var user = {
      username,
      password,
      email,
      phone_number,
      user_id: v4(),
      role: "customer",
    };

    const result = await users.get_user_by_username(user.username);
    console.log(result);
    if (result) {
      throw "User with this username exists";
    }

    await users.add_user(user);
    res.status(200).send({
      success: true,
      access_token: users.get_token(user),
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      success: false,
      message: e,
    });
  }
}

async function signin(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await users.get_user_by_username(username);
    if (!user || user.password != password) {
      throw "Invalid username or password";
    }
    res.status(200).send({
      success: true,
      access_token: users.get_token(user),
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      success: false,
      message: e,
    });
  }
}

async function get_profile(req, res, next) {}

module.exports = {
  signin,
  signup,
  get_profile,
};
