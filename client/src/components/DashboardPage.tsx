import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogList } from './logs/LogList';
//import { DailyLogForm } from './DailyLogForm';
//import { ChartContainer } from './ChartContainer';
import { DailyLogForm } from './forms/DailyLogForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChartContainer } from './chart/ChartContainer';

const queryClient = new QueryClient();

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    return <div className="p-8">Error: User not found.</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        
        <header className="flex justify-between items-center mb-8 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Mental Health Tracker
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user.displayName} ({user.email})
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </header>

        <main className="max-w-7xl mx-auto space-y-6">
          <ChartContainer />
          
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
            >
              {showForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hide Form
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Log
                </>
              )}
            </button>
          </div>

          {showForm && (
            <div className="animate-fadeIn">
              <DailyLogForm />
            </div>
          )}

          <LogList />
        </main>
      </div>
    </QueryClientProvider>
  );
};