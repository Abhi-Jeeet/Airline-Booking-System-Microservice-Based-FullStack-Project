'use client';

import React, { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon, 
  PaperAirplaneIcon,
  HomeIcon,
  UsersIcon,
  TicketIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import CreateAirplane from '@/components/admin/createAirplane';

type AdminSection = 'dashboard' | 'createAirplane' | 'manageFlights' | 'manageUsers' | 'bookings' | 'analytics';

const AdminPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const menuItems = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: HomeIcon },
    { id: 'createAirplane' as AdminSection, label: 'Create Airplane', icon: PlusIcon },
    { id: 'manageFlights' as AdminSection, label: 'Manage Flights', icon: PaperAirplaneIcon },
    { id: 'manageUsers' as AdminSection, label: 'Manage Users', icon: UsersIcon },
    { id: 'bookings' as AdminSection, label: 'Bookings', icon: TicketIcon },
    { id: 'analytics' as AdminSection, label: 'Analytics', icon: ChartBarIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'createAirplane':
        return <CreateAirplane />;
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900">Total Flights</h3>
                <p className="text-3xl font-bold text-blue-600">156</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900">Active Bookings</h3>
                <p className="text-3xl font-bold text-green-600">2,847</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <p className="text-3xl font-bold text-purple-600">12,456</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <p className="text-3xl font-bold text-orange-600">$45.2M</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
        
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;