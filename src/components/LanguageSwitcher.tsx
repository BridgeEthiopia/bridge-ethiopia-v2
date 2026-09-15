import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'dropdown' | 'segmented';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Grid style for mobile drawer or dedicated panels
  if (variant === 'segmented') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-[#FAF6EE] border border-[#E8E1D5] rounded-xl ${className}`}>
        {SUPPORTED_LANGUAGES.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'text-[#6B6155] hover:text-[#1E3A2F] hover:bg-[#E8E1D5]/60 bg-white/70 border border-[#E8E1D5]/40'
              }`}
              title={item.name}
            >
              <span className="text-sm leading-none">{item.flag}</span>
              <span className="truncate">{item.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact pill or dropdown for top navigation bar
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F3EAD8] border border-[#E8E1D5] text-[#1E3A2F] text-xs font-semibold transition-all shadow-sm cursor-pointer"
        aria-expanded={isOpen}
        aria-label={t('lang_toggle_aria', 'Select language')}
      >
        <Globe className="w-3.5 h-3.5 text-[#D49A3D]" />
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className="font-bold tracking-wider">{currentOption.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-[#8C7E6D] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-[#E8E1D5] shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-[#F0EAE1] text-[11px] font-bold text-[#8C7E6D] uppercase tracking-wider">
            {t('lbl_select_lang', 'Select Language')}
          </div>
          {SUPPORTED_LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#1E3A2F]/5 text-[#1E3A2F] font-bold'
                    : 'text-[#4A4036] hover:bg-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{item.flag}</span>
                  <div>
                    <div className="font-semibold text-[#1E3A2F]">{item.nativeName}</div>
                    <div className="text-[10px] text-[#8C7E6D]">{item.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#1E3A2F]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
