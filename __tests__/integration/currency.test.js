const request = require("supertest");
const app = require("../../src");

const URL_CURRENCY_CALCULATE = "/currency/calculate";

let token;

beforeAll(async () => {
  const response = await request(app).post("/user/login").send({
    email: "pessolatohenrique@gmail.com",
    password: process.env.DEFAULT_PASSWORD,
  });

  token = response.header.authorization;
});

describe("Currency", () => {
  it("should calculate with valid price", async () => {
    const response = await request(app)
      .get(`${URL_CURRENCY_CALCULATE}?price=100`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should not calculate with in blank price", async () => {
    const response = await request(app)
      .get(`${URL_CURRENCY_CALCULATE}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });

  it("should not calculate when is zero price", async () => {
    const response = await request(app)
      .get(`${URL_CURRENCY_CALCULATE}?price=0`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });

  it("should not calculate when is negative price", async () => {
    const response = await request(app)
      .get(`${URL_CURRENCY_CALCULATE}?price=-5`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });

  it("should not calculate when is string price", async () => {
    const response = await request(app)
      .get(`${URL_CURRENCY_CALCULATE}?price=abcd`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
  });
});
