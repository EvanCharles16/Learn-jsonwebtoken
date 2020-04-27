var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const privateKey = "privasi";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/UsersRouter");
const HeroesRouter = require("./routes/HeroesRouter");
const CountryRouter = require("./routes/CountryRouter");

var app = express();
mongodConnect = process.env.DB_LOCAL;
mongoose.connect(mongodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/heroes", HeroesRouter);
app.use("/country", validateUser, CountryRouter);

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], privateKey, (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}

module.exports = app;
