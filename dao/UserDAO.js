const User = require("../model/user/User");

const UserDAO = {
  findAll: async () => {
    return await User.findAll();
  },
  signup: async (login, password) => {
    return await User.create({ login, password });
  },
  login: async (login, password) => {
    return await User.findOne({ login, password });
  },
};

module.exports = UserDAO;
