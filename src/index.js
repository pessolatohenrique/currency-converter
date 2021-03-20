const express = require("express");
const routes = require("./routes");
const passport = require("passport");

const app = express();
app.use(passport.initialize());
routes(app);
app.listen(3000, () => console.log("Server Started"));

module.exports = app;
