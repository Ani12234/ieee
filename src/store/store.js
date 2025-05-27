import { configureStore } from '@reduxjs/toolkit';
// Import the admin slices
import eventsReducer from './admin/events-slice';
import meetingsReducer from './admin/meetings-slice';
import authReducer from './auth-slice/index';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    meetings: meetingsReducer,
  },
});

export default store;
