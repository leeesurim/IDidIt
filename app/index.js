const express = require("express");
const app = (module.exports = express());
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const logger = require("morgan");
const path = require("path");

dotenv.config();

app.set("views", "./src/views/ejs");
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "static")));
// app.set("static", path.join(__dirname, "static"));
app.use(express.static("./src/static"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(logger("dev"));

const routerUser = require("./src/routes/user");
const routerMemo = require("./src/routes/memo");
const routerCalendar = require("./src/routes/calendar");
const routerAccountbook = require("./src/routes/accountbook");
const { sequelize } = require("./src/model");

app.use("/", routerUser);
app.use("/memo", routerMemo);
app.use("/calendar", routerCalendar);
app.use("/accountbook", routerAccountbook);
