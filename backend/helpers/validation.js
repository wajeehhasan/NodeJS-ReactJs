const User = require("../models/User");
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};
const validateUsername = async (username) => {
  const userfromDb = await User.findOne({ username });
  if (userfromDb) {
    username += (+new Date() * Math.random()).toString().substring(0, 1);
    validateUsername(username);
  }
  return username;
};
//regex .match(/^$/);
//example email -> wajeeh.hasan322@gmail.com

//([a-z\d\.-]+)->wajeeh.hasan322   @([a-z\d-]+)->gmail    \.([a-z]{2,12})->.com    (\.[a-z]{2,12})? -> "?" means its optional for emails ending in ".au" or ".uk" etc
//a-z allowed all characters
//\d 0-9 digits
// \. escape sequence for "."
// - allowed "-"
// a-z {2,12} allowing to add character raning from length 2 till 12
//a-z {2,12}? allowing to add character raning from length 2 till 12 but its optional

module.exports = {
  validateEmail,
  validateLength,
  validateUsername,
};
