'use client';

import React, { useState, useEffect } from 'react';

const API_URL = `${process.env.NEXT_PUBLIC_FLIGHT_SERVICE_URL}/airplanes`;

interface Airplane {
  id: number;
  modelNumber: string;
  capacity: number;
}

const CreateAirplane = () => {
  const [modelNumber, setModelNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch airplanes on mount and after create
  const fetchAirplanes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAirplanes(data.data);
      } else if (Array.isArray(data)) {
        setAirplanes(data);
      } else {
        setAirplanes([]);
      }
    } catch (err) {
      setError('Failed to fetch airplanes');
    }
  };

  useEffect(() => {
    fetchAirplanes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelNumber,
          capacity: Number(capacity),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setModelNumber('');
        setCapacity('');
        fetchAirplanes();
      } else {
        setError(data.message || 'Failed to create airplane');
      }
    } catch (err) {
      setError('Failed to create airplane');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 flex flex-col w-full">
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
          <label className="flex items-center gap-2 font-medium">
            modelNumber
            <input
              type="text"
              value={modelNumber}
              onChange={e => setModelNumber(e.target.value)}
              required
              className="border rounded px-2 py-1 w-40"
              placeholder="e.g. Airbus001"
            />
          </label>
          <label className="flex items-center gap-2 font-medium">
            Capacity
            <input
              type="number"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              required
              min={1}
              className="border rounded px-2 py-1 w-32"
              placeholder="e.g. 180"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
      {/* Error */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {/* Created Airplane List */}
      <div>
        <div className="font-semibold mb-2">Created Airplane</div>
        <div className="grid grid-cols-3 gap-6">
          {airplanes.length === 0 && (
            <div className="col-span-3 text-gray-500">No airplanes created yet.</div>
          )}
          {airplanes.map((plane) => (
            <div
              key={plane.id}
              className="rounded-xl border flex flex-col items-center justify-center p-4 min-h-[60px] min-w-[100px] shadow-sm bg-white"
            >
              <div className="font-bold text-lg">{plane.modelNumber}</div>
              <div className="text-gray-600 text-sm">Capacity: {plane.capacity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAirplane;