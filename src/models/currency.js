"use strict";
const { Model } = require("sequelize");
const axios = require("axios");

module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * obtém os valores cotados, baseando-se no real e nas moedas solicitadas
     */
    static async getExchanges() {
      return await axios.get(
        "https://api.exchangeratesapi.io/latest?base=BRL&symbols=USD,EUR,INR"
      );
    }

    /**
     * calcula o valor único da cotação, baseando-se no ágil ou deságil
     * @param {Float} value valor da cotação
     * @return {Float} total
     */
    static calculateSingleValue(value) {
      if (value < 1) {
        return 1 / value;
      } else {
        return 1 * value;
      }
    }

    /**
     * calcula o preço total da cotação, baseado no valor da cotação e preço
     * @param {Float} value valor da cotação
     * @param {Float} price preço do produto
     * @return {Float} total
     */
    static calculatePrice(value, price) {
      return price * value;
    }

    /**
     * realiza o mapeamento, retornando objeto necessário para consulta
     * @param {Object} rates objeto com moedas e valor atual, comparado ao real
     * @param {Float} price preço do produto
     * @return {Array} valuesCalculated lista com os valores respectivamente mapeados e calculados
     */
    static async mapExchanges(rates, price) {
      const valuesCalcutated = Object.keys(rates).map((key) => {
        const value = rates[key];
        const singleValue = this.calculateSingleValue(value);
        const convertedPrice = this.calculatePrice(value, price);

        return {
          code: key,
          comparative: value.toFixed(2),
          single: singleValue.toFixed(2),
          price: convertedPrice.toFixed(2),
        };
      });

      return valuesCalcutated;
    }
  }
  Currency.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Currency",
    }
  );

  return Currency;
};
