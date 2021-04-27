const axios = require("axios");
const express = require("express");
const app = express();
const domain = "https://jobs.github.com/positions.json?";

function convertToUrl(query) {
  let params = [];

  if (query.hasOwnProperty("description")) {
    params.push(`description=${query.description}`);
  }

  if (query.hasOwnProperty("location")) {
    params.push(`description=${query.location}`);
  }

  if (query.hasOwnProperty("full_time")) {
    params.push(`full_time=${query.full_time}`);
  }

  return domain + params.join("&");
}

app.get("/jobs", async (req, res) => {
  let jobs;
  try {
    let result = await axios.get(convertToUrl(req.query));
    res.send(result.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
