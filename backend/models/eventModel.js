const mongoose = require("mongoose")


const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

const Event = mongoose.model("Event", EventSchema)

module.exports = { Event }