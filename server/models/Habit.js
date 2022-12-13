const db = require("../database/connect");

class Habit {
  constructor({ habit_id, account_id, habit_name, frequency, streak }) {
    this.id = habit_id;
    this.account_id = account_id;
    this.name = habit_name;
    this.frequency = frequency;
    this.streak = streak;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM habits");
    return response.rows.map((p) => new Habit(p));
  }

  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM habits WHERE habit_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate habit.");
    }
    return new Habit(response.rows[0]);
  }

  static async create(data) {
    const { account_id, habit_name, frequency, streak } = data;
    let response = await db.query(
      `INSERT INTO habits (account_id, habit_name, frequency, streak) 
                                        VALUES ($1, $2, $3, $4) RETURNING habit_id;`,
      [account_id, habit_name, frequency, streak]
    );
    const newId = response.rows[0].habit_id;
    const newHabit = await Habit.getOneById(newId);
    return newHabit;
  }

  static async update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const { account_id, habit_name, frequency, streak } = data;
        let result = await db.query(
          `UPDATE habits SET habit_name = $1, frequency = $2, streak = $3 WHERE account_id = $4 RETURNING *;`,
          [habit_name, frequency, streak, account_id]
        );
        resolve(result.rows[0]);
      } catch (err) {
        reject("Habit could not be updated");
      }
    });
  }

  async destroy() {
    let response = await db.query(
      "DELETE FROM habits WHERE habit_id = $1 RETURNING *;",
      [this.id]
    );
    return new Habit(response.rows[0]);
  }
}

module.exports = Habit;
