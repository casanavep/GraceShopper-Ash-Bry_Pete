const { Client } = require("pg");

const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: process.env.PASSWORD,
    database: "graceshopper",
    port: 3000,
  }
);

module.exports = client;
