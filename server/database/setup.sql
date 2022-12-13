DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS dates;

CREATE TABLE accounts (
    account_id serial PRIMARY KEY,
    username varchar(20) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL,
    dark_mode VARCHAR(7),
    avatar BYTEA
);

CREATE TABLE habits (
    habit_id serial PRIMARY KEY,
    account_id Int NOT NULL,
    habit_name varchar(255) NOT NULL,
    frequency INT NOT NULL,
    streak INT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE user_sessions (
    session_id INT GENERATED ALWAYS AS IDENTITY,
    session_token CHAR(20) NOT NULL,
    account_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE dates (
    date_id serial PRIMARY KEY,
    account_id INT NOT NULL,
    habits VARCHAR(255),
    date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);
