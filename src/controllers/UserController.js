const jwt = require("jsonwebtoken");

class UserController {
  static async createToken(user) {
    const payload = {
      id: user.id,
    };

    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "50m" });
  }

  static async index(req, res) {
    return res.status(200).json({ message: "everything is ok" });
  }

  static async login(req, res) {
    const token = await UserController.createToken(req.user);
    res.set({ Authorization: token });
    return res.send(204);
  }
}

module.exports = UserController;
