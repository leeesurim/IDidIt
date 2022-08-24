const express = require("express");
const app = module.exports = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const logger = require('morgan');


dotenv.config();


app.set('views', './src/views/ejs')
app.set("view engine", "ejs");



app.use(express.urlencoded({extended: true}));
// app.use(express.json());
app.use( bodyParser.json() );
app.use(logger("dev"));

const routerUser = require("./src/routes/user");
const routerMemo = require("./src/routes/memo");
const { sequelize } = require("./src/model");

app.use('/', routerUser);
app.use('/memo', routerMemo);
  


