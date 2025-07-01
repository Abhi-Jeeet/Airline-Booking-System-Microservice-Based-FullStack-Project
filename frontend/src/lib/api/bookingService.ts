import axios from 'axios';

const BOOKING_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOOKING_SERVICE_URL || 'http://localhost:3002/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
BOOKING_API.interceptors.request.use(
  (config) => {
    console.log('Booking API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Booking API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
BOOKING_API.interceptors.response.use(
  (response) => {
    console.log('Booking API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Booking API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export interface BookingData {
  flightId: string;
  noOfSeats: number;
  userId: string;
}

export interface PaymentData {
  totalCost: number;
  userId: string;
  bookingId: string;
}

export interface Booking {
  id: string;
  flightId: string;
  noOfSeats: number;
  userId: string;
  status: string;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

export const bookingService = {
  // Create booking
  createBooking: async (bookingData: BookingData): Promise<Booking> => {
    try {
      const response = await BOOKING_API.post('/bookings', bookingData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Booking service is not running. Please start the BookingService microservice.');
      }
      throw error;
    }
  },

  // Make payment
  makePayment: async (paymentData: PaymentData): Promise<Booking> => {
    try {
      const idempotencyKey = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const response = await BOOKING_API.post('/bookings/payments', paymentData, {
        headers: {
          'x-idempotency-key': idempotencyKey,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error making payment:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Booking service is not running. Please start the BookingService microservice.');
      }
      throw error;
    }
  },
}; 