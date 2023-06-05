const { DataTypes, STRING } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../../db");
const Token = require("../oauth/token");
const AuthorizationCode = require("../oauth/authorizationCode");

const User = db.define("User", {
  login: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  intolerances: {
    type: STRING,
    allowNull: true
  },
  diets: {
    type: STRING,
    allowNull: true
  },
  dislikes: {
    type: STRING,
    allowNull: true
  }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.hasOne(Token, {
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  foreignKey: "user_id",
});

User.hasOne(AuthorizationCode, {
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  foreignKey: "user_id",
});

module.exports = User;
