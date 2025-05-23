const { Event } = require("../models/eventModel")

const getAllEvents = async (req, res) => {
    // Call retrieveAllEventsFromDB to get all events from the db
    try {
        const events = await Event.find({tokenId: req.params.tokenId})
        return res.status(200).json({events})
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }
}

const getEventById = async (req, res) => {
    try {
        const {id} = req.params
        const event = await Event.findById(id)
        return res.status(200).json(event)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({"message": error.message})
    }
}

const postOneEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body)
        const event = await newEvent.save()
        return res.status(201).json(event)
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }   
}
   
const updateOneEvent = async (req, res) => {
    try {
        const itemsToUpdate = () => {
            let updateObj = {}
            if(req.body.title) updateObj.title = req.body.title 
            if(req.body.description) updateObj.description = req.body.description
            if(req.body.date) updateObj.date = req.body.date
            if(req.body.tokenId) updateObj.tokenId = req.body.tokenId
            return updateObj
        }
        console.log(req.body)
        await Event.findByIdAndUpdate(req.params.id, itemsToUpdate())
        return res.json({ "message": "Event updated successfully"})
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }
}

const deleteOneEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        return res.json({"message": "Event deleted successfully"})
    } catch (error) {
        console.error(error.message)
        return res.json({"message": error.message})
    }
}

module.exports = {getAllEvents, getEventById, postOneEvent, updateOneEvent ,deleteOneEvent}