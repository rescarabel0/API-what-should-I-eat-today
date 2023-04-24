const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt')
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
  alexaID: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

(async () => {
  await db.sync({ force: true });
})();

module.exports = User;
