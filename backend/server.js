const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const eventRoute = require("./routers/eventRoutes")
const userRoute = require("./routers/userRoutes")
const taskRoute = require("./routers/taskRoutes")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/events', eventRoute)
app.use('/users', userRoute)
app.use('/tasks', taskRoute)

app.get('/', (req, res) => {
    res.json({"message": "loaded"})
})


const PORT = 3000;
const startServer = async()=>{
    try {
        await mongoose.connect("mongodb+srv://jerryolisa:4nMlhci1yQZTepqF@cluster0.k0wjqhd.mongodb.net/acit2911?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB is working")
        app.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT}`)
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer();