const express = require("express");
const app = express();
const port = 3030;

const userRoutes = require("./routes/UserRoutes");

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
