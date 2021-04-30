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
  static async getSurroundedData(city, state) {
    //Todo: get data from cities around
    //Todo: need data for adjacent cities
  }

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
        //const reg = /\d{4}$/g;
        // extract what we need for data visualization
        for (const [key, value] of Object.entries(target)) {
          if (key === `RegionName`) {
            result.name = housingDbCollection;
          } else if (
            key.includes("2019") ||
            key.includes("2020") ||
            key.includes("2021")
          ) {
            let date = new Date(key);
            const formatted_date = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
            let tem_object = { time: formatted_date, value: value };
            result.values.push(tem_object);
          }
        }
      }
      return result;
    } catch (e) {
      console.error(e);
      error.message = e;
      return error;
    }
  }

  static async getSingleDataReady(housingDbCollection, city, state) {}

  static async getVisualizationDataArrays(city, state) {
    let errors = {};
    let result = [];
    try {
      let fsi = await HousingMarket.getArrayDataReady(
        h_db_collections.FOR_SALE_INVENTORY,
        city,
        state
      );
      if (fsi.success == false) {
        errors.fsi = `Couldn't fetch FOR_SALE_INVENTORY`;
      } else {
        result.push(fsi);
      }
      let mpc = await HousingMarket.getArrayDataReady(
        h_db_collections.MEDIAN_PRICE_CUT,
        city,
        state
      );
      if (mpc.success == false) {
        errors.mpc = `Couldn't fetch MEDIAN_PRICE_CUT`;
      } else {
        result.push(mpc);
      }
      let sc = await HousingMarket.getArrayDataReady(
        h_db_collections.SALES_COUNT,
        city,
        state
      );
      if (sc.success == false) {
        errors.sc = `Couldn't fetch SALES_COUNT`;
      } else {
        result.push(sc);
      }
      let mdp = await HousingMarket.getArrayDataReady(
        h_db_collections.MEDIAN_DAYS_PENDING,
        city,
        state
      );
      if (mdp.success == false) {
        errors.mdp = `Couldn't fetch MEDIAN_DAYS_PENDING`;
      } else {
        result.push(mdp);
      }
      console.log(errors);
      console.log(result);
      return result;
    } catch (e) {
      errors.message = e;
      return errors;
    }
  }
  /**
   *
   * @param {db_collection} legend in collection name
   * @returns full description of the data set
   */
  static getLegandName(legend) {
    let name;
    switch (legend) {
      case db_collection.FOR_SALE_INVENTORY:
        name = "For Sale Inventory";
        break;
      case db_collection.MEDIAN_DAYS_PENDING:
        name = "Median Days Pending";
        break;
      case db_collection.MEDIAN_LIST_PRICE:
        name = "Median List Price";
        break;
      case db_collection.MEDIAN_SALE_PRICE:
        name = "Median Sale Price";
        break;
      case db_collection.SALES_COUNT:
        name = "Sales Count";
        break;
      case db_collection.MEDIAN_PRICE_CUT:
        name = "Median Price Cut";
        break;
      default:
        break;
    }
    return name;
  }
}

/**
 * Parameters passed to city method
 * @typedef CityInfo
 * @property {string} city
 * @property {string} state
 */

module.exports = { h_db_collections, HousingMarket };
