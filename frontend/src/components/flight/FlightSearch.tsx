'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { searchFlights, getAirports, getCities } from '@/lib/store/slices/flightSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plane, MapPin, Calendar, Users, Search, Filter } from 'lucide-react';

export default function FlightSearch() {
  const dispatch = useDispatch<AppDispatch>();
  const { airports, cities, loading } = useSelector((state: RootState) => state.flight);
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    passengers: 1,
  });

  const [minDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(getAirports());
    dispatch(getCities());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trips = `${searchParams.from}-${searchParams.to}`;
    dispatch(searchFlights({ 
      trips, 
      passengers: searchParams.passengers,
      departureDate: searchParams.departureDate 
    }));
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Search className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Search Flights</h2>
          </div>
          <p className="text-blue-100">Find the perfect flight for your journey</p>
        </div>

        {/* Search Form */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                From
              </label>
              <Input
                placeholder="Airport code (e.g., IXR)"
                value={searchParams.from}
                onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value.toUpperCase() })}
                required
                maxLength={3}
                className="h-12 text-lg"
              />
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                To
              </label>
              <Input
                placeholder="Airport code (e.g., PAT)"
                value={searchParams.to}
                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value.toUpperCase() })}
                required
                maxLength={3}
                className="h-12 text-lg"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Departure Date
              </label>
              <Input
                type="date"
                value={searchParams.departureDate}
                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                required
                min={minDate}
                className="h-12 text-lg"
              />
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-600" />
                Passengers
              </label>
              <Input
                type="number"
                placeholder="1"
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) || 1 })}
                min="1"
                max="9"
                required
                className="h-12 text-lg"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
            loading={loading}
            size="lg"
          >
            <Plane className="h-5 w-5 mr-3" />
            Search Flights
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Quick Filters:</span>
              </div>
              <div className="flex gap-3">
                <button type="button" className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200">
                  Direct Only
                </button>
                <button type="button" className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200">
                  Morning Flights
                </button>
                <button type="button" className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200">
                  Economy
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Popular Airports */}
      {airports.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Popular Airports
          </h3>
          <div className="flex flex-wrap gap-3">
            {airports.slice(0, 8).map((airport) => (
              <button
                key={airport.id}
                onClick={() => setSearchParams({ ...searchParams, from: airport.code })}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                {airport.code} - {airport.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 