const express = require("express");
const houseCtrl = require("./housing.controller").HousingController;

const houseRouter = express.Router();

// associate put, delete, and get(id)
houseRouter.route("/getArrays").get(houseCtrl.getArraysReady);

module.exports = houseRouter;
