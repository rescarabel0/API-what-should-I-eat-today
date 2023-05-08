const express = require("express");
const router = express.Router();
const OAuthDAO = require("../dao/AuthorizationCodeDAO");

router.get("/login", (req, res) => {
  res.render("login", { params: req.query });
});

router.post("/", async (req, res) => {
  const code = req.body.code;
  const foundCode = await OAuthDAO.findByCode(code);
  if (!foundCode) {
    res.status(404).send()
  }
  res.send({access_token: 'teste', refresh_token: 'teste', token_tyoe: 'bearer', 'expires_in': 86400});
});

module.exports = router;
