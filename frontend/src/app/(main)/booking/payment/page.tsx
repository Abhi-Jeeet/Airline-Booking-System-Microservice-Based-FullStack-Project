'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store/store';
import { makePayment } from '@/lib/store/slices/bookingSlice';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentBooking, loading } = useSelector((state: RootState) => state.booking);
  const { selectedFlight } = useSelector((state: RootState) => state.flight);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handlePayment = async () => {
    if (!currentBooking) return;

    try {
      await dispatch(makePayment({
        totalCost: currentBooking.totalCost || 0,
        userId: currentBooking.userId,
        bookingId: currentBooking.id,
      })).unwrap();
      
      // Navigate to success page
      router.push('/booking/success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (!currentBooking || !selectedFlight) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-gray-600">No booking found</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <Link href="/booking/create" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Flight:</span>
                  <span className="font-semibold">{selectedFlight.flightNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span>{currentBooking.noOfSeats}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per passenger:</span>
                  <span>${selectedFlight.price}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">${currentBooking.totalCost || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5}
                      required
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    required
                  />
                </div>
              )}

              <Button
                onClick={handlePayment}
                className="w-full"
                loading={loading}
                size="lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 