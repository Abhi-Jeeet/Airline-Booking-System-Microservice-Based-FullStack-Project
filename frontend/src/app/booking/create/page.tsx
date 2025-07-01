'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { getFlight } from '@/lib/store/slices/flightSlice';
import { createBooking } from '@/lib/store/slices/bookingSlice';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Plane, User, CreditCard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateBooking() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { selectedFlight, loading: flightLoading } = useSelector((state: RootState) => state.flight);
  const { loading: bookingLoading } = useSelector((state: RootState) => state.booking);
  
  const [passengerCount, setPassengerCount] = useState(1);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const flightId = searchParams.get('flightId');

  useEffect(() => {
    if (flightId && !selectedFlight) {
      dispatch(getFlight(flightId));
    }
  }, [flightId, selectedFlight, dispatch]);

  const handleCreateBooking = async () => {
    if (!selectedFlight || !flightId) return;

    const userId = 'user-123'; // Mock user ID
    
    try {
      await dispatch(createBooking({
        flightId,
        noOfSeats: passengerCount,
        userId,
      })).unwrap();
      
      router.push('/booking/payment');
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  if (flightLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!selectedFlight) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-gray-600">Flight not found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to search
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = selectedFlight.price * passengerCount;

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flight Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Flight Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Flight {selectedFlight.flightNumber}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(selectedFlight.departureTime).toLocaleDateString()}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price per passenger:</span>
                  <span className="font-semibold">${selectedFlight.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Passengers:</span>
                  <span className="font-semibold">{passengerCount}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Booking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                label="Number of Passengers"
                type="number"
                value={passengerCount}
                onChange={(e) => setPassengerCount(parseInt(e.target.value) || 1)}
                min="1"
                max="9"
                required
              />
              
              <Input
                label="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              
              <Input
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />

              <Button
                onClick={handleCreateBooking}
                className="w-full"
                loading={bookingLoading}
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 