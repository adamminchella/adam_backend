const bcrypt = require("bcrypt");

const User = require("../models/user");
const Session = require("../models/session");

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a set time cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    //   Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    //   Send the username and password off to make a new user
    const result = await User.create(data);

    //   Send it back
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    // Try and get that user
    // console.log(username, password);
    const user = await User.getOneByUsername(username);
    // Check if the password submitted is the correct one
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      // If password correct

      // Generate a session for user when they log in
      const newSession = await Session.create(user.id);
      res
        .status(200)
        .json({ authenticated: true, session: newSession.session_token });
    } else {
      // If password is incorrect
      throw new Error("Incorrect credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err });
  }
}

module.exports = { register, login };
