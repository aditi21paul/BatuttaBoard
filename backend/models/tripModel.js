const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the Trip schema
const tripSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Travellers",
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trips", tripSchema);
