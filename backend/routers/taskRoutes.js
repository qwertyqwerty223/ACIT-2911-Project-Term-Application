const express = require("express")
const { getAllTasks, getTaskById, postOneTask, updateOneTask ,deleteOneTask} = require("../controllers/taskController")
const router = express.Router()

// Get all users
router.get("/", getAllTasks)

// Get one user
router.get("/:id", getTaskById)

// Save/post user to DB
router.post("/create-task", postOneTask)

// Update Task
router.put("/:id", updateOneTask)

// Delete task
router.delete("/:id", deleteOneTask)

module.exports = router