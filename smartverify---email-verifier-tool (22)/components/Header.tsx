
import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 18.5a11.954 11.954 0 007.834-13.501A1.001 1.001 0 0016.415 3.5c-.528-.02-1.053.18-1.42.56L10 10.586 6.005 6.586a1.001 1.001 0 00-1.42-.56c-.367-.38-.892-.58-1.419-.56z" clipRule="evenodd" />
            </svg>
            <span className="ml-3 text-2xl font-bold text-gray-800 dark:text-gray-200">SmartVerify</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
