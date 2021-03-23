const Currency = require("../../src/models").Currency;

describe("Currency Unit", () => {
  it("should get exchanges according to API", async () => {
    const response = await Currency.getExchanges();
    expect(response.status).toBe(200);
    expect(response.data.rates).toHaveProperty("USD");
  });

  it("should calculate when value is under 1", async () => {
    const value = 0.5;
    const result = Currency.calculateSingleValue(value);

    expect(result).toBe(2);
  });

  it("should calculate when value is equal to 1", async () => {
    const value = 1;
    const result = Currency.calculateSingleValue(value);

    expect(result).toBe(1);
  });

  it("should calculate when value is above 1", async () => {
    const value = 1.5;
    const result = Currency.calculateSingleValue(value);

    expect(result).toBe(1.5);
  });

  it("should calculate price when both values are valid", async () => {
    const value = 5.5;
    const price = 15;

    const result = Currency.calculatePrice(value, price);
    expect(result).toBe(82.5);
  });

  it("should calculate price when value is zero", async () => {
    const value = 0;
    const price = 15;

    const result = Currency.calculatePrice(value, price);
    expect(result).toBe(0);
  });

  it("should map results with prices", async () => {
    const price = 10;
    const response = await Currency.getExchanges();

    const valuesCalcutated = await Currency.mapExchanges(
      response.data.rates,
      price
    );

    expect(valuesCalcutated.length).toBeGreaterThan(0);
    expect(valuesCalcutated[0].code).toBeDefined();
  });
});
