const { Router } = require("express");
const UserController = require("../controllers/UserController");
const { AuthMiddleware } = require("../middlewares");

const router = Router();

router.route("/user").get(UserController.index);
router.route("/user/login").post(AuthMiddleware.local, UserController.login);

module.exports = router;
