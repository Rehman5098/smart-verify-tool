
import { EmailResult, VerificationStatus } from '../types';
import { DISPOSABLE_DOMAINS } from '../constants';

// A more robust regex for email syntax validation
const EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const isValidSyntax = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

const getDomain = (email: string): string => {
  return email.split('@')[1] || '';
};

// Simple hashing function to create deterministic "randomness"
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const simulateSmtpCheck = (domain: string): VerificationStatus => {
  const hash = simpleHash(domain);
  const value = hash % 100;

  if (value < 80) { // 80% chance of being valid
    return VerificationStatus.Valid;
  } else if (value < 90) { // 10% chance of being a catch-all
    return VerificationStatus.Unverifiable;
  } else { // 10% chance of being invalid (simulated no MX records)
    return VerificationStatus.Invalid;
  }
};

export const verifyEmails = async (
  emails: string[],
  onProgress: (progress: number) => void
): Promise<EmailResult[]> => {
  const results: EmailResult[] = [];
  const totalEmails = emails.length;

  for (let i = 0; i < totalEmails; i++) {
    const email = emails[i].trim();
    const domain = getDomain(email);
    let status: VerificationStatus;

    if (!isValidSyntax(email)) {
      status = VerificationStatus.Invalid;
    } else if (DISPOSABLE_DOMAINS.has(domain)) {
      status = VerificationStatus.Unverifiable;
    } else {
      status = simulateSmtpCheck(domain);
    }
    
    results.push({ email, status, domain });

    // Simulate network delay and update progress
    await new Promise(resolve => setTimeout(resolve, 50));
    onProgress(Math.round(((i + 1) / totalEmails) * 100));
  }

  return results;
};
