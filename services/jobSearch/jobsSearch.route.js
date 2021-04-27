const express = require("express");
const jobsController = require("./jobs.controller").JobsController;

const jobsRouter = express.Router();

// associate put, delete, and get(id)
jobsRouter.route("/getJobs").get(jobsController.getJobs);

module.exports = jobsRouter;
