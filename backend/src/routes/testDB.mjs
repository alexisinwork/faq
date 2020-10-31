import express from "express"
import mongoose from "mongoose"

const router = express.Router()
// Variable to be sent to Frontend with Database status
let databaseConnection = "Waiting for Database response..."
// Access to the database connection information
router.get("/", function(req, res, next) {
    res.send(databaseConnection)
})
// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error)
    databaseConnection = "Error connecting to Database"
})
// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!")
    databaseConnection = "Connected to Database"
})

export default router