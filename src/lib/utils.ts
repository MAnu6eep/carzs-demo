import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency into Lakh / Crore (e.g. ₹ 14.50 Lakh)
export function formatPrice(amount: number): string {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${amount.toLocaleString('en-IN')}`;
}

export function formatPriceFull(amount: number): string {
  return `₹ ${amount.toLocaleString('en-IN')}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('en-IN')} km`;
}

/**
 * EMI Calculation Formula:
 * E = P x R x (1+R)^N / ((1+R)^N - 1)
 * P = Principal (Loan amount = Car Price - Down Payment)
 * R = Monthly Interest Rate (Annual Rate / 12 / 100)
 * N = Tenure in Months
 */
export function calculateEMI(price: number, downPaymentPercent = 20, interestRateAnnual = 9.5, tenureYears = 5) {
  const downPayment = Math.round((price * downPaymentPercent) / 100);
  const principal = Math.max(0, price - downPayment);
  const monthlyRate = interestRateAnnual / 12 / 100;
  const tenureMonths = tenureYears * 12;

  if (principal <= 0 || monthlyRate <= 0 || tenureMonths <= 0) {
    return {
      monthlyEMI: 0,
      principal,
      downPayment,
      totalInterest: 0,
      totalPayment: 0,
    };
  }

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const monthlyEMI = Math.round(emi);
  const totalPayment = Math.round(monthlyEMI * tenureMonths);
  const totalInterest = Math.max(0, totalPayment - principal);

  return {
    monthlyEMI,
    principal,
    downPayment,
    totalInterest,
    totalPayment,
    tenureMonths,
  };
}
