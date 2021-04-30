const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersConnection = require("./users").UsersConnection;

const hashPassword = async (password) => await bcrypt.hash(password, 10); // added salt with 10 rounds

class User {
  constructor({
    name,
    email,
    password,
    jobPreferences = [],
    housePreferances = [],
  } = {}) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.jobPreferences = jobPreferences;
    this.housePreferances = housePreferances;
  }

  /**
   * @returns json format user
   */
  toJson() {
    return {
      name: this.name,
      email: this.email,
      jobPreferences: this.jobPreferences,
      housePreferances: this.housePreferances,
    };
  }

  /**
   * @param {String} plainText another passcode/jwt token
   * @returns true if tokens are same
   */
  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password);
  }

  /**
   * @returns generate jwt token; this will be sent back to client
   */
  encoded() {
    return jwt.sign(
      {
        //set expiration 60 min
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
        // use whole user information
        ...this.toJson(),
      },
      process.env.SECRET_KEY
    );
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error };
      }
      // decoded User
      return new User(res);
    });
  }
}

class UserController {
  static async register(req, res) {
    try {
      const userFromBody = req.body;

      let errors = {};
      if (userFromBody && userFromBody.password.length < 8) {
        errors.password = "Your password must be at least 8 characters.";
      }
      if (userFromBody && userFromBody.name.length < 3) {
        errors.name = "You must specify a name of at least 3 characters.";
      }
      const userFromDB = await UsersConnection.getUser(userFromBody.email);

      if (userFromBody && userFromDB !== null) {
        errors.email = `You cannot register accounts with same email address ${userFromBody.email}`;
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json(errors);
        return;
      } else {
        // encrypt password
        // remove it when the client side has this mechanism
        const userInfo = {
          ...userFromBody,
          password: await hashPassword(userFromBody.password),
        };
        //console.log(userInfo);
        const insertResult = await UsersConnection.addUser(userInfo);
        //console.log(insertResult);
        if (!insertResult.success) {
          errors.email = insertResult.error;
        }
        userFromDB = await UsersConnection.getUser(userFromBody.email);
        if (userFromDB === null) {
          errors.general = "Internal error, please try again later";
        }
        console.log(errors);
        console.log(Object.keys(errors).length);
        console.log(Object.keys(errors.error).length);

        if (
          Object.keys(errors).length > 0 &&
          Object.keys(errors.error).length > 0
        ) {
          res.status(400).json(errors);
          return;
        }
        let user = new User(userDB);
        let json = user.toJson();
        console.log(`last step before send-json:${json}`);

        res.send({
          auth_token: user.encoded(),
          info: json, // already convert to Json
        });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  /**
   *
   * @param {object} req request from client
   * @param {object} res response for client
   * @param {next} next
   * @returns
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || typeof email !== "string") {
        res.status(400).json({ error: "Bad email format, expected string." });
        return;
      }
      if (!password || typeof password !== "string") {
        res
          .status(400)
          .json({ error: "Bad password format, expected string." });
        return;
      }

      let userData = await UsersConnection.getUser(email);
      if (!userData) {
        res.status(401).json({ error: "Make sure your email is correct." });
        return;
      }
      const user = new User(userData);

      if (!(await user.comparePassword(password))) {
        res.status(401).json({ error: "Make sure your password is correct." });
        return;
      }

      // add JWT
      const loginResponse = await UsersConnection.loginUser(
        user.email,
        user.encoded()
      );
      if (!loginResponse.success) {
        res.status(500).json({ error: loginResponse.error });
        return;
      }
      res.json({ auth_token: user.encoded(), info: user.toJson() });
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async logout(req, res) {
    try {
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userObj = await User.decoded(userJwt);
      var { error } = userObj;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      const logoutResult = await UsersConnection.logoutUser(userObj.email);
      var { error } = logoutResult;
      if (error) {
        res.status(500).json({ error });
        return;
      }
      res.json(logoutResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async delete(req, res) {
    try {
      let { password } = req.body;
      if (!password || typeof password !== "string") {
        res
          .status(400)
          .json({ error: "Bad password format, expected string." });
        return;
      }
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userClaim = await User.decoded(userJwt);
      var { error } = userClaim;
      if (error) {
        res.status(401).json({ error });
        return;
      }
      const user = new User(await UsersConnection.getUser(userClaim.email));
      if (!(await user.comparePassword(password))) {
        res.status(401).json({ error: "Make sure your password is correct." });
        return;
      }
      const deleteResult = await UsersConnection.deleteUser(userClaim.email);
      var { error } = deleteResult;
      if (error) {
        res.status(500).json({ error });
        return;
      }
      res.json(deleteResult);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async save(req, res) {
    try {
      const userJwt = req.get("Authorization").slice("Bearer ".length);
      const userFromHeader = await User.decoded(userJwt);
      var { error } = userFromHeader;
      // if authentication token expired or wrong, login again
      if (error) {
        res.status(401).json({ error });
        return;
      }
      //Todo: update preference to existing list
      let jobs = userFromHeader.jobPreferences.push(req.body.jobPreferences);

      let houses = userFromHeader.housePreferances.push(
        req.body.housePreferances
      );
      await UsersConnection.updatePreferences(
        userFromHeader.email,
        jobs,
        houses
      );
      const userFromDB = await UsersConnection.getUser(userFromHeader.email);
      const updatedUser = new User(userFromDB);

      res.json({
        auth_token: updatedUser.encoded(),
        info: updatedUser.toJson(),
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = { User, UserController };
