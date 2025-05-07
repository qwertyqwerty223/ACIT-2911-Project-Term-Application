const { Task } = require("../../models/taskModel")

const retrieveAllTasksFromDB = async () => {
    try {
        const tasks = await Task.find()
        if (!tasks) throw new Error("No documents found")
        return tasks
    } catch (error) {
        return error.errors.message
    }
}

const retrieveOneTaskFromDB = async (req) => {
    try {
        const { id } = req.params
        // if you want to retrieve all tasks by the user use (User.findById(id).populate(tasks))
        const task = await Task.findById(id)
        if (!task) throw new Error("No document with that id found")
        return task
    } catch (error) {
        return error.errors.message
    }
}

const saveTaskToDB = async (req) => {
    try {
        const newTask = new Task(req.body)
        await newTask.save()
        return "User created successfully "
    } catch (error) {
        return error.errors.message
    }
}

const DeleteOneTaskFromDB = async (req) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id);
        return "Event deleted successfully"
    } catch (error) {
        return error.errors.message
    }
}


module.exports = { retrieveAllTasksFromDB, retrieveOneTaskFromDB, saveTaskToDB, DeleteOneTaskFromDB }