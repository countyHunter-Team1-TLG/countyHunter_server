class ViewController {
  static async register(req, res) {
    try {
      res.render("register");
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  static async login(req, res, next) {
    try {
      res.render("login");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async main(req, res, next) {
    try {
      res.render("index");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async houseFinder(req, res, next) {
    try {
      res.render("house-finder.ejs");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
  static async jobFinder(req, res, next) {
    try {
      res.render("job-finder");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
  static async favorites(req, res, next) {
    try {
      res.render("favorites");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
  static async mission(req, res, next) {
    try {
      res.render("mission");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
  static async aboutUs(req, res, next) {
    try {
      res.render("about-us");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }

  static async udpates(req, res, next) {
    try {
      res.render("updates");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
  static async jobDetails(req, res, next) {
    try {
      res.render("job-details");
    } catch (e) {
      res.status(400).json({ error: e });
      return;
    }
  }
}

module.exports = { ViewController };
