const express = require("express");
const cors = require("cors");

const authenticator = require("../middleware/authentication");

const habitRouter = require("./routes/habit");
const userRouter = require("./routes/user");
const dateRouter = require("./routes/date");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our server" });
});

server.use("/habits", habitRouter);
server.use("/users", userRouter);
server.use("/dates", authenticator, dateRouter);

module.exports = server;
