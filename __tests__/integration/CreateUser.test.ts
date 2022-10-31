import App from "../../src/app";

import request from "supertest";

import DB from "../../src/database/config/data-source";

import { jest } from "@jest/globals";

describe("create user", () => {
  jest.setTimeout(200000);

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
      .set("Accept", "applicatin/json")
      .send({
        email: "@mail.com",
      });

    expect(response.status).toEqual(400);
  });

  it("should return an error if user already exists", async () => {
    await request(new App().server)
      .post("/api/user/register")
      .set("Accept", "application/json")
      .send({
        email: "user1234@mail.com.br",
        name: "user name",
        nascimento: "00/00/0000",
        senha: "user123456",
      });

    const response = await request(new App().server)
      .post("/api/user/register")
      .set("Accept", "application/json")
      .send({
        email: "user1234@mail.com.br",
        name: "user name",
        nascimento: "00/00/0000",
        senha: "user123456",
      });

    expect(response.status).toEqual(400);
  });

  it("should create a new user", async () => {
    const response = await request(new App().server)
      .post("/api/user/register")
      .set("Accept", "application/json")
      .send({
        email: "user123456@mail.com.br",
        name: "user name middlename",
        nascimento: "01/09/2001",
        senha: "usuario123456789",
      });

    expect(response.status).toEqual(201);
  });
});
