const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
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
};
