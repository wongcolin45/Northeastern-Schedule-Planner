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
   
## Features to Add
### Frontend
- add navigation bar and pages for setting, and pages for setting (selecting concentration) and login
- fix issue with error message for prerequisite - fundies taken semester after fundies 2 should not satisfy error
- 
### Backend
- allow generate schedule button to pull from concentration courses
- add to database elective courses so user can satisfy nu path requirements
  - then allow to generate schedule to pull from these new courses
