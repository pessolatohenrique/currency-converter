const bodyParser = require("body-parser");
const currencyRoutes = require("./currency");
const userRoutes = require("./user");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(currencyRoutes);
  app.use(userRoutes);
};
