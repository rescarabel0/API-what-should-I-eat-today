const express = require("express");
const router = express.Router();
const OAuthDAO = require("../dao/AuthorizationCodeDAO");
const TokenDAO = require("../dao/TokenDAO");

router.get("/login", (req, res) => {
  res.render("login", { params: req.query });
});

router.post("/", async (req, res) => {
  const code = req.body.code;
  const foundCode = await OAuthDAO.findByCode(code);
  if (!foundCode) {
    res.status(404).send();
  }
  const token = await TokenDAO.generate(foundCode.user_id);
  await OAuthDAO.delete(foundCode);
  res.send({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    token_type: "bearer",
    expires_in: 172800,
  });
});

module.exports = router;
