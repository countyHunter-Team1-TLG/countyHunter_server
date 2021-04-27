let users;
let sessions;

class UsersConnection {
  /**
   *    connect with database users and sessions
   * @param {Object/null} connection established connection reference
   * @returns {null} if users and sessions connection exist
   */
  static async injectDB(connection) {
    if (users && sessions) {
      return; // already connected
    }
    try {
      users = await connection.db(process.env.NAMESPACE).collection("users");
      sessions = await connection
        .db(process.env.NAMESPACE)
        .collection("sessions");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in usersInfo: ${e}`
      );
    }
  }

  /**
   * find username and password
   * @param {String} email
   * @returns
   */
  static async getUser(email) {
    return await users.findOne({ email });
  }

  /**
   *
   * @param {UserInfo} userInfo
   * @returns
   */
  static async addUser(userInfo) {
    try {
      let options = { w: "majority", wtimeout: 5000 }; // 2/3 servers need to be updated
      let { name, email, password } = userInfo;
      await users.insertOne({ name, email, password }, options);
      return { success: true };
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A user with the given email already exists." };
      }
      console.error(`Error occurred while adding new user, ${e}.`);
      return { error: e };
    }
  }

  static async deleteUser(email) {
    try {
      await users.deleteOne({ email });
      await sessions.deleteOne({ user_id: email });
      if (!(await this.getUser(email)) && !(await this.getUserSession(email))) {
        return { success: true };
      } else {
        console.error(`Deletion unsuccessful`);
        return { error: `Deletion unsuccessful` };
      }
    } catch (e) {
      console.error(`Error occurred while deleting user, ${e}`);
      return { error: e };
    }
  }

  /**
   * login a user with generated secret token
   * @param {String} email user email address
   * @param {string} jwt token generated in middleware
   */
  static async loginUser(email, jwt) {
    try {
      await sessions.updateOne(
        { user_id: email },
        { $set: { user_id: email, jwt } },
        { upsert: true }
      );
      return { success: true };
    } catch (e) {
      console.error(`Error occurred while logging in user, ${e}`);
      return { error: e };
    }
  }

  static async logoutUser(email) {}
}

/**
 * Parameters passed to addUser method
 * @typedef UserInfo
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */

module.exports = { UsersConnection };
