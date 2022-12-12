const { Pool } = require("pg");

const db = new Pool({
  connectionString:
    "postgres://oowixedk:wutbd0jayCj4e8KXRIKtv78nTRhybJus@tai.db.elephantsql.com/oowixedk",
});

console.log("DB connection established.");

module.exports = db;
