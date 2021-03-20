const passport = require("passport");

//passport.authenticate("local", { session: false })
class AuthMiddleware {
  static async local(req, res, next) {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(401).json({ message: error });
      }

      if (!user) {
        return res.status(400).json({ message: "User does not exists" });
      }

      req.user = user;
      return next();
    })(req, res, next);
  }

  static async bearer(req, res, next) {
    passport.authenticate("bearer", { session: false }, (error, user, info) => {
      if (error) {
        return res.status(401).json({ message: error });
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}

module.exports = AuthMiddleware;
