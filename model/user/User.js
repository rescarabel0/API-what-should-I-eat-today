const { DataTypes } = require("sequelize");
const db = require("../../db");

const User = db.define("User", {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await db.sync({ force: true });
})();

module.exports = User;
