const jwt = require("jsonwebtoken");

const generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: expired,
  });
};

module.exports = {
  generateToken,
};
