const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//const morgan = require("morgan");
const usersRouter = require("../services/database/users.route");

const app = express();

app.use(cors());
//process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register api routes
app.use("/user", usersRouter);
app.use("/status", express.static("build"));
app.use("/", express.static("build"));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports.app = app;
