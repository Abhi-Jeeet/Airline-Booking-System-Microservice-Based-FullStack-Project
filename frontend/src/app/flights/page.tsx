import FlightSearch from '@/components/flight/FlightSearch';
import FlightList from '@/components/flight/FlightList';
import { Plane, Globe, TrendingUp, Clock } from 'lucide-react';

export default function FlightsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Plane className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 h-5 w-5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Amazing Flights
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Search through thousands of flights and find the perfect journey for your next adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Destinations Worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Daily Flights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Search Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Your Perfect Flight
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search across thousands of flights and find the best deals for your journey.
            </p>
          </div>
          
          <FlightSearch />
          <FlightList />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular routes and discover amazing destinations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'New York', code: 'NYC', image: 'bg-gradient-to-br from-blue-400 to-blue-600' },
              { city: 'London', code: 'LON', image: 'bg-gradient-to-br from-purple-400 to-purple-600' },
              { city: 'Tokyo', code: 'TYO', image: 'bg-gradient-to-br from-pink-400 to-pink-600' },
              { city: 'Paris', code: 'PAR', image: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
            ].map((destination) => (
              <div key={destination.code} className={`${destination.image} rounded-xl p-6 text-white hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                <h3 className="text-xl font-bold mb-2">{destination.city}</h3>
                <p className="text-white/80">{destination.code}</p>
                <div className="mt-4">
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    From $299
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 