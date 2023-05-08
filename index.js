const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 3030;

const auth = require("./middleware/auth");

const userRoutes = require("./routes/UserRoutes");
const spoonacularRoutes = require("./routes/SpoonacularRoutes");
const oauthRoutes = require("./routes/OAuthRoutes");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './routes/templates')

app.use("/user", userRoutes);
app.use("/oauth", oauthRoutes);
app.use("/api", auth, spoonacularRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
