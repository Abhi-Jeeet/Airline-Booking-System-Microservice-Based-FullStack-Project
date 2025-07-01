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
    
    // Enhanced error handling for different scenarios
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Flight service is not running. Please start the FlightService microservice.');
      } else if (error.response?.status === 500) {
        throw new Error('Database connection error. Please check Supabase configuration.');
      } else if (error.response?.status === 404) {
        throw new Error('Flight not found.');
      }
    }
    
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
  // Include related data
  airplaneDetail?: {
    id: string;
    modelNumber: string;
    capacity: number;
  };
  departureAirport?: {
    id: string;
    name: string;
    code: string;
    city?: {
      id: string;
      name: string;
    };
  };
  arrivalAirport?: {
    id: string;
    name: string;
    code: string;
    city?: {
      id: string;
      name: string;
    };
  };
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  address: string;
  cityId: string;
  city?: {
    id: string;
    name: string;
  };
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
  departureCity?: string;
  arrivalCity?: string;
}

export const flightService = {
  // Get all flights with filters
  getFlights: async (params?: FlightSearchParams): Promise<Flight[]> => {
    try {
      const response = await FLIGHT_API.get('/flights', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching flights:', error);
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
      throw error;
    }
  },

  // Check service health
  checkHealth: async (): Promise<boolean> => {
    try {
      await FLIGHT_API.get('/health');
      return true;
    } catch (error) {
      console.error('Flight service health check failed:', error);
      return false;
    }
  },
}; 