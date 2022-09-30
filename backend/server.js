const express = require("express");

const app = express();
const cors = require("cors");
const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("this is home dir");
});
app.get("/bike", (req, res) => {
  res.send("this is bike dir");
});
app.listen(8000, () => {
  console.log("test server");
});
