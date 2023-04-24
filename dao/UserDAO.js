const User = require("../model/user/User");
const bcrypt = require('bcrypt')

const UserDAO = {
  findByLogin: async (login) => {
    return await User.findOne({ where: { login } })
  },
  signup: async (login, password) => {
    return await User.create({ login, password });
  },
  login: async (login, password) => {
    const user = await User.findOne({ where: { login } })
    if (await user.validPassword(password)) {
      return true
    }
    throw new Error("Incorrect login or password")
  },
  update: async (login, password, alexaID) => {
    const currentUser = await User.findOne({ where: { login } });
    if (!currentUser) {
      throw new Error("User not found");
    }
    return await currentUser.update({ password, alexaID })
  }
};

module.exports = UserDAO;
