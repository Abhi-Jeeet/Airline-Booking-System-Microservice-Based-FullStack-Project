import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingService, BookingData, PaymentData, Booking } from '../../api/bookingService';

interface BookingState {
  currentBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  loading: false,
  error: null,
};

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: BookingData) => {
    const booking = await bookingService.createBooking(bookingData);
    return booking;
  }
);

export const makePayment = createAsyncThunk(
  'booking/makePayment',
  async (paymentData: PaymentData) => {
    const booking = await bookingService.makePayment(paymentData);
    return booking;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBooking: (state) => {
      state.currentBooking = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create booking';
      })
      // Make payment
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to make payment';
      });
  },
});

export const { clearBooking, clearError } = bookingSlice.actions;
export default bookingSlice.reducer; 