
import React from 'react';
import { PRICING_PLANS } from '../constants';

interface PricingProps {
  onPurchase: (credits: number) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPurchase }) => {
  const [currency, setCurrency] = React.useState<'PKR' | 'USD'>('PKR');

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Pricing Plans
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
          Choose a plan that fits your needs. Top up your credits anytime.
        </p>
        
        <div className="mt-6 flex justify-center">
          <div className="relative rounded-lg p-1 bg-gray-200 dark:bg-gray-700 flex">
            <button
              onClick={() => setCurrency('PKR')}
              className={`relative w-24 py-2 text-sm font-medium rounded-md transition-colors ${currency === 'PKR' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              PKR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`relative w-24 py-2 text-sm font-medium rounded-md transition-colors ${currency === 'USD' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              USD
            </button>
            <div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md transition-transform duration-300 ease-in-out"
              style={{ width: '6rem', transform: `translateX(${currency === 'PKR' ? '0' : '100%'})` }}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{plan.credits.toLocaleString()} Credits</h3>
              <div className="mt-4 flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {currency === 'PKR' ? `Rs ${plan.pricePKR.toLocaleString()}` : `$${plan.priceUSD}`}
                </span>
              </div>
              <button
                onClick={() => onPurchase(plan.credits)}
                className="mt-6 w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
