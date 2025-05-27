const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const { upload } = require("../helpers/cloudinary");

// Upload meeting image
router.post(
  "/upload-image",
  upload.single("my_file"),
  meetingController.handleImageUpload
);

// Add a new meeting
router.post("/add", meetingController.addMeeting);

// Get all meetings
router.get("/", meetingController.fetchAllMeetings);

// Update a meeting
router.put("/:id", meetingController.editMeeting);

// Delete a meeting
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
