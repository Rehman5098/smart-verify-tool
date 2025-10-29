
export enum VerificationStatus {
  Valid = 'Valid',
  Invalid = 'Invalid',
  Unverifiable = 'Unverifiable',
}

export interface EmailResult {
  email: string;
  status: VerificationStatus;
  domain: string;
}

export interface PricingPlan {
  credits: number;
  pricePKR: number;
  priceUSD: number;
}
