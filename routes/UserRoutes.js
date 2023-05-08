const express = require("express");
const https = require('node:https')
const router = express.Router();

const UserDAO = require("../dao/UserDAO");
const AuthorizationCodeDAO = require("../dao/AuthorizationCodeDAO");

router.post("/login", async (req, res) => {
  const body = req.body;
  if (!body.login || !body.password) {
    res.status(400).send({ error: 'Missing parameters' });
    return;
  }
  try {
    const loggedIn = await UserDAO.login(body.login, body.password);
    res.send(loggedIn);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

router.post("/login/oauth", async (req, res) => {
  const body = req.body;
  if (!body.login || !body.password) {
    res.status(400).send({ error: 'Missing parameters' });
    return;
  }

  const state = req.query.state
  const redirect = req.query.redirect_uri

  try {
    const loggedIn = await UserDAO.login(body.login, body.password);
    const code = await AuthorizationCodeDAO.create(loggedIn.login);
    res.redirect(`${redirect}?state=${state}&code=${code}`);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.login || !body.password) {
    res.status(400).send({ error: 'Missing parameters' });
    return;
  }
  const createdUser = await UserDAO.signup(body.login, body.password)
  createdUser.password = ""
  res.status(201).send(createdUser);
});

router.put("/", async (req, res) => {
  const body = req.body;
  if (!body.login) {
    res.status(400).send({ error: 'Missing parameters' });
    return;
  }
  try {
    const updatedUser = await UserDAO.update(body.login, body.password, body.alexaID);
    createdUser.password = ""
    res.send(updatedUser);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
})

module.exports = router;
