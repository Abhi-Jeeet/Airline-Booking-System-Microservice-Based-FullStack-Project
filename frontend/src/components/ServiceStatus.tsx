'use client';

import { useState, useEffect } from 'react';
import { flightService } from '@/lib/api/flightService';

interface ServiceStatusProps {
  className?: string;
}

export default function ServiceStatus({ className = '' }: ServiceStatusProps) {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkServiceStatus();
  }, []);

  const checkServiceStatus = async () => {
    try {
      setStatus('checking');
      const isHealthy = await flightService.checkHealth();
      setStatus(isHealthy ? 'connected' : 'error');
      if (!isHealthy) {
        setError('Service is not responding');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'FlightService Connected';
      case 'error':
        return 'FlightService Error';
      default:
        return 'Checking Connection...';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg shadow-lg border ${getStatusColor()} ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">{getStatusIcon()} {getStatusText()}</span>
        <button
          onClick={checkServiceStatus}
          className="text-xs underline hover:no-underline"
          disabled={status === 'checking'}
        >
          Retry
        </button>
      </div>
      {status === 'error' && error && (
        <div className="mt-1 text-xs text-red-700">
          {error}
        </div>
 