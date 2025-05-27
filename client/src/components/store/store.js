import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index';
import eventsReducer from './admin/events-slice';
import meetingsReducer from './admin/meetings-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    meetings: meetingsReducer
  },
});

export default store;
