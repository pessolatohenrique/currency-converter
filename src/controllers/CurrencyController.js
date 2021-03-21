const model = require("../models").Currency;
const { Validators } = require("../utils");
const axios = require("axios");

class CurrencyController {
  static async index(req, res) {
    return res.status(200).json({ message: "Welcome to the Currency module" });
  }

  static async calculate(req, res) {
    try {
      const { price } = req.query;

      if (Validators.checkPositiveNumber(price)) {
        return res
          .status(400)
          .json({ message: "Price must be valid and above 0 " });
      }

      const response = await model.getExchanges();

      const valuesCalcutated = await model.mapExchanges(
        response.data.rates,
        price
      );

      return res.status(200).json(valuesCalcutated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CurrencyController;
