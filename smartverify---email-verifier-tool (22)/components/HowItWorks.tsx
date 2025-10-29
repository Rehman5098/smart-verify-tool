
import React from 'react';

const Step: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl">
        {number}
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
          Our four-step process ensures the highest accuracy for your email verification needs.
        </p>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <Step
              number={1}
              title="Syntax Check"
              description="We check for formatting errors, typos, and invalid characters to ensure the email address structure is correct."
            />
            <Step
              number={2}
              title="Domain Validation"
              description="We verify that the domain exists, is active, and isn't a known disposable or temporary email provider."
            />
            <Step
              number={3}
              title="MX Record Lookup"
              description="Our system looks for Mail Exchange (MX) records in the domain's DNS to confirm it can receive emails."
            />
            <Step
              number={4}
              title="SMTP Verification"
              description="A non-intrusive SMTP handshake simulates sending an email to check if the specific user mailbox exists on the server."
            />
          </dl>
        </div>
      </div>
    </div>
  );
};
