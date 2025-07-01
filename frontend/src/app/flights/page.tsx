import FlightSearch from '@/components/flight/FlightSearch';
import FlightList from '@/components/flight/FlightList';
import { Plane, Search, TrendingUp, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Find Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Flight</span>
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-0 leading-relaxed">
              Discover thousands of flights from top airlines. Compare prices, find the best deals, 
              and book your next adventure with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlightSearch />
        </div>
      </section>

      {/* Flight Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FlightList />
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Routes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most popular destinations and find inspiration for your next trip.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { from: 'New York', to: 'London', price: '$299', duration: '7h 30m', image: 'bg-gradient-to-br from-blue-400 to-blue-600' },
              { from: 'Los Angeles', to: 'Tokyo', price: '$599', duration: '11h 45m', image: 'bg-gradient-to-br from-purple-400 to-purple-600' },
              { from: 'Paris', to: 'Rome', price: '$199', duration: '2h 15m', image: 'bg-gradient-to-br from-pink-400 to-pink-600' },
              { from: 'Sydney', to: 'Singapore', price: '$399', duration: '8h 20m', image: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
              { from: 'Dubai', to: 'Mumbai', price: '$249', duration: '3h 45m', image: 'bg-gradient-to-br from-green-400 to-green-600' },
              { from: 'Toronto', to: 'Vancouver', price: '$179', duration: '4h 30m', image: 'bg-gradient-to-br from-orange-400 to-orange-600' },
            ].map((route, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`${route.image} p-8 text-white relative`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold">{route.from}</div>
                      <ArrowRight className="h-6 w-6" />
                      <div className="text-2xl font-bold">{route.to}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm opacity-90">
                      <span>{route.duration}</span>
                      <span className="text-lg font-semibold">{route.price}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Direct flights available</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Search Flights
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AeroLink?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium flight booking platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find the best flights with our intelligent search algorithm that considers price, 
                time, and your preferences.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant notifications about flight changes, delays, and gate updates 
                to stay informed throughout your journey.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Access our 24/7 customer support team for any questions or assistance 
                you need before, during, or after your flight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 