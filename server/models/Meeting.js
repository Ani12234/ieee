const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  forWhom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  }
}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);
