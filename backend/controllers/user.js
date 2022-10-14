exports.userHome = (req, res) => {
  res.status(200).json({
    message: "this is from user",
    error: "No error",
  });
};
