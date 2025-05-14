const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventRoute = require("./routers/eventRoutes")
const taskRoute = require("./routers/taskRoutes")


app.use('/events', eventRoute)
app.use('/tasks', taskRoute)


module.exports = app
