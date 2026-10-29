import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig, SUPPORTED_CURRENCIES, formatCurrency, convertAmount } from '../utils/currency';

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currentConfig: CurrencyConfig;
  formatPrice: (amountUSD: number, options?: { perPerson?: boolean; prefixFrom?: boolean }) => string;
  convertPrice: (amountUSD: number) => number;
  availableCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

const STORAGE_KEY = 'bridge_ethiopia_currency';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
      if (saved && SUPPORTED_CURRENCIES.some((c) => c.code === saved)) {
        return saved;
      }
    } catch {
      // LocalStorage unavailable fallback
    }
    return 'USD';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  };

  const currentConfig = SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];

  const formatPrice = (amountUSD: number, options?: { perPerson?: boolean; prefixFrom?: boolean }) => {
    return formatCurrency(amountUSD, currency, options);
  };

  const convertPrice = (amountUSD: number) => {
    return convertAmount(amountUSD, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentConfig,
        formatPrice,
        convertPrice,
        availableCurrencies: SUPPORTED_CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextValue => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
