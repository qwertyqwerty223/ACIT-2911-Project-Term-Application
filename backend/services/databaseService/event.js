const { Event } = require("../../models/eventModel")

const retrieveAllEventsFromDB = async () => {
    try {
        const events = await Event.find()
        if (!events) throw new Error("No documents found ")
        return events
    } catch (error) {
        return error.errors.message
    }
}

const retrieveOneEventFromDB = async (req) => {
    try {
        const {id} = req.params
        const event = await Event.findById(id)
        if (!event) throw new Error("No document found with that Id")
        return event
    } catch (error) {
        return error.errors.message
    }
}

const saveEventToDB = async (req) => {
    try {
        const newEvent = new Event(req.body)
        const event = await newEvent.save()
        return "Event saved successfully"
    } catch (error) {
        return error.errors.message
    }
    
}

const DeleteOneEventFromDB = async (req) => {
    try {
        const { id } = req.params
        await Event.findByIdAndDelete(id);
        return "Event deleted successfully"
    } catch (error) {
        return error.errors.message
    }
}

module.exports = { retrieveAllEventsFromDB, retrieveOneEventFromDB, saveEventToDB, DeleteOneEventFromDB }