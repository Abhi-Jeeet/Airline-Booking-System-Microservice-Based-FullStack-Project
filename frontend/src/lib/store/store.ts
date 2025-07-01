import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './slices/flightSlice';
import bookingReducer from './slices/bookingSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    booking: bookingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 