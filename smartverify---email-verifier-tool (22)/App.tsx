
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EmailInput } from './components/EmailInput';
import { ProgressBar } from './components/ProgressBar';
import { ResultsTable } from './components/ResultsTable';
import { Summary } from './components/Summary';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { verifyEmails } from './services/emailVerifier';
import { EmailResult } from './types';
import { INITIAL_CREDITS, VERIFICATION_COST_PER_EMAIL } from './constants';

const App: React.FC = () => {
  const [results, setResults] = useState<EmailResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleVerify = useCallback(async (emails: string[]) => {
    const cost = emails.length * VERIFICATION_COST_PER_EMAIL;
    if (credits < cost) {
      showNotification("Error: Not enough credits to perform this verification.");
      return;
    }
    
    setIsLoading(true);
    setResults([]);
    setProgress(0);
    
    try {
      const verificationResults = await verifyEmails(emails, setProgress);
      setResults(verificationResults);
      setCredits(prev => prev - cost);
      showNotification("Verification complete!");
    } catch (error) {
      console.error("Verification failed:", error);
      showNotification("An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  }, [credits]);

  const handlePurchase = (purchasedCredits: number) => {
    setCredits(prev => prev + purchasedCredits);
    showNotification(`${purchasedCredits.toLocaleString()} credits added successfully!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <div className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Email Verification, Simplified
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Clean your email lists with 99% accuracy. Verify emails in bulk and protect your sender reputation.
            </p>
            <p className="mt-2 text-blue-500 font-semibold">Credits Remaining: {credits.toLocaleString()}</p>
          </div>
          
          <div className="mt-10">
            <EmailInput onVerify={handleVerify} isLoading={isLoading} credits={credits} />
          </div>
          
          {isLoading && (
            <div className="mt-8 max-w-2xl mx-auto px-4">
              <ProgressBar progress={progress} />
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">Verification in progress... {progress}%</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="mt-8 max-w-md mx-auto px-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
                        Verification Cost Breakdown
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm">Emails Verified</span>
                            <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{results.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                            <span className="text-sm">Cost per Email</span>
                            <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">{VERIFICATION_COST_PER_EMAIL} Credit</span>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                        <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Total Cost</span>
                            <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                                {results.length * VERIFICATION_COST_PER_EMAIL} Credits
                            </span>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {notification && (
            <div className="fixed top-20 right-5 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-4 z-50 animate-pulse">
              {notification}
            </div>
          )}
          
          <ResultsTable results={results} />
        </div>
        <HowItWorks />
        <Pricing onPurchase={handlePurchase} />
      </main>
      {results.length > 0 && <Summary results={results} creditsRemaining={credits} />}
      <Footer />
    </div>
  );
};

export default App;
