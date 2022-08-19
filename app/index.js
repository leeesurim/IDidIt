const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('views', './src/views')
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( bodyParser.json() );

const router = require("./src/routes/user");
app.use('/', router);

module.exports = app;