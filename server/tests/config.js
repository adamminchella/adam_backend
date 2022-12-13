const fs = require("fs");
const { Pool } = require("pg");

const testSeed = fs.readFileSync(__dirname + "/test_seeds.sql").toString();

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = new Pool({
        connectionString:
          "postgres://oowixedk:wutbd0jayCj4e8KXRIKtv78nTRhybJus@tai.db.elephantsql.com/oowixedk",
      });
      await db.query(testSeed);
      console.log("hi");
      resolve("Test DB reset");
    } catch (err) {
      console.log(err);
      reject(`Test DB could not be reset: ${err} in ${err.file}`);
    }
  });
};

module.exports = resetTestDB;
