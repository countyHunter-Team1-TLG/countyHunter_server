const express = require("express");
const viewsCtrl = require("./views.controller").ViewController;

const viewsRouter = express.Router();

// associate put, delete, and get(id)
viewsRouter.route("/register").get(viewsCtrl.register); // register page
viewsRouter.route("/login").get(viewsCtrl.login); // login page
viewsRouter.route("/main").get(viewsCtrl.main); // redirect to main page

module.exports = viewsRouter;
