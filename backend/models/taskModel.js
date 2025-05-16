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
    },
    tokenId: {
        type: String,
        required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
})

const Task = mongoose.model("Task", TaskSchema)

module.exports = { Task }

