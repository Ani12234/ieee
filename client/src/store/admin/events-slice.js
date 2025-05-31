import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { events as initialEvents } from "../../components/data/events";

const initialState = {
  isLoading: false,
  eventsList: initialEvents, // Initialize with the events from the data file
  eventDetails: null,
  imageLoading: false,
  uploadedImageUrl: null
};

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all events
export const fetchAllEvents = createAsyncThunk(
  "/events/fetchAllEvents",
  async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      // Return initial events as fallback if API fails
      return { 
        success: true, 
        data: initialEvents 
      };
    }
  }
);

// Add a new event
export const addNewEvent = createAsyncThunk(
  "/events/addNewEvent",
  async (eventData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/events/add`,
        eventData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  }
);

// Upload event image
export const uploadEventImage = createAsyncThunk(
  "/events/uploadImage",
  async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("my_file", imageFile);
      
      const response = await axios.post(
        `${API_BASE_URL}/api/events/upload-image`,
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

// Edit an existing event
export const editEvent = createAsyncThunk(
  "/events/editEvent",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/events/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error editing event:", error);
      throw error;
    }
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  "/events/deleteEvent",
  async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/events/${id}`
      );
      return { ...response.data, id };
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
      state.eventDetails = action.payload;
    },
    clearEventDetails: (state) => {
      state.eventDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsList = action.payload.data;
      })
      .addCase(fetchAllEvents.rejected, (state) => {
        state.isLoading = false;
        state.eventsList = [];
      })
      
      // Add new event
      .addCase(addNewEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsList = [...state.eventsList, action.payload.data];
      })
      .addCase(addNewEvent.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Upload event image
      .addCase(uploadEventImage.pending, (state) => {
        state.imageLoading = true;
        state.uploadedImageUrl = null;
      })
      .addCase(uploadEventImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.uploadedImageUrl = action.payload.result?.secure_url || null;
      })
      .addCase(uploadEventImage.rejected, (state) => {
        state.imageLoading = false;
        state.uploadedImageUrl = null;
      })
      
      // Edit event
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsList = state.eventsList.map(event => 
          event.id === action.payload.data.id ? action.payload.data : event
        );
      })
      .addCase(editEvent.rejected, (state) => {
        state.isLoading = false;
      })
      
      // Delete event
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventsList = state.eventsList.filter(event => event.id !== action.payload.id);
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setEventDetails, clearEventDetails } = eventsSlice.actions;

export default eventsSlice.reducer;
