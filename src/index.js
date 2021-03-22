const express = require("express");
const routes = require("./routes");
const passport = require("passport");

const app = express();
app.use(passport.initialize());
routes(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Server Started"));
}

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", routes);

module.exports = app;
