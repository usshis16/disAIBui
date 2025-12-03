import React from 'react';
import { Lightbulb } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-primary-600 p-1.5 rounded-lg mr-3">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">AI Opportunity Finder</span>
          </div>
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium text-sm">Admin</a>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
