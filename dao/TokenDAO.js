const { Op } = require("sequelize");
const Token = require("../model/oauth/token");
const jwt = require("jsonwebtoken");

const TokenDAO = {
  isExpired: (accessToken) => {
    const tokenEntity = Token.findOne({ where: { accessToken } });
    const expirationTime = tokenEntity.expiry;
    const currentDateInMs = new Date().getTime();
    return expirationTime - currentDateInMs <= 0;
  },
  generate: async (user_id) => {
    const accessToken = jwt.sign(
      { user_id, type: "access_token" },
      "TOKEN_KEY",
      {
        expiresIn: "2d",
      }
    );
    const refreshToken = jwt.sign(
      { user_id, type: "refresh_token" },
      "TOKEN_KEY",
      {
        expiresIn: "365d",
      }
    );
    return await Token.create({
      accessToken,
      refreshToken,
      expiry: "2h",
      user_id,
    });
  },
  findByToken: async (token) => {
    return await Token.findOne({
      where: { [Op.or]: [{ accessToken: token }, { refreshToken: token }] },
    });
  },
};

module.exports = TokenDAO;
