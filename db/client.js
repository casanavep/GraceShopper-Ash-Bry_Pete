const { Client } = require("pg");
require("dotenv").config();

const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: "Abedith1990",
    database: "graceshopper",
    port: 3000,
  }
);

module.exports = client;
