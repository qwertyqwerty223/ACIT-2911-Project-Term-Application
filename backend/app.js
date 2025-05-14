const express = require("express");
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();


const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
store: new FileStore({ path: './sessions' }),
  secret: 'supersecretkey',        // Used to sign session ID cookies
  resave: false,                   
  saveUninitialized: true,        
  cookie: {
    secure: false,                
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days 
  }
}));

const eventRoute = require("./routers/eventRoutes")
const taskRoute = require("./routers/taskRoutes")
const projectRoute = require("./routers/projectRoutes")


app.use('/events', eventRoute)
app.use('/tasks', taskRoute)
app.use('/projects', projectRoute)



module.exports = app
