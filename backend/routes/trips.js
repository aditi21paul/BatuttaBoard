const express = require("express");
const {
    getTrips,
    getTrip,
    createTripCard,
    updateTripCard,
    deleteTripCard,
} = require("../controllers/tripController");

const router = express.Router();

// GET all Trips
router.get("/", getTrips);

// GET a single Trip by ID
router.get("/:id", getTrip);

// POST a new Trip Card
router.post("/", createTripCard);

// Edit a Trip Card
// FIX: Changed from router.patch("/") to router.patch("/:id")
router.patch("/:id", updateTripCard); 

// DELETE a Trip Card by ID
router.delete("/:id", deleteTripCard);

// Export the router
module.exports = router;