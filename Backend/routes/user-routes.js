const express = require("express");
const { login } = require("../controllers/login-controller");
const { register } = require("../controllers/register-controller");
const { users } = require("../controllers/users-controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", users);


module.exports = router;