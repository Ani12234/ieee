const { imageUploadUtil } = require("../helpers/cloudinary");
const Event = require("../models/Event");

// Handle image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during image upload",
    });
  }
};

// Add a new event
const addEvent = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      date,
      time,
      location,
      category,
      forWhom
    } = req.body;

    const newEvent = new Event({
      image,
      title,
      description,
      date,
      time,
      location,
      category,
      forWhom
    });

    await newEvent.save();
    res.status(201).json({
      success: true,
      data: newEvent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding event",
    });
  }
};

// Fetch all events
const fetchAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 }); // Sort by date ascending
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching events",
    });
  }
};

// Edit an event
const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      date,
      time,
      location,
      category,
      forWhom
    } = req.body;

    let event = await Event.findById(id);
    if (!event)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.category = category || event.category;
    event.forWhom = forWhom || event.forWhom;
    event.image = image || event.image;

    await event.save();
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing event",
    });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting event",
    });
  }
};

module.exports = {
  handleImageUpload,
  addEvent,
  fetchAllEvents,
  editEvent,
  deleteEvent,
};
