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
        senha: "jfslmmmmmmmmmm42",
      });

    expect(response.body.status).toEqual(401);
  });

  it("should return an error if wrong data is send", async () => {
    const response = await request(new App().server)
      .post("/api/user/login")
      .send({
        email: "@mail.com",
        senha: "123",
      });

    expect(response.body.status).toEqual(400);
  });

  it("should return a jwt token when authenticated", async () => {
    await request(new App().server).post("/api/user/register").send({
      email: "vmclasjfladsfal@mail.com",
      name: "user name fadlskjflak",
      nascimento: "01/09/2001",
      senha: "jfdslkfmmmmmmmmmm42",
    });

    const response = await request(new App().server)
      .post("/api/user/login")
      .send({
        email: "vmclasjfladsfal@mail.com",
        senha: "jfdslkfmmmmmmmmmm42",
      });

    expect(response.headers["set-cookie"]).toBeDefined();

    expect(response.body.status).toEqual(200);
  });
});
