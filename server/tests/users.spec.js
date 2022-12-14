// const request = require("supertest");
// const app = require("../server");
// const resetTestDB = require("./config");
// const fncs = require("../controllers/user");

// describe("Testing habit endpoints", () => {
//   let api;

//   const sampleUser = {
//     username: "becca",
//     password: "password2",
//     dark_mode: "light",
//     avatar: "avatar",
//   };

//   const sampleLoginData = {
//     username: "adam",
//     password: "password",
//   };

//   //   beforeEach(async () => {
//   //     await resetTestDB();
//   //   });

//   beforeAll(async () => {
//     api = app.listen(5001, () => {
//       console.log("API test listening on port 5000");
//     });
//     await resetTestDB();
//   });

//   afterAll((done) => {
//     console.log("API ending");
//     api.close(done);
//   });

//   it("Should GET status code 200 and send user on /users/1", (done) => {
//     request(api)
//       .get("/users/1")
//       .expect(200)
//       .expect(
//         {
//           habit: [
//             { id: 1, account_id: 1, name: "Water", frequency: 7, streak: 0 },
//             { id: 2, account_id: 1, name: "Food", frequency: 5, streak: 0 },
//           ],
//           dates: [
//             {
//               id: 1,
//               account_id: 1,
//               habits: "these habits",
//               date: "2004-10-19T09:23:54.000Z",
//             },
//           ],
//         },
//         done
//       );
//   });

//   it("Should GET status code 404 and send error message on /users/invalid-id", async () => {
//     await request(api)
//       .get("/users/invalid-id")
//       .expect(404)
//       .then((res) => {
//         expect(res.body).toHaveProperty("error");
//       });
//   });

//   it("Should POST status code 201 and send new user on /users/register", (done) => {
//     request(api).post("/users/register").send(sampleUser).expect(201, done);
//   });

//   it("Should POST status code 200 and login user on /users/login", (done) => {
//     jest.spyOn(fncs.login, compare).mockResolvedValueOnce(true);
//     request(api).post("/users/login").send(sampleLoginData).expect(200, done);
//   });
// });
