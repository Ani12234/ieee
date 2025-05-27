const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { upload } = require("../helpers/cloudinary");

// Upload event image
router.post(
  "/upload-image",
  upload.single("my_file"),
  eventController.handleImageUpload
);

// Add a new event
router.post("/add", eventController.addEvent);

// Get all events
router.get("/", eventController.fetchAllEvents);

// Update an event
router.put("/:id", eventController.editEvent);

// Delete an event
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
