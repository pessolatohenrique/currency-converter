const { Router } = require("express");
const CurrencyController = require("../controllers/CurrencyController");
const { AuthMiddleware } = require("../middlewares");

const router = Router();

router
  .route("/currency/calculate")
  .get(AuthMiddleware.bearer, CurrencyController.calculate);

module.exports = router;
