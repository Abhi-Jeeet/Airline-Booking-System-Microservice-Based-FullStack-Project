'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Flight } from '@/lib/api/flightService';
import { setSelectedFlight } from '@/lib/store/slices/flightSlice';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Plane, Clock, MapPin, Users, DollarSign, Star, AlertCircle, Info } from 'lucide-react';
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
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Flight {flight.flightNumber}
              </CardTitle>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                Premium Service
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ${flight.price}
            </div>
            <p className="text-sm text-gray-600">per passenger</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Flight Route */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="font-bold text-xl text-gray-900">
                  {formatTime(flight.departureTime)}
                </div>
                <div className="text-sm text-gray-600">Departure</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-px bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="relative">
                  <Plane className="h-5 w-5 text-blue-600" />
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-20 h-px bg-gradient-to-r from-indigo-600 to-blue-600"></div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-gray-900">
                  {formatTime(flight.arrivalTime)}
                </div>
                <div className="text-sm text-gray-600">Arrival</div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Gate {flight.boardingGate}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">{flight.availableSeats} seats left</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">{formatDuration(flight.departureTime, flight.arrivalTime)}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
              <DollarSign className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Total: ${flight.price * flight.totalSeats}</span>
            </div>
          </div>

          {/* Date Info */}
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Travel Date: <span className="font-semibold text-gray-900">{formatDate(flight.departureTime)}</span>
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button
              onClick={handleViewDetails}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Info className="h-5 w-5 mr-2" />
              View Flight Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 