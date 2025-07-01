import FlightSearch from '@/components/flight/FlightSearch';
import FlightList from '@/components/flight/FlightList';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';

export default function FlightSearchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Search className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 h-5 w-5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Flight Search
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Find the perfect flight for your journey with our advanced search tools.
            </p>
          </div>
        </div>
      </section>

      {/* Search Tools */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Popular Routes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Flexible Dates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Search Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlightSearch />
          <FlightList />
        </div>
      </section>

      {/* Search Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Search Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get the best deals and find your perfect flight with these helpful tips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Dates</h3>
              <p className="text-gray-600">
                Try searching with flexible dates to find better prices and more options.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nearby Airports</h3>
              <p className="text-gray-600">
                Consider nearby airports for potentially lower fares and more flight options.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Filters</h3>
              <p className="text-gray-600">
                Use our advanced filters to narrow down results by price, time, and airline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 