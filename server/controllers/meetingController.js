const Meeting = require("../models/Meeting");
const cloudinary = require("../helpers/cloudinary");

exports.addMeeting = async (req, res) => {
  try {
    const { title, description, date, time, location, forWhom, image } = req.body;

    const newMeeting = new Meeting({
      title,
      description,
      date,
      time,
      location,
      forWhom,
      image: image || ""
    });

    const savedMeeting = await newMeeting.save();

    res.status(201).json({
      success: true,
      message: "Meeting added successfully",
      data: savedMeeting
    });
  } catch (error) {
    console.error("Error in addMeeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add meeting",
      error: error.message
    });
  }
};

exports.fetchAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ date: 1 }); // Sort by date ascending

    res.status(200).json({
      success: true,
      message: "Meetings fetched successfully",
      data: meetings
    });
  } catch (error) {
    console.error("Error in fetchAllMeetings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch meetings",
      error: error.message
    });
  }
};

exports.editMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedMeeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      data: updatedMeeting
    });
  } catch (error) {
    console.error("Error in editMeeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update meeting",
      error: error.message
    });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
      data: deletedMeeting
    });
  } catch (error) {
    console.error("Error in deleteMeeting:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete meeting",
      error: error.message
    });
  }
};

exports.handleImageUpload = async (req, res) => {
  try {
    // If no file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided"
      });
    }

    // Cloudinary upload should be handled by the middleware
    // The result should be available at req.file.path
    const result = req.file;

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result: {
        secure_url: result.path
      }
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message
    });
  }
};