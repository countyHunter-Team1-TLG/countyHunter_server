let housingMarket;

class HousingMarket {
  /**
   *    connect with database housingmarket
   * @param {Object/null} connection established connection reference
   * @returns {null} if housingmarket connection exist
   */
  static async injectDB(connection) {
    if (housingMarket) {
      return; // already connected
    }
    try {
      housingMarket = await connection
        .db(process.env.NAMESPACE_HOUSING)
        .collection("market");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in usersInfo: ${e}`
      );
    }
  }

  /**
   *
   * @param {CityInfo} cityInfoObject
   * @returns
   */
  static async getAveragePrice(cityInfoObject) {
    let averagePrice = 0;
    // code here
    return averagePrice;
  }

  static async getSurroundedAveragePrices(city, state) {}
}

/**
 * Parameters passed to addUser method
 * @typedef CityInfo
 * @property {string} city
 * @property {string} state
 * @property {Array} prices
 */

module.exports = { HousingMarket };
