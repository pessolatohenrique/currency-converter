const request = require("supertest");
const app = require("../../src");

const URL_CURRENCY = "/currency";

describe("Authentication", () => {
  it("should authenticate with valid credentials (e-mail and password)", async () => {
    const response = await request(app).post("/user/login").send({
      email: "pessolatohenrique@gmail.com",
      password: process.env.DEFAULT_PASSWORD,
    });

    expect(response.status).toBe(204);
  });

  it("should authenticate with valid credentials (username and password)", async () => {
    const response = await request(app).post("/user/login").send({
      email: "pessolatohenrique",
      password: process.env.DEFAULT_PASSWORD,
    });

    expect(response.status).toBe(204);
  });

  it("should not authenticate with invalid credentials", async () => {
    const response = await request(app).post("/user/login").send({
      email: "pessolatohenrique",
      password: process.env.INCORRECT_PASSWORD,
    });

    expect(response.status).toBe(401);
  });

  it("should not authenticate when user not exists", async () => {
    const response = await request(app).post("/user/login").send({
      email: "usuariofake",
      password: process.env.INCORRECT_PASSWORD,
    });

    expect(response.status).toBe(401);
  });

  it("shoud allow request with valid token", async () => {
    const responseToken = await request(app).post("/user/login").send({
      email: "pessolatohenrique",
      password: process.env.DEFAULT_PASSWORD,
    });

    const response = await request(app)
      .get(URL_CURRENCY)
      .set({ Authorization: `Bearer ${responseToken.headers.authorization}` })
      .send();

    expect(response.status).toBe(200);
  });

  it("should not allow request without token", async () => {
    const response = await request(app).get(URL_CURRENCY).send();

    expect(response.status).toBe(401);
  });

  it("should not allow request with invalid token", async () => {
    const response = await request(app)
      .get(URL_CURRENCY)
      .set({ Authorization: `Bearer 12345` })
      .send();

    expect(response.status).toBe(401);
  });
});
