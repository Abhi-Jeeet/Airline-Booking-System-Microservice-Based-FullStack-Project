'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import FlightCard from './FlightCard';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plane, AlertCircle, Search, Sparkles } from 'lucide-react';

export default function FlightList() {
  const { flights, loading, error } = useSelector((state: RootState) => state.flight);

  if (loading) {
    return (
      <Card className="max-w-5xl mx-auto mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 font-medium">Searching for flights...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-5xl mx-auto mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <span className="font-medium">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (flights.length === 0) {
    return (
      <Card className="max-w-5xl mx-auto mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="relative mb-6">
              <Plane className="h-16 w-16 text-gray-400 mx-auto" />
              <div className="absolute -top-2 -right-2 h-6 w-6 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No flights found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search criteria or check back later for more options.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Flights
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              {flights.length} amazing options found
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Best matches for your search</div>
          <div className="text-lg font-semibold text-blue-600">{flights.length} flights</div>
        </div>
      </div>
      
      <div className="space-y-6">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
} 