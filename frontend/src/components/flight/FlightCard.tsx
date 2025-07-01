'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Flight } from '@/lib/api/flightService';
import { setSelectedFlight } from '@/lib/store/slices/flightSlice';
import Button from '@/components/ui/Button';
import { Plane, Clock, MapPin, Users, DollarSign, Star, Info, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleViewDetails = () => {
    dispatch(setSelectedFlight(flight));
    router.push(`/flights/${flight.id}`);
  };

  const formatTime = (timeString: string) => {
    try {
      return format(new Date(timeString), 'HH:mm');
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
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

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Flight {flight.flightNumber}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span>Premium Service</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ₹{flight.price}
            </div>
            <p className="text-sm text-gray-600">per passenger</p>
          </div>
        </div>
      </div>

      {/* Flight Route */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatTime(flight.departureTime)}
            </div>
            <div className="text-sm text-gray-600">Departure</div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Plane className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {formatTime(flight.arrivalTime)}
            </div>
            <div className="text-sm text-gray-600">Arrival</div>
          </div>
        </div>

        {/* Flight Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <MapPin className="h-4 w-4 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900">Gate {flight.boardingGate}</div>
              <div className="text-xs text-gray-600">Boarding</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
            <Users className="h-4 w-4 text-green-600" />
            <div>
              <div className="font-semibold text-gray-900">{flight.availableSeats}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
            <Clock className="h-4 w-4 text-purple-600" />
            <div>
              <div className="font-semibold text-gray-900">{formatDuration(flight.departureTime, flight.arrivalTime)}</div>
              <div className="text-xs text-gray-600">Duration</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
            <DollarSign className="h-4 w-4 text-orange-600" />
            <div>
              <div className="font-semibold text-gray-900">₹{flight.price * flight.totalSeats}</div>
              <div className="text-xs text-gray-600">Total Value</div>
            </div>
          </div>
        </div>

        {/* Date and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Travel Date: <span className="font-semibold text-gray-900">{formatDate(flight.departureTime)}</span>
          </div>
          
          <Button
            onClick={handleViewDetails}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          >
            <Info className="h-4 w-4 mr-2" />
            View Details
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
} 