# Mod-4-AirBnB-Project

This is my clone for AirBnB call "Atmosphere Breakfast N Bed"

The project spanned over about a month and a half to 2 months. I learned how to make the backend first with Sqlite and than made that in a week.
Next I learned how to make the frontend with React and Redux and worked on 2 features for my clone (Spots, and Reviews).
This clone is a work in progress as there are still many features needing to be added at the time of creating this README. (11/20/2022)

List of Technologies Used

(Backend)
* Express
* Dotenv
* Sequelize
* Morgan
* Jsonwebtoken
* Csurf
* Express-async-errors
* Express-validator
* Sqlite3
* Nodemon
* Cors

(Frontend)
* Js-cookie
* React
* React-Redux
* React-Router-Dom
* Redux-Thunk

SHOWCASE
![PreviewImageOfAtmosphereBnB](https://user-images.githubusercontent.com/108757380/202964396-57d3a7ec-5507-42ec-8327-42cf183fc44f.png)
![PreviewImageOfAtmosphereBnBSpotShowCase](https://user-images.githubusercontent.com/108757380/202964481-b08905ba-ade5-424b-b623-a3d326d05e0c.png)


To Launch Full Application Locally.

*1st: Clone Repo Into Desired Folder

*2nd: npm install In The Root Directory

*3rd: In The Backend Folder, Add A .env File And Inside Of It Add
  PORT=8000
  DB_FILE=db/dev.db
  JWT_SECRET=«generate_strong_secret_here»
  JWT_EXPIRES_IN=604800

*4th: cd Into The Backend Folder And In The Terminal Run
*5th npx dotenv sequelize-cli db:migrate
*6th npx dotenv sequelize-cli db:seed:all
    
*7th: While Still In Your Backend Folder: npm start In The Terminal

*8th: Once Loaded, Create A New Terminal With The Root Folder Loaded

*9th: In The New Terminal, cd Into The Frontend and npm start

*10th: If Site Doesn't Automatically Open, In Your Browser Go To http://localhost:3000
