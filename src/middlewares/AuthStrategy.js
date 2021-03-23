const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
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
          throw new Error("User does not exists");
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
          throw new Error("Invalid username or password");
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = await jwt.verify(token, process.env.JWT_KEY);
      const user = await User.findOne({ where: { id: payload.id } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
