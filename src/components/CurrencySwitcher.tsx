import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { ChevronDown, Coins, Check } from 'lucide-react';

interface CurrencySwitcherProps {
  variant?: 'compact' | 'dropdown' | 'segmented';
  className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { currency, setCurrency, availableCurrencies, currentConfig } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'segmented') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-[#FAF6EE] border border-[#E8E1D5] rounded-xl ${className}`}>
        {availableCurrencies.map((item) => {
          const isActive = currency === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setCurrency(item.code)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'text-[#6B6155] hover:text-[#1E3A2F] hover:bg-[#E8E1D5]/60 bg-white/70 border border-[#E8E1D5]/40'
              }`}
              title={`${item.name} (${item.code})`}
            >
              <span className="text-sm leading-none">{item.flag}</span>
              <span className="font-bold">{item.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-[#1E3A2F] border border-[#E8E1D5] shadow-2xs hover:border-[#D49A3D]/60 transition-all text-xs font-bold focus:outline-none"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <Coins className="w-3.5 h-3.5 text-[#D49A3D]" />
        <span>{currentConfig.flag}</span>
        <span className="font-bold">{currentConfig.code}</span>
        <span className="text-[10px] text-[#8C7E6D]">({currentConfig.symbol.trim()})</span>
        <ChevronDown className={`w-3 h-3 text-[#8C7E6D] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white shadow-xl border border-[#E8E1D5] py-2 z-50 animate-in fade-in duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C7E6D] uppercase tracking-wider border-b border-[#E8E1D5]">
            Display Currency
          </div>
          <div className="py-1">
            {availableCurrencies.map((item) => {
              const isActive = currency === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setCurrency(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    isActive
                      ? 'bg-[#FAF6EE] text-[#1E3A2F] font-bold'
                      : 'text-[#5C5247] hover:bg-[#FAF8F5] hover:text-[#1E3A2F]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.flag}</span>
                    <div className="text-left">
                      <div className="font-bold flex items-center gap-1">
                        <span>{item.code}</span>
                        <span className="text-[11px] text-[#8C7E6D]">({item.symbol.trim()})</span>
                      </div>
                      <div className="text-[10px] text-[#8C7E6D]">{item.name}</div>
                    </div>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#1E3A2F]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
