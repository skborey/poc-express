var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  "/api/v1/files",
  function (req, res, next) {
    console.log("------> header: ", req.headers);
    if (req.cookies.token === "123") {
      return next();
    }
    // if (req.headers.authorization === "123") {
    //   return next();
    // }

    return res.status(401).end();
  },
  express.static(path.join(__dirname, "public/files"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
