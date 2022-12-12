DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS user_sessions;
-- DROP TABLE IF EXISTS calendar;

CREATE TABLE habits (
    habit_id serial PRIMARY KEY,
    habit_name varchar(30) NOT NULL,
    frequency INT NOT NULL,
    streak INT NOT NULL
);

CREATE TABLE accounts (
    account_id serial PRIMARY KEY,
    username varchar(20) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL
);

CREATE TABLE user_sessions (
    session_id INT GENERATED ALWAYS AS IDENTITY,
    session_token CHAR(20) NOT NULL,
    account_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (session_id),
    FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- CREATE TABLE calendar (
--     calendar_id serial PRIMARY KEY,

-- )