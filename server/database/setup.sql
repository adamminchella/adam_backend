DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS dates;
DROP TABLE IF EXISTS accounts;

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

INSERT INTO accounts (username, user_password, dark_mode, avatar) VALUES ("mildred", "Qu!7NZPTfpbcbRDfy&Nkk)SfGh$#I)^zb7mjHKJ#8!)AetmYqFtV2%cd@N7(", "yes", "" );
INSERT INTO habits (account_id, habit_name, frequency, streak) VALUES (1, "water", 4, 4);
INSERT INTO habits (account_id, habit_name, frequency, streak) VALUES (1, "sad", 4, 4);
INSERT INTO habits (account_id, habit_name, frequency, streak) VALUES (1, "happy", 4, 4);