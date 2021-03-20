const { Router } = require("express");
const CurrencyController = require("../controllers/CurrencyController");

const router = Router();

router.get("/", (req, res) => res.status(200).send({ message: "initial" }));
router.get("/currency/calculate", CurrencyController.calculate);

module.exports = router;
