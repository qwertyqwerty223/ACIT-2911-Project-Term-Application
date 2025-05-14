const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
    },
});


const Project = mongoose.model("Project", ProjectSchema)

module.exports = { Project }