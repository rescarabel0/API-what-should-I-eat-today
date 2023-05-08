const AuthorizationCode = require("../model/oauth/authorizationCode");
const UserDAO = require("./UserDAO");

const AuthorizationCodeDAO = {
  create: async (userLogin) => {
    const user = await UserDAO.findByLogin(userLogin);
    if (!user) {
      return null;
    }
    const code = createCode(10) + userLogin;
    AuthorizationCode.create({ authorizationCode: code, user_id: user.id });
    return code;
  },
  findByCode: async (code) => {
    return AuthorizationCode.findOne({
      where: { authorizationCode: code },
    });
  },
};

function createCode(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports = AuthorizationCodeDAO;
