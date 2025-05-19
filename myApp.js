require("dotenv").config();

let express = require("express");
let app = express();

console.log("Hello World!");

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  let message;

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = "Hello json".toUpperCase();
  }else{
    message = "Hello json";
  }

  res.json({
    "message": message,
  });
});

module.exports = app;
