const request = require("supertest");
const app = require("../../src");

describe("Authentication", () => {
  it("should authenticate with valid credentials (e-mail and password)", async () => {
    const response = await request(app).post("/user/login").send({
      email: "pessolatohenrique@gmail.com",
      password: "admin@123",
    });

    expect(response.status).toBe(204);
  });
});

/**
 * - autenticação com usuário (usuário e senha)
 * - autenticação com credencias inválidas
 * - autenticação com usuário que não existe
 * - acesso em rota com token válido
 * - acesso em rota com token inválido
 * - acesso em rota sem o token
 * set('Authorization', `Bearer ${token}`)
 */
