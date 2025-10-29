
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} SmartVerify. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-blue-500 transition-colors duration-200">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="hover:text-blue-500 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
