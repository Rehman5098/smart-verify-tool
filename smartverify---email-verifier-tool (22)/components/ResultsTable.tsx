
import React from 'react';
import { EmailResult, VerificationStatus } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { XIcon } from './icons/XIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';

interface ResultsTableProps {
  results: EmailResult[];
}

const statusConfig = {
  [VerificationStatus.Valid]: {
    text: 'text-green-500',
    bg: 'bg-green-500/10',
    icon: <CheckIcon className="h-5 w-5 text-green-500" />,
  },
  [VerificationStatus.Invalid]: {
    text: 'text-red-500',
    bg: 'bg-red-500/10',
    icon: <XIcon className="h-5 w-5 text-red-500" />,
  },
  [VerificationStatus.Unverifiable]: {
    text: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    icon: <ExclamationIcon className="h-5 w-5 text-yellow-500" />,
  },
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">Verification Results</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 hidden sm:table-cell">Domain</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-600/20 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{result.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[result.status].bg} ${statusConfig[result.status].text}`}>
                      {statusConfig[result.status].icon}
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">{result.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
