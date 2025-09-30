const express = require("express");
const {
    getTrips,
    getTrip,
    createTripCard,
    updateTripCard,
    deleteTripCard,
} = require("../controllers/tripController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// It ensures a user must be logged in to access any of these endpoints.
router.use(requireAuth);

// GET all Trips
router.get("/", getTrips);

// GET a single Trip by ID
router.get("/:id", getTrip);

// POST a new Trip Card
router.post("/", createTripCard);

// Edit a Trip Card by ID
router.patch("/:id", updateTripCard);

// DELETE a Trip Card by ID
router.delete("/:id", deleteTripCard);

module.exports = router;