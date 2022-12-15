# ADAM_BackEnd
    
:apple: :apple: :apple:

Active Day, Active Mind is a habit tracking website aimed at helping users maintain healthy habits. Users are able to track a maximum of 5 habits and can create thier own personalised habits.

This repo contains the server files for the website.

## Motivation :muscle:

This project is part of the futureproof curriculum for LAP 2 project. We were tasked with the creation of a habit tracking website. 
                                                                               
## Installation and Usage 

### Installation :inbox_tray: 

Note: You can find the repository for the user interface [here](https://github.com/mizupp/ADAM_FrontEnd).

- Clone or download the repository.
- Open the terminal
  - Run `npm install` to install dependencies.
  - Run `npm run setup-db` to set up the database.

### Usage :open_file_folder:

- Open the terminal 
    - Run `npm start` to launch server.
    - Run `npm test` to launch test suite.
    - Run `npm run coverage` to create coverage report.


## Technologies :desktop_computer:

- [npm](https://www.npmjs.com/)
- [express](https://www.npmjs.com/package/express)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [cors](https://www.npmjs.com/package/cors)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [bycrpt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [pg](https://www.npmjs.com/package/pg)
- [uuid](https://www.npmjs.com/package/uuid)
- Testing: [Jest](https://www.npmjs.com/package/jest) and [Supertest](https://www.npmjs.com/package/supertest)
- Deployment: ???


## Process :bar_chart:

- Started with a day planning, using tools such as Figma and creating todo tasks in a Trello board.
- Split up work into backend and frontend:
  - Frontend was split up into the different webpages.
- Once server was working, testing was done.
- Connected up frontend and backend.
- Worked together to fix any bugs and finalise small featues.
- Deployed website.

## Testing

Testing was ran using Jest and Supertest.

![Test ran](./images/tests.png)

A coverage of 88% was achieved.


## Challeges and Wins

### Challenges :no_entry:

#### Streaks :cut_of_meat:

The implimentation of the streaks was a challenge on a couple of levels as well as on both the fontend and backend.

We first had to find a way of implimenting a count on top of the streak value which was already in the database and displaying it when the "completed task" button was clicked. 
This was relatively easily acheived, however ensuring that the streak could only increment by one, once a day involved using a timestamp. 
When a user clicks the "completed task" button, the timestamp of the that click will be compared to the timestamp of the previous click.
Then, only if the timestamp of the previous is the previous date or before, will the streak count increment by one.
The website will also check if the last click was over a day ago and if so, it will start the count back to 1.


### Wins :trophy:

Avatar 


## Bugs :bug:

None so far :crossed_fingers:

## Future Features :timer_clock: 

### Progress displays

Currently, progress on the habits is dislpayed by a streak giivng the number of days ina row a habit has been completed.

- Progress bar would allow users to see thier progess is a more visual way.


## Contributors 

[adamminchella](https://github.com/adamminchella) :man_technologist:
[mizupp](https://github.com/mizupp) :woman_technologist:
[PollyFenne](https://github.com/PollyFenne) :woman_technologist:
[Adam-Dowsett](https://github.com/Adam-Dowsett) :man_technologist: