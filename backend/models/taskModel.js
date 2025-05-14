const { request } = require("express")
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        required: true
    },
    user: { 
        type: [ String ], 
        required: false,
        default: []
    }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = { Task }

