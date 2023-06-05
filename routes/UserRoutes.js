const express = require("express");
const router = express.Router();

const UserDAO = require("../dao/UserDAO");
const AuthorizationCodeDAO = require("../dao/AuthorizationCodeDAO");

const intolerances = [
  "Dairy",
  "Egg",
  "Gluten",
  "Grain",
  "Peanut",
  "Seafood",
  "Sesame",
  "Shellfish",
  "Soy",
  "Sulfite",
  "Tree Nut",
  "Wheat",
];

const diets = [
  'Gluten Free',
  'Vegetarian',
  'Lacto-Vegetarian',
  'Ovo-Vegetarian',
  'Vegan'
]

router.get("/sign", (req, res) => {
  res.render("signup", {params: {diets, intolerances}});
});

router.post("/sign", async (req, res) => {
  const body = req.body
  if (!body.user || !body.password) {
    res.render("signup", {params: {diets, intolerances, error: 'User or password invalid'}});
    return;
  } else if (body.password.length < 5) {
    res.render("signup", {params: {diets, intolerances, error: 'Password must have 5 or more characters'}});
    return;
  }

  let _intolerances;
  let _diets;

  if (body.intolerances)
    _intolerances = typeof body.intolerances === 'string' ? body.intolerances : body.intolerances.join(',')
  if (body.diets) 
    _diets = typeof body.diets === 'string' ? body.diets : body.diets.join(',')

  try {
    const createdUser = await UserDAO.signup(body.user, body.password, _intolerances, _diets, body.dislikes);
    res.render('success', {params: {user: createdUser.login}})
  } catch (_) {
    res.render("signup", {params: {diets, intolerances, error: 'Login already exists'}});
  }
})

router.post("/login", async (req, res) => {
  const body = req.body;
  if (!body.login || !body.password) {
    res.status(400).send({ error: "Missing parameters" });
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
    res.status(400).send({ error: "Missing parameters" });
    return;
  }

  const state = req.query.state;
  const redirect = req.query.redirect_uri;

  try {
    const loggedIn = await UserDAO.login(body.login, body.password);
    const code = await AuthorizationCodeDAO.create(loggedIn.login);
    res.redirect(`${redirect}?state=${state}&code=${code}`);
  } catch (err) {
    res.redirect(
      `/oauth/login?error=true&state=${state}&redirect_uri=${redirect}`
    );
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  if (!body.login || !body.password) {
    res.status(400).send({ error: "Missing parameters" });
    return;
  }
  const createdUser = await UserDAO.signup(body.login, body.password);
  createdUser.password = "";
  res.status(201).send(createdUser);
});

router.put("/", async (req, res) => {
  const body = req.body;
  if (!body.login) {
    res.status(400).send({ error: "Missing parameters" });
    return;
  }
  try {
    const updatedUser = await UserDAO.update(
      body.login,
      body.password,
      body.alexaID
    );
    createdUser.password = "";
    res.send(updatedUser);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

module.exports = router;
