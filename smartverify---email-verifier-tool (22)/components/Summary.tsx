
import React, { useMemo } from 'react';
import { EmailResult, VerificationStatus } from '../types';

interface SummaryProps {
  results: EmailResult[];
  creditsRemaining: number;
}

export const Summary: React.FC<SummaryProps> = ({ results, creditsRemaining }) => {
  const summary = useMemo(() => {
    const valid = results.filter(r => r.status === VerificationStatus.Valid);
    const invalid = results.filter(r => r.status === VerificationStatus.Invalid);
    const unverifiable = results.filter(r => r.status === VerificationStatus.Unverifiable);
    return {
      total: results.length,
      validCount: valid.length,
      invalidCount: invalid.length + unverifiable.length,
      validEmails: valid.map(r => r.email),
    };
  }, [results]);

  if (summary.total === 0) {
    return null;
  }
  
  const copyValidEmails = () => {
    navigator.clipboard.writeText(summary.validEmails.join('\n'));
    // Ideally, you'd show a toast notification here
    alert('Valid emails copied to clipboard!');
  };
  
  const downloadResults = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Status,Domain\n" 
      + results.map(r => `${r.email},${r.status},${r.domain}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "verification_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div><p className="text-sm text-gray-500 dark:text-gray-400">Total</p><p className="font-bold text-lg text-gray-800 dark:text-gray-200">{summary.total}</p></div>
          <div><p className="text-sm text-green-500">Valid</p><p className="font-bold text-lg text-green-500">{summary.validCount}</p></div>
          <div><p className="text-sm text-red-500">Invalid</p><p className="font-bold text-lg text-red-500">{summary.invalidCount}</p></div>
          <div><p className="text-sm text-gray-500 dark:text-gray-400">Credits Left</p><p className="font-bold text-lg text-blue-500">{creditsRemaining}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copyValidEmails} disabled={summary.validCount === 0} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Copy Valid
          </button>
          <button onClick={downloadResults} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};
