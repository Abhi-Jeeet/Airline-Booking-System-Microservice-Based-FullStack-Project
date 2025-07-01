'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { Plane, User, Menu, Search, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const auth = useSelector((state: RootState) => state.auth) as {
    isAuthenticated: boolean;
    user: { name: string } | null;
  };
  const { isAuthenticated, user } = auth;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Plane className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AeroLink
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/flights" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Flights
            </Link>
            <Link 
              href="/deals" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Deals
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <span className="text-sm text-gray-700 font-medium">
                  Welcome, {user?.name}
                </span>
                <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Sign Up
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 
 