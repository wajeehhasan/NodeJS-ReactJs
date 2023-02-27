const User = require("../models/User");

const register = async (req, res) => {
  // console.log(req.body);
  // const UserResp = ({
  //   first_name,
  //   last_name,
  //   email,
  //   password,
  //   username,
  //   bYear,
  //   bMonth,
  //   bDay,
  //   gender,
  // } = req.body);
  try {
    const user = await new User(req.body).save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const test = (req, res) => {
  res.send("test abstraction");
};
module.exports = {
  register,
  test,
};
