const db = require("../database/connect");

const { v4: uuidv4 } = require("uuid");

class Session {
  constructor({ session_id, session_token, account_id }) {
    this.session_id = session_id;
    this.session_token = session_token;
    this.account_id = account_id;
  }

  static async create(account_id) {
    const token = uuidv4().substring(0, 20);

    const response = await db.query(
      "INSERT INTO user_session (account_id, session_token) VALUES ($1, $2) RETURNING *",
      [account_id, token]
    );
    return new Session(response.rows[0]);
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM user_session WHERE session_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate session");
    }
    return new Session(response.rows[0]);
  }

  static async getOneByAccountId(id) {
    const response = await db.query(
      "SELECT * FROM user_session WHERE account_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate session");
    }
    return new Session(response.rows[0]);
  }

  static async getOneBySessionToken(token) {
    const response = await db.query(
      "SELECT * FROM user_session WHERE session_token = $1",
      [token]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate session");
    }
    return new Session(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      "DELETE FROM user_sessions WHERE account_id = $1 RETURNING *",
      [this.account_id]
    );
    return new Session(response.rows[0]);
  }
}

module.exports = Session;
