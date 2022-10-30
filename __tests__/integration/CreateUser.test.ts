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
      .set("Accept", "applicatin/json")
      .send({
        email: "@mail.com",
      });

    expect(response.status).toEqual(400);
  });
});
