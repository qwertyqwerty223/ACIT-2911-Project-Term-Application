const { Event } = require("../../models/eventModel")

const retrieveAllEventsFromDB = async () => {
    try {
        const events = await Event.find()
        if (!events) throw new Error("No documents found ")
        return events
    } catch (error) {
        throw new Error(error.message)
    }
}

const retrieveOneEventFromDB = async (req) => {
    try {
        const {id} = req.params
        const event = await Event.findById(id)
        if (!event) throw new Error("No document found with that Id")
        return event
    } catch (error) {
        throw new Error(error.message)
    }
}

const saveEventToDB = async (req) => {
    try {
        const newEvent = new Event(req.body)
        const event = await newEvent.save()
        return "Event saved successfully"
    } catch (error) {
        throw new Error(error.message)
    }
    
}

const updateEventToDB = async (req) => {
    try {
        const { id } = req.params
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body)

        if(!updatedEvent) return ("No document with provided Id")

        return "Event updated successfully"
    } catch (error) {
        // console.log(error)
        throw new Error(error.message || "No document with provided Id")
    }
}

const DeleteOneEventFromDB = async (req) => {
    try {
        const { id } = req.params
        await Event.findByIdAndDelete(id);
        return "Event deleted successfully"
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { retrieveAllEventsFromDB, retrieveOneEventFromDB, saveEventToDB, updateEventToDB, DeleteOneEventFromDB }