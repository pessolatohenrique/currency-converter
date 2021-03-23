"use strict";
const bcrypt = require("bcrypt");
const ROUND_BCRYPT = 12;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "pessolatohenrique",
          email: "pessolatohenrique@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "oseiasvieiralima",
          email: "oseiasvieiralima@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "vicente-nvt",
          email: "vicente-nvt@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "drianoaz",
          email: "drianoaz@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "paulobezerr",
          email: "paulobezerr@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "smagnotto",
          email: "smagnotto@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUND_BCRYPT
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
