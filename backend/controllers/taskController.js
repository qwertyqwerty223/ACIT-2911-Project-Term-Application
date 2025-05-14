const { Task } = require("../models/taskModel")

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({tokenId: req.params.tokenId})
        return res.json(tasks)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message.message})
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        return res.json(task)
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }
}

const postOneTask = async (req, res) => {
    try {
        const newTask = new Task(req.body)
        const savedTask = await newTask.save()
        return res.status(201).json(savedTask)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }  
}

const updateOneTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({ "message": "Task updated successfuly"})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }
}

const deleteOneTask = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id); 
        return res.json({"message": "Event deleted successfully"})
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }
}

module.exports = { getAllTasks, getTaskById, postOneTask, updateOneTask, deleteOneTask }