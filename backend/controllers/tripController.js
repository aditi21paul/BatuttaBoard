const Trip = require("../models/tripModel");
const mongoose = require("mongoose");

// get all trips
const getTrips = async (req, res) => {
  const trips = await Trip.find({}).sort({ createdAt: -1 });
  res.status(200).json(trips);
};

// get a single trip
const getTrip = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trip card" });
  }
  const trip = await Trip.findById(id);
  if (!trip) {
    return res.status(404).json({ error: "No such trip card" });
  }
  res.status(200).json(trip);
};

// create new trip cards
const createTripCard = async (req, res) => {
   const {source, destination, date, time, contactNumber, notes} = req.body;
  try {
    const tripCard = await Trip.create({source, destination, date, time, contactNumber, notes});
    res.status(200).json(tripCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit/update trip cards
const updateTripCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trip" });
  }

  const tripCard = await Trip.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!tripCard) {
    return res.status(404).json({ error: "No such trip" });
  }

  res.status(200).json(tripCard);
};

// delete trip cards
const deleteTripCard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trip" });
  }
  const tripCard = await Trip.findByIdAndDelete(id);
  if (!tripCard) {
    return res.status(404).json({ error: "No such trip" });
  }
  res.status(200).json(tripCard);
};

module.exports = {
  getTrips,
  getTrip,
  createTripCard,
  updateTripCard,
  deleteTripCard,
};