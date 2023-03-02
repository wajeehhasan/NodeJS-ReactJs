const express = require("express"); //getting the exporess object to further access route object
const router = express.Router();

const { register, activateAccount } = require("../controllers/user.js"); // {methodName} require-> its implementation

router.post("/register", register);

router.post("/activate", activateAccount);

module.exports = router;
