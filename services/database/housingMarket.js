let housingDB;
let h_db_collections = {
  FOR_SALE_INVENTORY: "FSI",
  MEDIAN_DAYS_PENDING: "MDDP",
  MEDIAN_LIST_PRICE: "MLP",
  MEDIAN_PRICE_CUT: "MPC",
  MEDIAN_SALE_PRICE: "MSP",
  SALES_COUNT: "SC",
  Z_HOUSE_VALUE_INDEX: "ZHVI",
  Z_HOUSE_VALUE_FORECAST: "ZHVF",
};
Object.freeze(h_db_collections);

class HousingMarket {
  /**
   *    connect with database housingDB
   * @param {Object/null} connection established connection reference
   * @returns {null} if housingDB connection exist
   */
  static async injectDB(connection) {
    if (housingDB) {
      return; // already connected
    }
    try {
      housingDB = await connection.db(process.env.NAMESPACE_HOUSING);
      //console.log(housingDB);
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

  /**
   * collect city, state housing information from different database collection
   * if cannot find by city, then search by state
   * @param {h_db_collections} housingDbCollection
   * @param {string} city
   * @param {string} state
   * @returns {name:"name", array: [{time:"time", value:"value"}]}
   */
  static async getArrayDataReady(housingDbCollection, city, state) {
    let result = { name: "", values: [] };
    let error = { success: true };
    try {
      let target = await housingDB
        .collection(housingDbCollection)
        .findOne({ RegionName: { $regex: `${city}`, $options: "i" } });
      if (target == null) {
        error.success = false;
      } else {
        for (const [key, value] of Object.entries(target)) {
          if (key === `RegionName`) {
            result.name = value;
          } else if (key.includes(`2019`) || key.includes(`2020`)) {
            result.values.push(`{time:${key}, value:${value}}`);
          }
        }
      }
      console.log(result);
      //console.log(Object.entries(item));
      return result;
    } catch (e) {
      console.error(e);
      error.message = e;
      return error;
    }
  }

  static async getSingleDataReady(housingDbCollection, city, state) {}

  static async getVisualizationDataArrays(city, state) {
    let fsi = getArrayDataReady(
      h_db_collections.FOR_SALE_INVENTORY,
      city,
      state
    );
    let mpc = getArrayDataReady(h_db_collections.MEDIAN_PRICE_CUT, city, state);
    let sc = getArrayDataReady(h_db_collections.SALES_COUNT, city, state);
    let mdp = getArrayDataReady(
      h_db_collections.MEDIAN_DAYS_PENDING,
      city,
      state
    );
  }
}

/**
 * Parameters passed to city method
 * @typedef CityInfo
 * @property {string} city
 * @property {string} state
 */

module.exports = { h_db_collections, HousingMarket };
