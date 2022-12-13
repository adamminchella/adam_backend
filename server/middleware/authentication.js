const Session = require("../models/Session");

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers["authorization"];
    if (userToken == "null") {
      throw new Error("Missing token");
    } else {
      const validToken = await Session.getOneBySessionToken(userToken);
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid credentials" });
  }
}

module.exports = authenticator;
