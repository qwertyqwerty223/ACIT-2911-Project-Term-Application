const { Task } = require("../../models/taskModel")

const retrieveAllTasksFromDB = async () => {
    try {
        const tasks = await Task.find()
        return tasks
    } catch (error) {
        throw new Error(error.message)
    }
}

const retrieveOneTaskFromDB = async (req) => {
    try {
        const { id } = req.params
        // if you want to retrieve all tasks by the user use (User.findById(id).populate(tasks))
        const task = await Task.findById(id)
        return task
    } catch (error) {
        throw new Error(error.message)
    }
}

const saveTaskToDB = async (req) => {
    try {
        const newTask = new Task(req.body)
        await newTask.save()
        return "Task created successfully "
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateTaskToDB = async (req) => {
    try {
        const { id } = req.params
        const updatedTask = await Task.findByIdAndUpdate(id, req.body)
        console.log(updatedTask)
        return "Task updated successfully"
    } catch (error) {
        throw new Error(error.message)
    }
}

const DeleteOneTaskFromDB = async (req) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id);
        return "Event deleted successfully"
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = { retrieveAllTasksFromDB, retrieveOneTaskFromDB, saveTaskToDB, updateTaskToDB, DeleteOneTaskFromDB }