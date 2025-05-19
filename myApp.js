require("dotenv").config();
const bodyParser = require("body-parser")

let express = require("express");
let app = express();

console.log("Hello World!");

app.use(bodyParser.urlencoded({ extended: false }));

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
  } else {
    message = "Hello json";
  }

  res.json({
    message: message,
  });
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
});
app.get("/now", (req, res) => {
  res.json({
    time: req.time,
  });
});

app.get("/:word/echo", (req, res) =>
  res.json({
    echo: req.params.word,
  })
);

app.route("/name").get( (req, res) => {
  const first = req.query.first;
  const last = req.query.last;
  res.json({
    name: `${first} ${last}`,
  });
})

module.exports = app;
