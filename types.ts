export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  gallery?: string[];
  category: 'sweet' | 'savory' | 'drink' | 'healthy';
  moodTags: string[];
  rating: number;
  reviews: number;
  offer?: string;
}

export interface CartItem extends Snack {
  quantity: number;
}

export interface RitualRecommendation {
  snackId: string;
  reasoning: string;
  activity: string;
}

export interface Shop {
  name: string;
  address: string;
  uri?: string;
}

export enum AppView {
  INTRO = 'INTRO',
  BROWSE = 'BROWSE',
  MOOD_WIZARD = 'MOOD_WIZARD',
  CART = 'CART',
  CONFIRMATION = 'CONFIRMATION'
}

export interface MoodStat {
  name: string;
  value: number;
  fill: string;
}

export type CurrencyCode = 
  | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'SEK' | 'NZD' 
  | 'MXN' | 'SGD' | 'HKD' | 'NOK' | 'KRW' | 'TRY' | 'INR' | 'BRL' | 'ZAR' | 'RUB'
  | 'IDR' | 'SAR' | 'AED' | 'THB' | 'PLN' | 'ILS' | 'DKK' | 'PHP' | 'MYR' | 'CZK'
  | 'HUF' | 'CLP' | 'PKR' | 'EGP' | 'BDT' | 'NGN' | 'VND';

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.5,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.23,
  SEK: 10.35,
  NZD: 1.65,
  MXN: 16.70,
  SGD: 1.35,
  HKD: 7.82,
  NOK: 10.65,
  KRW: 1335.50,
  TRY: 32.10,
  INR: 83.50,
  BRL: 5.05,
  ZAR: 18.80,
  RUB: 92.50,
  IDR: 15800,
  SAR: 3.75,
  AED: 3.67,
  THB: 36.50,
  PLN: 3.95,
  ILS: 3.65,
  DKK: 6.85,
  PHP: 56.20,
  MYR: 4.75,
  CZK: 23.35,
  HUF: 360.50,
  CLP: 975.00,
  PKR: 278.50,
  EGP: 47.50,
  BDT: 109.50,
  NGN: 1300.00,
  VND: 24800
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CHF: 'Fr',
  CNY: '¥',
  SEK: 'kr',
  NZD: 'NZ$',
  MXN: '$',
  SGD: 'S$',
  HKD: 'HK$',
  NOK: 'kr',
  KRW: '₩',
  TRY: '₺',
  INR: '₹',
  BRL: 'R$',
  ZAR: 'R',
  RUB: '₽',
  IDR: 'Rp',
  SAR: '﷼',
  AED: 'د.إ',
  THB: '฿',
  PLN: 'zł',
  ILS: '₪',
  DKK: 'kr',
  PHP: '₱',
  MYR: 'RM',
  CZK: 'Kč',
  HUF: 'Ft',
  CLP: '$',
  PKR: '₨',
  EGP: 'E£',
  BDT: '৳',
  NGN: '₦',
  VND: '₫'
};