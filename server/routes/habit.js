const { Router } = require("express");
const authenticator = require("../middleware/authentication");

const habitController = require("../controllers/habit.js");


const habitRouter = Router();

habitRouter.get("/", habitController.index);
habitRouter.post("/", authenticator, habitController.create);
habitRouter.get("/:id", habitController.show);
habitRouter.delete("/:id", authenticator, habitController.destroy);

module.exports = habitRouter;
