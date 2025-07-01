'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CheckCircle, Plane, Download, Home } from 'lucide-react';
import Link from 'next/link';

export default function BookingSuccess() {
  const { currentBooking } = useSelector((state: RootState) => state.booking);
  const { selectedFlight } = useSelector((state: RootState) => state.flight);

  if (!currentBooking || !selectedFlight) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-gray-600">No booking information found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <div className="text-center py-12">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your flight has been successfully booked and payment processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Booking ID:</span>
                <p className="font-semibold">{currentBooking.id}</p>
              </div>
              <div>
                <span className="text-gray-600">Flight Number:</span>
                <p className="font-semibold">{selectedFlight.flightNumber}</p>
              </div>
              <div>
                <span className="text-gray-600">Passengers:</span>
                <p className="font-semibold">{currentBooking.noOfSeats}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <p className="font-semibold text-blue-600">${currentBooking.totalCost || 0}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-sm">
                <span className="text-gray-600">Departure Date:</span>
                <p className="font-semibold">
                  {new Date(selectedFlight.departureTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Link href="/">
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p className="mt-2">
            Please arrive at the airport at least 2 hours before departure time.
          </p>
        </div>
      </div>
    </div>
  );
} 