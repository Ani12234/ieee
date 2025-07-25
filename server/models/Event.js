const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    date: String, 
    time: String,
    location: String,
    category: String,
    forWhom: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
