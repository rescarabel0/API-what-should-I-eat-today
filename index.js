const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = 3030;

const userRoutes = require("./routes/UserRoutes");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
