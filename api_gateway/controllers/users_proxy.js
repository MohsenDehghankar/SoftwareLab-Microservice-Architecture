var jwt = require("jsonwebtoken");
var fs = require("fs");

var publicKEY = fs.readFileSync("./public.key", "utf8");

function check_token(req, res, next) {
  try {
    const token = req.header.authorization.replace("Bearer ", "");
    return jwt.verify(token, publicKEY);
  } catch (e) {
    return null;
  }
}

module.exports = {
  check_token,
};
