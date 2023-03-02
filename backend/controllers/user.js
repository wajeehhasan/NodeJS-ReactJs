const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../helpers/mailer");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const register = async (req, res) => {
  // console.log(req.body);
  const UserResp = ({
    first_name,
    last_name,
    email,
    password,
    username,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body);
  try {
    // const email = req.body.email;
    // const first_name = req.body.first_name;
    // const last_name = req.body.last_name;
    // const password = req.body.password;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const EmailDbCheck = await User.findOne({ email });
    if (EmailDbCheck) {
      return res.status(400).json({
        message: "Account with this email already exits",
      });
    }
    if (!validateLength(first_name, 2, 16)) {
      return res.status(400).json({
        message:
          "First Name should be greater than 2 and less than 16 characters",
      });
    }
    if (!validateLength(last_name, 2, 16)) {
      return res.status(400).json({
        message:
          "Last Name should be greater than 2 and less than 16 characters",
      });
    }
    if (!validateLength(password, 5, 20)) {
      return res.status(400).json({
        message:
          "Password should be greater than 5 and less than 20 characters",
      });
    }
    let username = first_name + last_name;
    let EncryptedPassword = await bcrypt.hash(password, 12);
    let validatedUsername = await validateUsername(username);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: EncryptedPassword,
      username: validatedUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const activation_url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, activation_url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    console.log(emailVerificationToken);
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "User Registered! Check your email to activate your account!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const decryptedUserdetails = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decryptedUserdetails.id);
    if (user.verified == true) {
      return res.status(400).json({
        message: "This email is already Activated",
      });
    } else {
      await User.findByIdAndUpdate(decryptedUserdetails.id, {
        verified: true,
      });
      return res.status(200).json({
        message: "Account activation complete!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email : " + email + " password : " + password);
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message:
          "The email address you entered is not connected to an account.",
      });
    }
    const passCheck = await bcrypt.compare(password, user.password);
    console.log(passCheck);
    if (!passCheck) {
      res.status(400).json({
        message: "Invalid credentials. Please Try again.",
      });
    }
    if (passCheck & (user != null)) {
      return res.status(200).json({
        message: "login Successfull!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  register,
  activateAccount,
  login,
};
