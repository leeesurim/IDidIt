const Sequelize = require('sequelize');
const session = require('express-session');
const app = require('../../index');
const config = require('../config/config.js')["development"];
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);
const sessionStore = new SequelizeStore({
  db:sequelize
});

app.use(session({
  secret : process.env.SECRET_KEY,
  store : sessionStore,
  resave : false,
  saveUninitialized : true,
  })
);


sessionStore.sync({ force: false });

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./User')(sequelize, Sequelize); 

module.exports = db;