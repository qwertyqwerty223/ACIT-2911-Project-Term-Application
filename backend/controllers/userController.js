const { retrieveAllUsersFromDB, retrieveOneUserFromDB, saveUserToDB, DeleteOneUserFromDB} = require('../services/databaseService/user')

const getAllUsers = async (req, res) => {
    try {
        const users = await retrieveAllUsersFromDB()
        return res.json(users)
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message":error.errors.message})
    }
}

const getUserById = async (req, res) => {
    try {
        // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const user = await retrieveOneUserFromDB(req)
        return res.json(user)
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message" : error.errors.message})
    }
}

const postOneUser = async (req, res) => {
    try {
         // Pass the req object to the retrieveOneUserFromDB, so we can access the user id via req.params.id
        const savedUser = await saveUserToDB(req)
        return res.json({"message": savedUser})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }   
}

const deleteOneUser = async (req, res) => {
    try {
        const deletedUser = await DeleteOneUserFromDB(req)
        return res.json({"message": deletedUser})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }
}

module.exports = { getAllUsers, getUserById, postOneUser, deleteOneUser }