const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const morgan = require("morgan");
const usersRouter = require("./services/database/users.route");
const jobsRouter = require("./services/jobSearch/jobsSearch.route");
const viewsRouter = require("./views/views.route");
const houseRouter = require("./services/database/housing.route");

const app = express();
app.set("view engine", "ejs");
app.set("views", express.static("./views/pages"));
// static files
app.use("/Assets", express.static("./views/Assets"));
app.use("/js", express.static("./views/js"));

app.use(cors());
//process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Todo: users and jobs APIs only available for loged in users
// Register api routes
app.use("/user", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/views", viewsRouter);
app.use("/house", houseRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports.app = app;
