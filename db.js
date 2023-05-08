const { Sequelize } = require("sequelize");
const db = new Sequelize("sqlite:./db.sqlite");

db.sync()

module.exports = db;
