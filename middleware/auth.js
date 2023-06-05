const jwt = require("jsonwebtoken");
const TokenDAO = require("../dao/TokenDAO");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ error: "A token is required for authentication" });
  }
  const foundToken = await TokenDAO.findByToken(token);
  if (!foundToken) {
    return res.status(401).send({ error: "Token not found" });
  }
  req.user = foundToken.user_id;
  return next();
};

module.exports = verifyToken;
