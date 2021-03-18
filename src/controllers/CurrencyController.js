const model = require("../models").Currency;
const axios = require("axios");

class CurrencyController {
  static async index(req, res) {
    try {
      const response = await axios.get(
        "https://api.exchangeratesapi.io/latest?base=BRL&symbols=USD,EUR,INR"
      );

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CurrencyController;
