const express = require("express");
const viewsCtrl = require("./views.controller").ViewController;

const viewsRouter = express.Router();

// associate put, delete, and get(id)
viewsRouter.route("/register").get(viewsCtrl.register); // register page
viewsRouter.route("/login").get(viewsCtrl.login); // login page
viewsRouter.route("/main").get(viewsCtrl.main); // redirect to main page
viewsRouter.route("/house/finder").get(viewsCtrl.houseFinder); // redirect to main page
viewsRouter.route("/job/finder").get(viewsCtrl.jobFinder); // redirect to main page
viewsRouter.route("/favorites").get(viewsCtrl.favorites); // redirect to main page
viewsRouter.route("/mission").get(viewsCtrl.mission); // redirect to main page
viewsRouter.route("/aboutUs").get(viewsCtrl.aboutUs); // redirect to main page
viewsRouter.route("/updates").get(viewsCtrl.udpates); // redirect to main page

module.exports = viewsRouter;
