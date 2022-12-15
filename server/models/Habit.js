const db = require("../database/connect");

class Habit {
  constructor({
    habit_id,
    account_id,
    units,
    habit_name,
    frequency,
    time_period,
    streak,
    _date,
  }) {
    this.id = habit_id;
    this.account_id = account_id;
    this.units = units;
    this.name = habit_name;
    this.frequency = frequency;
    this.time_period = time_period;
    this.streak = streak;
    this.date = _date;
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
    const {
      account_id,
      habit_name,
      frequency,
      units,
      time_period,
      streak,
      _date,
    } = data;
    let response = await db.query(
      `INSERT INTO habits (account_id, habit_name, units, frequency, time_period, streak, _date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING habit_id;`,
      [account_id, habit_name, units, frequency, time_period, streak, _date]
    );
    const newId = response.rows[0].habit_id;
    const newHabit = await Habit.getOneById(newId);
    return newHabit;
  }

  static async update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          account_id,
          habit_name,
          frequency,
          units,
          time_period,
          streak,
          _date,
          habit_id,
        } = data;
        let test = await db.query(`SELECT * FROM habits WHERE habit_id = $1;`, [
          habit_id,
        ]);
        console.log(_date, test.rows[0].streak);
        if (_date == test.rows[0]._date) {
          resolve(test.rows[0]);
        } else {
          let result = await db.query(
            `UPDATE habits SET account_id = $1, habit_name = $2, units = $3, frequency = $4, time_period = $5, streak = $6, _date = $7 WHERE habit_id = $8 RETURNING *;`,
            [
              account_id,
              habit_name,
              units,
              frequency,
              time_period,
              streak,
              _date,
              habit_id,
            ]
          );
          resolve(result.rows[0]);
        }
      } catch (err) {
        console.log(err);
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
