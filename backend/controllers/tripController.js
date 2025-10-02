const Trip = require("../models/tripModel");
const mongoose = require("mongoose");

const getTrips = async (req, res) => {
  const user_id = req.user._id;
  const trips = await Trip.find({ user: { $ne: user_id } }).sort({
    createdAt: -1,
  });
  res.status(200).json(trips);
};

const getMyTrips = async (req, res) => {
  const user_id = req.user._id;

  try {
    const myTrips = await Trip.find({ user: user_id }).sort({ createdAt: -1 });
    res.status(200).json(myTrips);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const createTripCard = async (req, res) => {
  const { source, destination, date, time, contactNumber, notes } = req.body;

  if (!source || !destination || !date || !time || !contactNumber) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  try {
    const user_id = req.user._id;
    const tripCard = await Trip.create({ user: user_id, source, destination, date, time, contactNumber, notes });
    res.status(201).json(tripCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTripCard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trip" });
  }

  const trip = await Trip.findById(id);
  if (!trip) {
    return res.status(404).json({ error: "No such trip card" });
  }

  if (trip.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "User not authorized" });
  }

  const updatedTripCard = await Trip.findByIdAndUpdate(id, { ...req.body }, { new: true });
  res.status(200).json(updatedTripCard);
};

const deleteTripCard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such trip" });
  }

  const trip = await Trip.findById(id);
  if (!trip) {
    return res.status(404).json({ error: "No such trip card" });
  }

  if (trip.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "User not authorized" });
  }

  await trip.deleteOne();
  res.status(200).json({ message: "Trip card deleted successfully." });
};

module.exports = {
  getTrips,
  getTrip,
  getMyTrips,
  createTripCard,
  updateTripCard,
  deleteTripCard,
};