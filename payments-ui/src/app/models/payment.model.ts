export interface Payment {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  clientRequestId: string;
  createdAt: string;
}

export interface CreatePaymentRequest {
  amount: number;
  currency: string;
  clientRequestId: string;
}

export interface UpdatePaymentRequest {
  amount: number;
  currency: string;
}

export const CURRENCIES = ['USD', 'EUR', 'INR', 'GBP'] as const;
export type Currency = (typeof CURRENCIES)[number];
