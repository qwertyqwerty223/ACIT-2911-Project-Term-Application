const express = require("express")
const router = express.Router()
const {getAllProjects, getOneProject, postOneProject, deleteOneProject} = require("../controllers/projectController")
const { setSession, promisifySession } = require('../middlewares/landing')

// Get all events
router.get("/", promisifySession, setSession, getAllProjects)

// Get event by id
router.get("/:tokenId", getOneProject)

// Save/post event to database
router.post("/create-project", postOneProject)

// update event
// router.put("/:id", updateOneEvent)

// // Delete event
router.delete("/:id", deleteOneProject)

module.exports = router