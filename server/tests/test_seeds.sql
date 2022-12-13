TRUNCATE habits RESTART IDENTITY;

-- INSERT INTO accounts (username, user_password, dark_mode, avatar) VALUES ()

INSERT INTO habits (account_id, habit_name, frequency, streak) 
VALUES
(1, 'Water', 7, 0),
(1, 'Food', 5, 0);

