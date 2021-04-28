class ViewController {
  static async register(req, res) {
    try {
      res.send("register page");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async login(req, res, next) {
    try {
      res.render("index");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async main(req, res, next) {
    try {
      res.send("main page");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
}

module.exports = { ViewController };