const request = require("supertest");
const app = require("../server");
const resetTestDB = require("./config");
const fncs = require("../controllers/user");

const sampleHabit = {
    account_id: 1,
    habit_name: "Sleep",
    frequency: 4,
    streak: 0,
  };

  const sampleUser = {
    username: "adammildred",
    password: "password",
    dark_mode: "light",
    avatar: "avatar",
  };

  const sampleLoginData = {
    username: "adam",
    password: "password",
  };
  
  describe("Testing all endpoints", () => {
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

  
    it("Should GET status code 200 and send welcome message on /", (done) => {
      request(api)
        .get("/")
        .expect(200)
        .expect({ message: "Welcome to our server" }, done);
    });
  
    it("Should GET status code 401 on /habits and be unauthorised", (done) => {
        request(api)
          .get("/habits")
          .expect(401, done);
      });

    it("Should POST status code 201 and send new user on /users/register", (done) => {
    request(api).post("/users/register").send(sampleUser).expect(201, done);
    });

    it("Should POST status code 200 and login user on /users/login", (done) => {
    // jest.spyOn(fncs.login, compare).mockResolvedValueOnce(true);
    request(api).post("/users/login").send(sampleLoginData).expect(200, done);
    });

    it("Should GET status code 200 and send user on /users/1", (done) => {
        request(api)
          .get("/users/1")
          .expect(200)
          .expect(
            {
              habit: [
                { id: 1, account_id: 1, name: "Water", frequency: 7, streak: 0 },
                { id: 2, account_id: 1, name: "Food", frequency: 5, streak: 0 },
              ],
              dates: [
                {
                  id: 1,
                  account_id: 1,
                  habits: "these habits",
                  date: "2004-10-19T09:23:54.000Z",
                },
              ],
            },
            done
          );
      });

    it("Should GET status code 404 and send error message on /users/invalid-id", async () => {
        await request(api)
          .get("/users/invalid-id")
          .expect(404)
          .then((res) => {
            expect(res.body).toHaveProperty("error");
          });
      });


  
    it("Should GET status code 200 and send all habits on /habits", (done) => {
      request(api)
        .get("/habits")
        .expect(200)
        .expect(
          [
            { id: 1, account_id: 1, name: "Water", frequency: 7, streak: 0 },
            { id: 2, account_id: 1, name: "Food", frequency: 5, streak: 0 },
          ],
          done
        );
    });
  
    it("Should POST status code 201 and create new habit on /habits", (done) => {
      request(api).post("/habits").send(sampleHabit).expect(201, done);
    });
  
    it("Should GET status code 200 and send habit by ID on /habits/1", (done) => {
      request(api)
        .get("/habits/1")
        .expect(200)
        .expect(
          { id: 1, account_id: 1, name: "Water", frequency: 7, streak: 0 },
          done
        );
    });
  
    it("Should GET status code 404 and send error on /habits/invalid-id", async () => {
      await request(api)
        .get("/habits/invalid-id")
        .expect(404)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
        });
    });
  
    it("Should PUT status code 200 and update habit on /habits/1", (done) => {
      request(api).put("/habits/1").send(sampleHabit).expect(200).expect(
        {
          habit_id: 1,
          account_id: 1,
          habit_name: "Sleep",
          frequency: 4,
          streak: 0,
        },
        done
      );
    });
  
    it("Should PUT status code 417 and send error on /habits/invalid-id", async () => {
      await request(api)
        .put("/habits/invalid-id")
        .send({ data: "invalid" })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("err");
        });
    });
  
    it("Should DELETE with status code 204 on /habits/3", async () => {
      await request(api).delete("/habits/3").expect(204);
      await request(api)
        .get("/habits")
        .expect(200)
        .then((res) => {
          expect(res.body.length).toEqual(2);
        });
    });
  
    it("Should NOT DELETE with status code 404 on /habits/invalid-id", async () => {
      await request(api)
        .delete("/habits/invalid-id")
        .expect(404)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
        });
    });
  });