const express = require("express")
const router = express.Router()
const { getAllEvents, getEventById,  postOneEvent, updateOneEvent ,deleteOneEvent} = require("../controllers/eventController")

// Get all events
router.get("/:tokenId", getAllEvents)

// Get event by id
router.get("/:id", getEventById)

// Save/post event to database
router.post("/create-event", postOneEvent)

// update event
router.patch("/:id", updateOneEvent)

// Delete event
router.delete("/:id", deleteOneEvent)

module.exports = router