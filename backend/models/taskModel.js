const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    User: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = { Task }

