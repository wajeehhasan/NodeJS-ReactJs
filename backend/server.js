const express = require("express");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");

//calling environment file start
dotenv.config();
// npm run fbclone will run nodejs server with nodemon tracking changes
//calling environment file end
//cors setting start
const cors = require("cors");
let allowed = ["http://localhost:3000", "otherlink"];
function options(req, res) {
  let tmp;
  let origin = req.header("Origin");
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    };
  } else {
    tmp = {
      origin: "Nonexistant",
    };
  }
  res(null, tmp);
}
// const useRoutes = require("./routes/user");
// app.use("/", useRoutes);
app.use(express.json());
app.use(cors(options));
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r))); //here route folder is being registered as a controller

//json response parser
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

//database
mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to Mongodb : ", err));
//cors settings end

app.get("/", (req, res) => {
  res.send("this is home dir");
});

app.get("/bike", (req, res) => {
  res.send("this is bike dir");
});

app.post("/poster", (req, res) => {
  console.log(req.body);
});

//const PORT = process.env.PORT || 8000; //GETTING variables from evn if it exits and if not it will be 8000

app.listen(process.env.PORT || 8000, () => {
  console.log(`SERVER IS RUNNING ON PORT : ${process.env.PORT}`);
});
