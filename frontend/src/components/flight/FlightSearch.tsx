'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { searchFlights, getAirports, getCities } from '@/lib/store/slices/flightSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plane, Calendar, Users, MapPin, Search } from 'lucide-react';

export default function FlightSearch() {
  const dispatch = useDispatch<AppDispatch>();
  const { airports, cities, loading } = useSelector((state: RootState) => state.flight);
  
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    passengers: 1,
  });

  // Use a stable date for the min attribute to avoid hydration issues
  const [minDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load airports and cities on component mount
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
    <Card className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-white/20 rounded-lg">
            <Search className="h-6 w-6" />
          </div>
          Find Your Perfect Flight
        </CardTitle>
        <p className="text-blue-100 mt-2">
          Search across thousands of flights and discover amazing deals
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <Input
                label="From"
                placeholder="Airport code (e.g., IXR)"
                value={searchParams.from}
                onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value.toUpperCase() })}
                required
                maxLength={3}
                className="bg-white/50 backdrop-blur-sm"
              />
              <MapPin className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Input
                label="To"
                placeholder="Airport code (e.g., PAT)"
                value={searchParams.to}
                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value.toUpperCase() })}
                required
                maxLength={3}
                className="bg-white/50 backdrop-blur-sm"
              />
              <MapPin className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Input
                label="Departure Date"
                type="date"
                value={searchParams.departureDate}
                onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                required
                min={minDate}
                className="bg-white/50 backdrop-blur-sm"
              />
              <Calendar className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="relative">
              <Input
                label="Passengers"
                type="number"
                placeholder="1"
                value={searchParams.passengers}
                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) || 1 })}
                min="1"
                max="9"
                required
                className="bg-white/50 backdrop-blur-sm"
              />
              <Users className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
            loading={loading}
            size="lg"
          >
            <Plane className="h-5 w-5 mr-3" />
            Search Flights
          </Button>
        </form>

        {/* Airport and City Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Popular Airports
            </h4>
            <div className="flex flex-wrap gap-2">
              {airports.slice(0, 6).map((airport) => (
                <span key={airport.id} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  {airport.code} - {airport.name}
                </span>
              ))}
              {airports.length > 6 && (
                <span className="text-gray-500 text-sm">+{airports.length - 6} more</span>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600" />
              Popular Cities
            </h4>
            <div className="flex flex-wrap gap-2">
              {cities.slice(0, 6).map((city) => (
                <span key={city.id} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  {city.name}
                </span>
              ))}
              {cities.length > 6 && (
                <span className="text-gray-500 text-sm">+{cities.length - 6} more</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 