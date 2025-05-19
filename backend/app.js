const express = require("express");
const cors = require('cors');

const app = express();

const corsOptions ={
    origin:[
    'http://localhost:5173',
    'https://projecttracker-frontend.onrender.com'
    ], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const eventRoute = require("./routers/eventRoutes")
const taskRoute = require("./routers/taskRoutes")


app.use('/events', eventRoute)
app.use('/tasks', taskRoute)


module.exports = app
