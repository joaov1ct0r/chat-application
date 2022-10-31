import App from "../../src/app";

import request from "supertest";

import DB from "../../src/database/config/data-source";

describe("create user", () => {
  beforeEach(async () => {
    await DB.initialize();

    await DB.runMigrations();
  });

  afterEach(async () => {
    await DB.query("TRUNCATE TABLE users");

    await DB.destroy();
  });

  it("should return an error if wrong data is send", async () => {
    const response = await request(new App().server)
      .post("/api/user/register")
      .send({
        email: "@mail.com",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an error if user already exists", async () => {
    await request(new App().server).post("/api/user/register").send({
      email: "user1fdasfdaf234@mail.com.br",
      name: "user name fadlskjflak",
      nascimento: "01/09/2001",
      senha: "userfdaksjfalkdj123456",
    });

    const response = await request(new App().server)
      .post("/api/user/register")
      .send({
        email: "user1fdasfdaf234@mail.com.br",
        name: "user name fadlskjflak",
        nascimento: "01/09/2001",
        senha: "userfdaksjfalkdj123456",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should create a new user", async () => {
    const response = await request(new App().server)
      .post("/api/user/register")
      .send({
        email: "adlksfjalkds@mail.com.br",
        name: "user dlakjflskajdfl dlename",
        nascimento: "01/09/2001",
        senha: "dflksaj4038204jfldsk",
      });

    expect(response.body.status).toEqual(201);
  });
});
