const path = require("path");

const conf = {
  collection: "schemaMigrations",
  directory: "mongodb-migrations"
};

if (process.env.MONGODB_URI) {
  conf.url = process.env.MONGODB_URI;
} else {
  conf.host = process.env.MONGO_HOST;
  conf.port = process.env.MONGO_PORT;
  conf.db = process.env.MONGO_DATABASE;
}

module.exports = conf;
