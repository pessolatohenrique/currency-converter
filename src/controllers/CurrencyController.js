const model = require("../models").Currency;
const axios = require("axios");

class CurrencyController {
  static async index(req, res) {}

  static async calculate(req, res) {
    try {
      const response = await axios.get(
        "https://api.exchangeratesapi.io/latest?base=BRL&symbols=USD,EUR,INR"
      );

      const valuesCalcutated = Object.keys(response.data.rates).map((key) => {
        const value = response.data.rates[key];
        const resultCalculated = value < 1 ? 1 / value : 1 * value;

        return { code: key, result: resultCalculated.toFixed(2) };
      });

      return res.status(200).json(valuesCalcutated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CurrencyController;
