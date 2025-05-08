const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const eventRoute = require("./routers/eventRoutes")
const userRoute = require("./routers/userRoutes")
const taskRoute = require("./routers/taskRoutes")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/events', eventRoute)
app.use('/users', userRoute)
app.use('/tasks', taskRoute)


module.exports = app
