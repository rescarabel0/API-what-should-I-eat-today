const { DataTypes } = require("sequelize");
const db = require("../../db");

const AuthorizationCode = db.define("AuthorizationCodes", {
  authorizationCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
});

module.exports = AuthorizationCode;
