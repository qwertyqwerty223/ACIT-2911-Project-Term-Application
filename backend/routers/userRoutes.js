const express = require("express")
const { getAllUsers, getUserById, postOneUser, deleteOneUser } = require("../controllers/userController")
const router = express.Router()

// Get all users
router.get("/", getAllUsers)

// Get one user
router.get("/:id", getUserById)

// Save/post user to DB
router.post("/create-user", postOneUser)

router.delete("/:id", deleteOneUser)

module.exports = router