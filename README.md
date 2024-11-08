# Northeastern Schedule Planner

## Introduction
The **Northeastern Schedule Planner** is a web application designed to help students manage their schedules effectively. The application allows users to view, create, and modify their class schedules, providing an intuitive interface and helpful features to keep track of their courses and commitments.

## Features
- Create, view, and edit class schedules
- Easy navigation and user-friendly interface
- Course requirement split up into readable section

## Technologies Used
- **Frontend:** React, CSS
- **Backend:** Express.js
- **Database:** SQLite with Sequelize ORM

## Installation
To get started with the Northeastern Schedule Planner, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/wongcolin45/northeastern-schedule-planner.git
2. npm install in react-app
3. probably need to install stuff in server too, I will look into that soon
   
## Bugs
### Frontend
- AP US History not filling interpreting culture nu requirements.
- Missing prerequisite does work but not layers deep
  - ex OOD fulfilled by Fundamentals 2 even though Fundamentals 1 not taken. OOD would have no warning, and Fundamentals 2 would have a warning.
- logic for requirements is faulty - getting course left to complete work but not for concentration requirements where it courses not taken before
  - currently courses taken before will meet concentration requirements when they should not
  - need to make it check that the courses taken that are not 'already taken' elsewhere
  - only applies to some concentration requirements
- Fix the Schedule Object, every function that changes state should return new instance of the schedule object
  - possibly use multiple classes?
  - move to schedule object to backend ?
  - split up nu path object into its own useState hook instead of storing in schedule?

### Possible New Features
- User login - save schedules
- hosting express backend, most likely need to move over to Postgre - sqlite causing issues with hosting :(
