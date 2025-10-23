const express = require("express");
const {
    getAllTrips,
    getTrips,
    getTrip,
    getMyTrips,
    createTripCard,
    updateTripCard,
    deleteTripCard,
} = require("../controllers/tripController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// It ensures a user must be logged in to access any of these endpoints.
router.use(requireAuth);

// GET all Trips (for admin only)
router.get("/admin/all", getAllTrips);

// GET other user's Trips
router.get("/", getTrips);

// GET a single Trip by ID
router.get("/:id", getTrip);

// GET Trips made by the user
router.get("/user/me", getMyTrips);

// POST a new Trip Card
router.post("/", createTripCard);

// Edit a Trip Card by ID
router.patch("/:id", updateTripCard);

// DELETE a Trip Card by ID
router.delete("/:id", deleteTripCard);

module.exports = router;