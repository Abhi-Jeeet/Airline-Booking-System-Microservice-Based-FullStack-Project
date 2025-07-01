import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { flightService, Flight, FlightSearchParams, Airport, City } from '../../api/flightService';

interface FlightState {
  flights: Flight[];
  airports: Airport[];
  cities: City[];
  selectedFlight: Flight | null;
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: [],
  airports: [],
  cities: [],
  selectedFlight: null,
  loading: false,
  error: null,
};

export const searchFlights = createAsyncThunk(
  'flight/searchFlights',
  async (params: FlightSearchParams) => {
    const flights = await flightService.getFlights(params);
    return flights;
  }
);

export const getFlight = createAsyncThunk(
  'flight/getFlight',
  async (id: string) => {
    const flight = await flightService.getFlight(id);
    return flight;
  }
);

export const getAirports = createAsyncThunk(
  'flight/getAirports',
  async () => {
    const airports = await flightService.getAirports();
    return airports;
  }
);

export const getCities = createAsyncThunk(
  'flight/getCities',
  async () => {
    const cities = await flightService.getCities();
    return cities;
  }
);

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    clearFlights: (state) => {
      state.flights = [];
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search flights
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search flights';
      })
      // Get flight
      .addCase(getFlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFlight.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFlight = action.payload;
      })
      .addCase(getFlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get flight';
      })
      // Get airports
      .addCase(getAirports.fulfilled, (state, action) => {
        state.airports = action.payload;
      })
      // Get cities
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      });
  },
});

export const { clearFlights, setSelectedFlight, clearError } = flightSlice.actions;
export default flightSlice.reducer; 