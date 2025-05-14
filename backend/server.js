const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const app = require("./app")

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