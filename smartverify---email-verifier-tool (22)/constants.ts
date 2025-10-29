
import { PricingPlan } from './types';

export const INITIAL_CREDITS = 500;
export const MAX_EMAILS_PER_BATCH = 100;
export const VERIFICATION_COST_PER_EMAIL = 1;

export const PRICING_PLANS: PricingPlan[] = [
  { credits: 500, pricePKR: 500, priceUSD: 5 },
  { credits: 2000, pricePKR: 1800, priceUSD: 15 },
  { credits: 5000, pricePKR: 4000, priceUSD: 25 },
];

export const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'temp-mail.org', 'guerrillamail.com', 'yopmail.com'
]);
