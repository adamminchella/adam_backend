const request = require("supertest");
const app = require("../server");
const resetTestDB = require("./config");

describe("Testing habit endpoints", () => {
  let api;

  //   beforeEach(async () => {
  //     await resetTestDB();
  //   });

  beforeAll(async () => {
    api = app.listen(5000, () => {
      console.log("API test listening on port 5000");
    });
    await resetTestDB();
  });

  afterAll((done) => {
    console.log("API ending");
    api.close(done);
  });
});
