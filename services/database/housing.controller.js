const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HousingMarket = require("./housingMarket").HousingMarket;
const db_collection = require("./housingMarket").h_db_collections;

class HousingController {
  static async getArraysReady(req, res) {
    try {
      const houseFromBody = req.body;
      console.log("house data received:");
      console.log(houseFromBody.city);
      console.log(houseFromBody.state);

      let errors = {};
      // req doesn't contain city and state
      // errors.info = `You didn't provide city and state`
      if (houseFromBody && houseFromBody.city === "") {
        errors.city = `You didn't provide city`;
      }
      if (houseFromBody && houseFromBody.state === "") {
        errors.state = `You didn't provide state`;
      }
      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      }
      let result = await HousingMarket.getVisualizationDataArrays(
        houseFromBody.city,
        houseFromBody.state
      );
      res.send(result);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}

module.exports = { HousingController };
