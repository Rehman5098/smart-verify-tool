
import React, { useState, useCallback } from 'react';
import { MAX_EMAILS_PER_BATCH, VERIFICATION_COST_PER_EMAIL } from '../constants';

interface EmailInputProps {
  onVerify: (emails: string[]) => void;
  isLoading: boolean;
  credits: number;
}

export const EmailInput: React.FC<EmailInputProps> = ({ onVerify, isLoading, credits }) => {
  const [emails, setEmails] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const emailList = emails.split(/[\n,;]+/).map(e => e.trim()).filter(Boolean);
  const emailCount = emailList.length;
  const hasEnoughCredits = credits >= emailCount * VERIFICATION_COST_PER_EMAIL;

  const handleVerifyClick = () => {
    if (emailCount > 0 && !isLoading && hasEnoughCredits) {
      onVerify(emailList.slice(0, MAX_EMAILS_PER_BATCH));
    }
  };
  
  const handleFileRead = (content: string) => {
    setEmails(prev => prev ? `${prev}\n${content}` : content);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'text/plain' || file.type === 'text/csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          handleFileRead(content);
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center pointer-events-none">
            <p className="text-blue-500 font-semibold">Drop .txt or .csv file here</p>
          </div>
        )}
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          placeholder={`Paste up to ${MAX_EMAILS_PER_BATCH} emails here, one per line... \nor drag & drop a .txt/.csv file.`}
          className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          disabled={isLoading}
        />
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Emails detected: <span className="font-bold text-gray-800 dark:text-gray-200">{emailCount}</span></p>
            <p>Credits required: <span className="font-bold text-gray-800 dark:text-gray-200">{emailCount * VERIFICATION_COST_PER_EMAIL}</span></p>
          </div>
          <button
            onClick={handleVerifyClick}
            disabled={isLoading || emailCount === 0 || !hasEnoughCredits || emailCount > MAX_EMAILS_PER_BATCH}
            className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
          >
            {isLoading ? 'Verifying...' : 'Verify Emails'}
          </button>
        </div>
         {!hasEnoughCredits && emailCount > 0 && (
          <p className="text-red-500 text-sm mt-2 text-center sm:text-right">Not enough credits. Please purchase a plan.</p>
        )}
        {emailCount > MAX_EMAILS_PER_BATCH && (
          <p className="text-red-500 text-sm mt-2 text-center sm:text-right">You can only verify up to {MAX_EMAILS_PER_BATCH} emails at a time.</p>
        )}
      </div>
    </div>
  );
};
