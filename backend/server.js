const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("this is home dir");
});
app.get("/bike", (req, res) => {
  res.send("this is bike dir");
});
app.listen(8000, () => {
  console.log("test server");
});
