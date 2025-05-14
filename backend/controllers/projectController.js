
const { Project } = require('../models/projectModel')
const { v4: uuidv4 } = require('uuid');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({sessionId: req.session.stateId})
        res.json(projects)
    } catch (error) {
        console.error(error.message)
        res.json({"message": error.message})
    }
}

const getOneProject = async (req, res) => {
    try {
        const project = await Project.findOne({tokenId: req.params.tokenId})
        res.json(project)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }
}

const postOneProject = async (req, res) => {
    try {
        console.log(req.session.stateId)
        const { name } = req.body
        
        const newProject = new Project({name:name, sessionId: req.session.stateId, tokenId: uuidv4()})
        newProject.save()
        const projects = await Project.find({sessionId: req.session.stateId})
        res.json(projects)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }
}

const deleteOneProject = async (req, res) => {
    try {
        const { id } = req.params
        await Project.findByIdAndDelete(id); 
        return res.json({"message": "Project deleted successfully"})
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }
}



module.exports = {getAllProjects, getOneProject, postOneProject, deleteOneProject}