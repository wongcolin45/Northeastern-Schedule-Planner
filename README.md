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
- generate schedule button lagging - sometimes need to press multiple times before schedule appears
- nu path button in selection bar does not rerender when new changes are made to schedule, fulfilling some nu path requirements
- logic for requirements is faulty - getting course left to complete work but not for concentration requirements where it courses not taken before
  - currently courses taken before will meet concentration requirements when they should not
  - need to make it check that the courses taken that are not 'already taken' elsewhere
  - only applies to some concentration requirements

### Possible New Features
- User login - save schedules
- hosting express backend, most likely need to move over to Postgre - sqlite causing issues with hosting :(
