const db = require("../database/connect");
const Habit = require("./Habit");
const Date = require("./Date");

class User {
  constructor({ account_id, username, user_password, dark_mode, avatar }) {
    this.id = account_id;
    this.username = username;
    this.password = user_password;
    this.dark_mode = dark_mode;
    this.avatar = avatar;
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM accounts WHERE account_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate account.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query(
      "SELECT * FROM accounts WHERE username = $1",
      [username]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate account.");
    }
    return new User(response.rows[0]);
  }

  static async habits(account_id) {
    const response = await db.query(
      `SELECT habits.*
                                             FROM habits INNER JOIN accounts 
                                                ON accounts.account_id = habits.account_id 
                                                WHERE accounts.account_id = $1`,
      [account_id]
    );
    // if (response.rows.length < 1) {
    //   throw new Error("No habits found for this account.");
    // }
    return response.rows.map((p) => new Habit(p));
  }

  static async dates(account_id) {
    const response = await db.query(
      `SELECT dates.*
                                             FROM dates INNER JOIN accounts 
                                                ON accounts.account_id = dates.account_id 
                                                WHERE accounts.account_id = $1`,
      [account_id]
    );
    // if (response.rows.length < 1) {
    //   throw new Error("No dates found for this account.");
    // }
    return response.rows.map((p) => new Date(p));
  }

  static async create(data) {
    const { username, password, dark_mode, avatar } = data;
    let response = await db.query(
      "INSERT INTO accounts (username, user_password, dark_mode, avatar) VALUES ($1, $2, $3, $4) RETURNING account_id;",
      [username, password, dark_mode, avatar]
    );
    const newId = response.rows[0].account_id;
    const newAccount = await User.getOneById(newId);
    return newAccount;
  }

  async destroy() {
    let habitResponse = await db.query(
      "DELETE FROM habits WHERE account_id = $1 RETURNING *;",
      [this.id]
    );
    let sessionResponse = await db.query(
      "DELETE FROM user_sessions WHERE account_id = $1 RETURNING *;",
      [this.id]
    );
    let dateResponse = await db.query(
      "DELETE FROM dates WHERE account_id = $1 RETURNING *;",
      [this.id]
    );
    let accountResponse = await db.query(
      "DELETE FROM accounts WHERE account_id = $1 RETURNING *;",
      [this.id]
    );
    return new User(accountResponse.rows[0]);
  }

  static async update(newUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, username, password, dark_mode, avatar } = newUser;
        console.log(id);
        console.log(username);
        console.log(password);
        console.log(dark_mode);
        console.log(avatar.length);
        let result = await db.query(
          `UPDATE accounts SET 
                              username = $1, user_password = $2, dark_mode = $3, avatar = $4 
                              WHERE account_id = $5 RETURNING *;`,
          [username, password, dark_mode, avatar, id]
        );
        resolve(result.rows[0]);
      } catch (err) {
        reject("User could not be updated");
      }
    });
  }
}

module.exports = User;
