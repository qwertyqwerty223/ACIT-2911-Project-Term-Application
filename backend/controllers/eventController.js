const { retrieveAllEventsFromDB, retrieveOneEventFromDB, saveEventToDB, DeleteOneEventFromDB } = require("../services/databaseService/event")

const getAllEvents = async (req, res) => {
    // Call retrieveAllEventsFromDB to get all events from the db
    try {
        const events = await retrieveAllEventsFromDB()
        return res.json({events})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }
}

const getEventById = async (req, res) => {
    try {
        // call retrieveOneEventFromDB to get event by id
        const event = await retrieveOneEventFromDB(req)
        return res.json(event)
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }
}

const postOneEvent = async (req, res) => {
    try {
        // Get req body and parse to saveEventToDB
        const savedEvent = await saveEventToDB(req)
        return res.json({"message": savedEvent})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }   
}

const deleteOneEvent = async (req, res) => {
    try {
        const deletedEvent = await DeleteOneEventFromDB(req)
        return res.json({"message": deletedEvent})
    } catch (error) {
        console.error(error.errors.message)
        return res.json({"message": error.errors.message})
    }
}

module.exports = {getAllEvents, getEventById, postOneEvent, deleteOneEvent}