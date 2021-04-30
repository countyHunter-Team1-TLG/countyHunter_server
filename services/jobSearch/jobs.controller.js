const axios = require("axios");
const domain = "https://jobs.github.com/positions.json?";

class JobsController {
  static convertToUrl(query) {
    let params = [];

    if (query.hasOwnProperty("description")) {
      params.push(`description=${query.description}`);
    }

    if (query.hasOwnProperty("location")) {
      params.push(`location=${query.location}`);
    }

    if (query.hasOwnProperty("full_time")) {
      params.push(`full_time=${query.full_time}`);
    }

    return domain + params.join("&");
  }

  static async getJobs(req, res) {
    try {
      let result = await axios.get(JobsController.convertToUrl(req.query));
      res.send(result.data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { JobsController };
