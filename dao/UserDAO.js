const User = require("../model/user/User");
const jwt = require("jsonwebtoken");

const UserDAO = {
  findByLogin: async (login) => {
    return await User.findOne({ where: { login } });
  },
  findById: async (id) => {
    return await User.findByPk(id);
  },
  signup: async (login, password, intolerances, diets, dislikes) => {
    return await User.create({
      login,
      password,
      intolerances,
      diets,
      dislikes,
    });
  },
  login: async (login, password) => {
    const user = await User.findOne({ where: { login } });
    if (await user.validPassword(password)) {
      const token = jwt.sign({ user_id: user.id, login }, "TOKEN_KEY", {
        expiresIn: "2h",
      });
      return { login: user.login, token };
    }
    throw new Error("Incorrect login or password");
  },
  update: async (login, password, alexaID) => {
    const currentUser = await User.findOne({ where: { login } });
    if (!currentUser) {
      throw new Error("User not found");
    }
    return await currentUser.update({ password, alexaID });
  },
};

module.exports = UserDAO;
