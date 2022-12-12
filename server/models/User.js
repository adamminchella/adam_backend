const db = require('../database/connect');

class User {

    constructor({ account_id, username, user_password }) {
        this.id = account_id;
        this.username = username;
        this.password = user_password;
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM accounts WHERE account_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate account.")
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM accounts WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate account.")
        }
        return new User(response.rows[0]);
    }

    static async habits (account_id){
        const response = await db.query(`SELECT habits.*
                                             FROM habits INNER JOIN accounts 
                                                ON accounts.account_id = habits.account_id 
                                                WHERE habits.account_id = $1`, [account_id]);
        if (response.rows.length < 1){
            throw new Error("No habits found for this account.")
        }
        return response.rows.map(p => new Habit(p));

    }

    static async create(data) {
        const { username, password } = data;
        let response = await db.query("INSERT INTO accounts (username, user_password) VALUES ($1, $2) RETURNING account_id;",
            [username, password]);
        const newId = response.rows[0].account_id;
        const newAccount = await User.getOneById(newId);
        return newAccount;
    }

}

module.exports = User;