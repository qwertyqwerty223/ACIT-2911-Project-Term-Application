const { retrieveAllTasksFromDB, retrieveOneTaskFromDB, saveTaskToDB, updateTaskToDB, DeleteOneTaskFromDB } = require('../services/databaseService/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await retrieveAllTasksFromDB()
        return res.json(tasks)
    } catch (error) {
        console.error(error)
        return res.status(500).json({"message": error.message})
    }
}

const getTaskById = async (req, res) => {
    try {
        // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const task = await retrieveOneTaskFromDB(req)
        return res.json(task)
    } catch (error) {
        console.error(error)
        return res.json({"message": error})
    }
}

const postOneTask = async (req, res) => {
    try {
         // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const savedTask = await saveTaskToDB(req)
        return res.status(201).json({"message": savedTask})
    } catch (error) {
        console.error(error)
        return res.status(500).json({"message": error})
    }   
}

const updateOneTask = async (req, res) => {
    try {
        const updatedTask = await updateTaskToDB(req)
        return res.status(200).json({ "message": updatedTask})
    } catch (error) {
        console.error(error)
        return res.status(500).json({"message": error})
    }
}

const deleteOneTask = async (req, res) => {
    try {
        const deletedTask = await DeleteOneTaskFromDB(req)
        return res.json({"message": deletedTask})
    } catch (error) {
        console.error(error)
        return res.json({"message": error})
    }
}

module.exports = { getAllTasks, getTaskById, postOneTask, updateOneTask, deleteOneTask }