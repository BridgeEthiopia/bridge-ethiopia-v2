export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'ETB';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateFromUSD: number; // 1 USD = rate * Currency
  decimals: number;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rateFromUSD: 1.0,
    decimals: 0,
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    rateFromUSD: 0.92,
    decimals: 0,
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    rateFromUSD: 0.79,
    decimals: 0,
  },
  {
    code: 'ETB',
    symbol: 'ETB ',
    name: 'Ethiopian Birr',
    flag: '🇪🇹',
    rateFromUSD: 125.0,
    decimals: 0,
  },
];

export function convertAmount(amountUSD: number, targetCurrency: CurrencyCode): number {
  const config = SUPPORTED_CURRENCIES.find((c) => c.code === targetCurrency) || SUPPORTED_CURRENCIES[0];
  return Math.round(amountUSD * config.rateFromUSD);
}

export function formatCurrency(
  amountUSD: number,
  currencyCode: CurrencyCode = 'USD',
  options?: { perPerson?: boolean; prefixFrom?: boolean }
): string {
  if (amountUSD <= 0) {
    return 'Custom Quote';
  }

  const config = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];
  const converted = convertAmount(amountUSD, currencyCode);
  const formattedNumber = converted.toLocaleString();

  const formattedAmount = `${config.symbol}${formattedNumber}`;
  const withPrefix = options?.prefixFrom ? `From ${formattedAmount}` : formattedAmount;
  return options?.perPerson ? `${withPrefix} / person` : withPrefix;
}
