const { Router } = require("express");
const authenticator = require("../middleware/authentication");

const userController = require("../controllers/user.js");

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/:id", authenticator, userController.show);
userRouter.get("/logout/:id", userController.logout);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
