const { Router } = require("express");

const dateController = require("../controllers/date.js");


const dateRouter = Router();

dateRouter.get("/", dateController.index);
dateRouter.post("/", dateController.create);
dateRouter.get("/:id", dateController.show);
dateRouter.delete("/:id", dateController.destroy)

module.exports = dateRouter;
