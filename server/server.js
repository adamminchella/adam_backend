const express = require("express");
const cors = require("cors");

const habitRouter = require("./routes/habit");
const userRouter = require("./routes/user");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our server" });
});

server.use("/habits", habitRouter);
server.use("/users", userRouter);

module.exports = server;
