const { retrieveAllTasksFromDB, retrieveOneTaskFromDB, saveTaskToDB, DeleteOneTaskFromDB } = require('../services/databaseService/task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await retrieveAllTasksFromDB()
        return res.json(tasks)
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message":error.errors.message})
    }
}

const getTaskById = async (req, res) => {
    try {
        // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const task = await retrieveOneTaskFromDB(req)
        return res.json(task)
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message" : error.errors.message})
    }
}

const postOneTask = async (req, res) => {
    try {
         // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const savedTask = await saveTaskToDB(req)
        return res.json({"message": savedTask})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }   
}

const deleteOneTask = async (req, res) => {
    try {
        const deletedTask = await DeleteOneEventFromDB(req)
        return res.json({"message": deletedTask})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }
}

module.exports = { getAllTasks, getTaskById, postOneTask, deleteOneTask }