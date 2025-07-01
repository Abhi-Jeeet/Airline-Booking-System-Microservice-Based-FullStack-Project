'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { getFlight } from '@/lib/store/slices/flightSlice';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plane, Clock, MapPin, Users, DollarSign, Star, ArrowLeft, Calendar, Shield, Wifi, Coffee, Utensils, Monitor, Heart, Thermometer, Wind } from 'lucide-react';
import { format } from 'date-fns';

export default function FlightDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedFlight, loading, error } = useSelector((state: RootState) => state.flight);
  const [flight, setFlight] = useState(selectedFlight);

  useEffect(() => {
    if (params.id && !selectedFlight) {
      dispatch(getFlight(params.id as string));
    }
  }, [params.id, dispatch, selectedFlight]);

  useEffect(() => {
    if (selectedFlight) {
      setFlight(selectedFlight);
    }
  }, [selectedFlight]);

  const formatTime = (timeString: string) => {
    try {
      return format(new Date(timeString), 'HH:mm');
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatDuration = (departure: string, arrival: string) => {
    try {
      const dep = new Date(departure);
      const arr = new Date(arrival);
      const diff = arr.getTime() - dep.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch {
      return 'N/A';
    }
  };

  const handleBookFlight = () => {
    // Removed booking functionality - just show flight details
    console.log('Flight details only - no booking');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-700 font-medium">Loading flight details...</span>
        </div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Flight not found</h3>
          <p className="text-gray-600 mb-4">The flight you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/flights')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            Back to Flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={() => router.push('/flights')}
                className="mb-6 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Flights
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Flight {flight.flightNumber}
              </h1>
              <p className="text-xl text-blue-100">
                {formatDate(flight.departureTime)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">${flight.price}</div>
              <p className="text-blue-100">per passenger</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Details */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Flight Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Flight Route Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    Flight Route & Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Flight Route */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-center">
                      <div className="font-bold text-3xl text-gray-900">
                        {formatTime(flight.departureTime)}
                      </div>
                      <div className="text-sm text-gray-600">Departure</div>
                      <div className="text-xs text-gray-500 mt-1">Gate {flight.boardingGate}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-px bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                      <div className="relative">
                        <Plane className="h-6 w-6 text-blue-600" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-32 h-px bg-gradient-to-r from-indigo-600 to-blue-600"></div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-3xl text-gray-900">
                        {formatTime(flight.arrivalTime)}
                      </div>
                      <div className="text-sm text-gray-600">Arrival</div>
                      <div className="text-xs text-gray-500 mt-1">Direct Flight</div>
                    </div>
                  </div>

                  {/* Flight Duration */}
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                      Flight Duration: {formatDuration(flight.departureTime, flight.arrivalTime)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Flight Statistics */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    Flight Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Gate {flight.boardingGate}</div>
                        <div className="text-sm text-gray-600">Boarding Gate</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">{flight.availableSeats}</div>
                        <div className="text-sm text-gray-600">Available Seats</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Direct</div>
                        <div className="text-sm text-gray-600">Flight Type</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-semibold text-gray-900">${flight.price * flight.totalSeats}</div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Aircraft Information */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    Aircraft Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Aircraft Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aircraft ID:</span>
                          <span className="font-medium">{flight.airplaneId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Seats:</span>
                          <span className="font-medium">{flight.totalSeats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available Seats:</span>
                          <span className="font-medium">{flight.availableSeats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Occupancy Rate:</span>
                          <span className="font-medium">{Math.round(((flight.totalSeats - flight.availableSeats) / flight.totalSeats) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Flight Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Flight Number:</span>
                          <span className="font-medium">{flight.flightNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Route:</span>
                          <span className="font-medium">{flight.departureAirportId} → {flight.arrivalAirportId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{formatDuration(flight.departureTime, flight.arrivalTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">${flight.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities & Services */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    Amenities & Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">In-Flight Services</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Wifi className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Free Wi-Fi</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Coffee className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Complimentary Refreshments</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Utensils className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Meal Service</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Monitor className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Entertainment System</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Comfort Features</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Heart className="h-5 w-5 text-red-600" />
                          <span className="text-gray-700">Climate Control</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Thermometer className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Temperature Monitoring</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Wind className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Air Filtration</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Safety & Security</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-gray-700">Enhanced Safety</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Star className="h-5 w-5 text-yellow-600" />
                          <span className="text-gray-700">Premium Service</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">On-Time Performance</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Experienced Crew</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Flight Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-8">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Star className="h-5 w-5 text-blue-600" />
                    Flight Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">${flight.price}</div>
                      <p className="text-gray-600">per passenger</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Flight Number</span>
                        <span className="font-medium">{flight.flightNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{formatDate(flight.departureTime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{formatDuration(flight.departureTime, flight.arrivalTime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available Seats</span>
                        <span className="font-medium">{flight.availableSeats}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Boarding Gate</span>
                        <span className="font-medium">{flight.boardingGate}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Flight Status</p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          On Schedule
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        This flight is operated by AeroLink Airlines
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 