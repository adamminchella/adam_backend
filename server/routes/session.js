const { Router } = require("express");

const userController = require("../controllers/user.js");

const sessionRouter = Router();

sessionRouter.delete("/:id", userController.logout);

module.exports = sessionRouter;
