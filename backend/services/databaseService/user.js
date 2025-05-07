const { User } = require("../../models/userModel")

const retrieveAllUsersFromDB = async () => {
    try {
        const users = await User.find()
        if (!users) throw new Error("No documents found")
        return users
    } catch (error) {
        return error.errors.message
    }
}

const retrieveOneUserFromDB = async (req) => {
    try {
        const { id } = req.params
        // if you want to retrieve all tasks by the user use (User.findById(id).populate(tasks))
        const user = await User.findById(id)
        if (!user) throw new Error("No document with that id found")
        return user
    } catch (error) {
        return error.errors.message
    }
}

const saveUserToDB = async (req) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        return "User created successfully "
    } catch (error) {
        return error.errors.message
    }
}

const DeleteOneUserFromDB = async (req) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id);
        return "User deleted successfully"
    } catch (error) {
        return error.errors.message
    }
}

module.exports = { retrieveAllUsersFromDB, retrieveOneUserFromDB, saveUserToDB, DeleteOneUserFromDB }