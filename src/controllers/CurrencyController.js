const model = require("../models").Currency;
const axios = require("axios");

class CurrencyController {
  static async index(req, res) {}

  static async calculate(req, res) {
    try {
      const { price } = req.query;

      const isNumeric = /^-?\d+$/.test(price);

      if (!price || price <= 0 || !isNumeric) {
        return res
          .status(400)
          .json({ message: "Price must be valid and above 0 " });
      }

      const response = await axios.get(
        "https://api.exchangeratesapi.io/latest?base=BRL&symbols=USD,EUR,INR"
      );

      const valuesCalcutated = Object.keys(response.data.rates).map((key) => {
        const value = response.data.rates[key];
        const singleValue = value < 1 ? 1 / value : 1 * value;
        const convertedPrice = price * value;

        return {
          code: key,
          comparative: value.toFixed(2),
          single: singleValue.toFixed(2),
          price: convertedPrice.toFixed(2),
        };
      });

      return res.status(200).json(valuesCalcutated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CurrencyController;
