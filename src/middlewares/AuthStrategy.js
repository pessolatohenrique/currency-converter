const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            [Op.or]: [{ name: email }, { email }],
          },
        });

        if (!user) {
          done("User not found", null);
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          done("Invalid username or password", null);
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
