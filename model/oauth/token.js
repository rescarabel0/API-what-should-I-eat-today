const { DataTypes } = require("sequelize");
const db = require("../../db");

const Token = db.define("Tokens", {
  accessToken: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
  expiry: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Token;
