'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import FlightCard from './FlightCard';
import { Plane, AlertCircle, Search, Sparkles, Filter, SortAsc } from 'lucide-react';

export default function FlightList() {
  const { flights, loading, error } = useSelector((state: RootState) => state.flight);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Searching for flights...</h3>
          <p className="text-gray-600">We're finding the best options for your journey</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
            <Plane className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Try adjusting your search criteria or check back later for more options. 
            You can also try different dates or nearby airports.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              Modify Search
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              View All Flights
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {flights.length} Flights Found
              </h2>
              <p className="text-gray-600 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Best matches for your search
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Flights</option>
              <option>Direct Only</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <SortAsc className="h-4 w-4" />
              <span>Sort:</span>
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Short to Long</option>
              <option>Duration: Long to Short</option>
              <option>Departure Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>

      {/* Load More */}
      {flights.length > 0 && (
        <div className="text-center py-8">
          <button className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
            Load More Flights
          </button>
        </div>
      )}
    </div>
  );
} 