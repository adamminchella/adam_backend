DROP TABLE IF EXISTS habits CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS dates CASCADE;

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

INSERT INTO accounts (username, user_password, dark_mode, avatar) VALUES
('adam', 'password', 'default', 'avatar'),
('peter', 'password1', 'dark', 'avatar');

INSERT INTO dates (account_id, habits, date) VALUES
(1, 'these habits', '2004-10-19 10:23:54');

INSERT INTO habits (account_id, habit_name, frequency, streak) 
VALUES
(1, 'Water', 7, 0),
(1, 'Food', 5, 0);

