import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID').format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export function generateTransactionNumber(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `TRX${timestamp}${random}`.toUpperCase();
}

export function generateDepositNumber(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `DEP${timestamp}${random}`.toUpperCase();
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone: string): boolean {
  const re = /^(\+62|0)[0-9]{9,12}$/;
  return re.test(phone);
}
