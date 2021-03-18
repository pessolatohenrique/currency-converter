const bodyParser = require("body-parser");
const currencyRoutes = require("./currency");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(currencyRoutes);
};
