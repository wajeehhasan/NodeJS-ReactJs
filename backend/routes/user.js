const express = require("express"); //getting the exporess object to further access route object
const router = express.Router();

const { register, test } = require("../controllers/user.js"); // {methodName} require-> its implementation

router.post("/register", register);

router.get("/test", test);

module.exports = router;
