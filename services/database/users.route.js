const express = require("express");
const usersCtrl = require("./users.controller").UserController;

const usersRouter = express.Router();

// associate put, delete, and get(id)
usersRouter.route("/register").post(usersCtrl.register);
usersRouter.route("/login").post(usersCtrl.login);
usersRouter.route("/logout").post(usersCtrl.logout);
usersRouter.route("/delete").delete(usersCtrl.delete);
usersRouter.route("/update-preferences").put(usersCtrl.save);

module.exports = { usersRouter };
