import axios from 'axios';

const FLIGHT_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FLIGHT_SERVICE_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
FLIGHT_API.interceptors.request.use(
  (config) => {
    console.log('Flight API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Flight API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
FLIGHT_API.interceptors.response.use(
  (response) => {
    console.log('Flight API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Flight API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export interface Flight {
  id: string;
  flightNumber: string;
  airplaneId: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  boardingGate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  address: string;
  cityId: string;
}

export interface City {
  id: string;
  name: string;
}

export interface FlightSearchParams {
  trips?: string; // e.g., "IXR-PAT"
  departureDate?: string;
  arrivalDate?: string;
  passengers?: number;
}

export const flightService = {
  // Get all flights with filters
  getFlights: async (params?: FlightSearchParams): Promise<Flight[]> => {
    try {
      const response = await FLIGHT_API.get('/flights', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching flights:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      }
      throw error;
    }
  },

  // Get specific flight
  getFlight: async (id: string): Promise<Flight> => {
    try {
      const response = await FLIGHT_API.get(`/flights/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching flight:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      }
      throw error;
    }
  },

  // Get airports
  getAirports: async (): Promise<Airport[]> => {
    try {
      const response = await FLIGHT_API.get('/airports');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching airports:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      }
      throw error;
    }
  },

  // Get cities
  getCities: async (): Promise<City[]> => {
    try {
      const response = await FLIGHT_API.get('/cities');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching cities:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      }
      throw error;
    }
  },

  // Update flight seats
  updateSeats: async (flightId: string, seats: number, dec: boolean) => {
    try {
      const response = await FLIGHT_API.patch(`/flights/${flightId}/seats`, {
        seats,
        dec,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating seats:', error);
      if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      }
      throw error;
    }
  },
}; 