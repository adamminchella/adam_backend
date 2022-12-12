const { Router } = require("express");

const habitController = require("../controllers/habit.js");

// const authenticator = require("../middleware/authenticator");

const habitRouter = Router();

habitRouter.get("/", habitController.index);
habitRouter.post("/", habitController.create);
habitRouter.get("/:id", habitController.show);
habitRouter.delete("/:id", habitController.destroy);

module.exports = habitRouter;
