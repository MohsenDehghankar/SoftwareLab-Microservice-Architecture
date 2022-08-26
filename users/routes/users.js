var express = require("express");
var userController = require("../controllers/users");
var router = express.Router();

// Signup
router.post("/signup", userController.signup);

// Signin
router.post("/signin", userController.signin);

// Get Profile
router.get("/get-profile", userController.get_profile);

module.exports = router;
