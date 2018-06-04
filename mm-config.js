const path = require("path");

const conf = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  db: process.env.MONGO_DATABASE,
  collection: "schemaMigrations",
  directory: "mongodb-migrations"
};

module.exports = conf;
