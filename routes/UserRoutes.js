const express = require("express");
const router = express.Router();

const UserDAO = require("../dao/UserDAO");

router.get("/", async (req, res) => {
  res.send(await UserDAO.findAll());
});

module.exports = router;
