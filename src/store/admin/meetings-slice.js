import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { meetings as initialMeetings } from "../../components/data/meetings";

const initialState = {
  isLoading: false,
  meetingsList: initialMeetings, // Initialize with the meetings from the data file
  meetingDetails: null,
  imageLoading: false,
  uploadedImageUrl: null
};

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all meetings
export const fetchAllMeetings = createAsyncThunk(
  "/meetings/fetchAllMeetings",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/meetings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching meetings:", error);
      // Return initial meetings as fallback if API fails
      return { 
        success: true, 
        data: initialMeetings 
      };
    }
  }
);

// Add a new meeting
export const addNewMeeting = createAsyncThunk(
  "/meetings/addNewMeeting",
  async (meetingData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/meetings/add`,
        meetingData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding meeting:", error);
      throw error;
    }
  }
);

// Upload meeting image
export const uploadMeetingImage = createAsyncThunk(
  "/meetings/uploadImage",
  async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("my_file", imageFile);
      
      const response = await axios.post(
        `${API_BASE_URL}/api/meetings/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
);

// Edit an existing meeting
export const editMeeting = createAsyncThunk(
  "/meetings/editMeeting",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/meetings/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error editing meeting:", error);
      throw error;
    }
  }
);

// Delete a meeting
export const deleteMeeting = createAsyncThunk(
  "/meetings/deleteMeeting",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/meetings/${id}`
      );
      return { ...response.data, id };
    } catch (error) {
      console.error("Error deleting meeting:", error);
      throw error;
    }
  }
);

const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setMeetingDetails: (state, action) => {
      state.meetingDetails = action.payload;
    },
    clearMeetingDetails: (state) => {
      state.meetingDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all meetings
      .addCase(fetchAllMeetings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMeetings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingsList = action.payload.data;
      })
      .addCase(fetchAllMeetings.rejected, (state) => {
        state.isLoading = false;
        state.meetingsList = [];
      })
      
      // Add new meeting
      .addCase(addNewMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingsList = [...state.meetingsList, action.payload.data];
      })
      .addCase(addNewMeeting.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Upload meeting image
      .addCase(uploadMeetingImage.pending, (state) => {
        state.imageLoading = true;
        state.uploadedImageUrl = null;
      })
      .addCase(uploadMeetingImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.uploadedImageUrl = action.payload.result?.secure_url || null;
      })
      .addCase(uploadMeetingImage.rejected, (state) => {
        state.imageLoading = false;
        state.uploadedImageUrl = null;
      })
      
      // Edit meeting
      .addCase(editMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingsList = state.meetingsList.map(meeting => 
          meeting.id === action.payload.data.id ? action.payload.data : meeting
        );
      })
      .addCase(editMeeting.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Delete meeting
      .addCase(deleteMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meetingsList = state.meetingsList.filter(meeting => meeting.id !== action.payload.id);
      })
      .addCase(deleteMeeting.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setMeetingDetails, clearMeetingDetails } = meetingsSlice.actions;

export default meetingsSlice.reducer;
