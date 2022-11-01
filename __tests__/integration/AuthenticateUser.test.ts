import App from "../../src/app";

import request from "supertest";

import DB from "../../src/database/config/data-source";

describe("authenticate user", () => {
  beforeEach(async () => {
    await DB.initialize();

    await DB.runMigrations();
  });

  afterEach(async () => {
    await DB.query("TRUNCATE TABLE users");

    await DB.destroy();
  });

  it("should return an error if user is not registered", async () => {
    const response = await request(new App().server)
      .post("/api/user/login")
      .send({
        email: "dskljfos428fvsd@mail.com.br",
        senha: "fkasdj8420f9s",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should return an error if password arent matching", async () => {
    await request(new App().server).post("/api/user/register").send({
      email: "fadklsjfl4820@mail.comm.br",
      name: "user name fadlskjflak",
      nascimento: "01/09/2001",
      senha: "fdlkajflksa8402fw",
    });

    const response = await request(new App().server)
      .post("/api/user/login")
      .send({
        email: "fadklsjfl4820@mail.comm.br",
        senha: "fdlskajfl42802",
      });

    expect(response.body.status).toEqual(401);
  });
});
