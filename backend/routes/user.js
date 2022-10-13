const express = require("express");
const { userHome } = require("../controllers/user");

const router = express.Router();

router.get("/user", userHome);

module.exports = router;
