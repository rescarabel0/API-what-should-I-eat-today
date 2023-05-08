const Token = require("../model/oauth/token");

const TokenDAO = {
    isExpired: (accessToken) => {
        const tokenEntity = Token.findOne({where: {accessToken}});
        const expirationTime = tokenEntity.expiry
        const currentDateInMs = new Date().getTime();
        return expirationTime - currentDateInMs <= 0 
    }
};

module.exports = TokenDAO;