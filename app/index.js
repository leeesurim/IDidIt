const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config()

app.set('views', './src/views/ejs')
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( bodyParser.json() );

const router = require("./src/routes/user");
app.use('/', router);

module.exports = app;