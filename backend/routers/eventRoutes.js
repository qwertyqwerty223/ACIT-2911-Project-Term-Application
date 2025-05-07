const express = require("express")
const router = express.Router()
const { getAllEvents, getEventById,  postOneEvent, deleteOneEvent} = require("../controllers/eventController")

// Get all events
router.get("/", getAllEvents)

// Get event by id
router.get("/:id", getEventById)

// Save/post event to database
router.post("/create-event", postOneEvent)

// update event
router.put("/update-event", (req, res) => {

})

// Delete event
router.delete("/:id", deleteOneEvent)

module.exports = router