import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark' | 'icon-only';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-base font-bold tracking-wider',
    md: 'text-xl font-extrabold tracking-wider',
    lg: 'text-3xl font-extrabold tracking-widest'
  };

  const subSizes = {
    sm: 'text-[9px] tracking-widest uppercase',
    md: 'text-[11px] tracking-wider uppercase font-semibold',
    lg: 'text-xs tracking-widest uppercase font-semibold'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`} id="bridge-ethiopia-brand-logo">
      {/* Heraldic Emblem SVG */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular background with golden halo */}
          <circle cx="50" cy="50" r="47" fill="#1E3A2F" stroke="#D49A3D" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="44" stroke="#E5AC4D" strokeWidth="0.75" strokeDasharray="2 2" />

          {/* Rolling Jimma/Oromia Green Mountains */}
          <path
            d="M 6 68 Q 28 48 50 64 Q 72 48 94 68 L 94 90 Q 50 94 6 90 Z"
            fill="#2D5A47"
          />
          <path
            d="M 12 74 Q 32 58 52 70 Q 72 58 88 74 L 88 92 Q 50 95 12 92 Z"
            fill="#1B4232"
          />

          {/* Sof Omar Limestone Cave Archway */}
          <path
            d="M 32 88 C 32 62, 68 62, 68 88 Z"
            fill="#C49658"
            opacity="0.85"
          />
          <path
            d="M 38 88 C 38 70, 62 70, 62 88 Z"
            fill="#12251D"
          />

          {/* The Connecting Golden Bridge */}
          <path
            d="M 16 66 Q 50 48 84 66"
            stroke="#F4BE5E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bridge Suspension Cables */}
          <line x1="28" y1="58" x2="28" y2="70" stroke="#F4BE5E" strokeWidth="1.2" />
          <line x1="40" y1="53" x2="40" y2="67" stroke="#F4BE5E" strokeWidth="1.2" />
          <line x1="50" y1="51" x2="50" y2="65" stroke="#F4BE5E" strokeWidth="1.5" />
          <line x1="60" y1="53" x2="60" y2="67" stroke="#F4BE5E" strokeWidth="1.2" />
          <line x1="72" y1="58" x2="72" y2="70" stroke="#F4BE5E" strokeWidth="1.2" />

          {/* Golden Sun & Globe Travel Arc */}
          <circle cx="50" cy="30" r="13" fill="#D49A3D" opacity="0.95" />
          <path
            d="M 15 36 A 38 38 0 0 1 85 36"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.8"
          />
          {/* Airplane Silhouette */}
          <path
            d="M 76 30 L 80 31 L 82 28 L 81 33 L 84 34 L 81 35 L 82 40 L 80 37 L 76 38 Z"
            fill="#FFFFFF"
          />

          {/* Traditional Clay Jebena Coffee Pot (Center Crest) */}
          <g transform="translate(42, 21) scale(0.16)">
            {/* Jebena base bulb */}
            <ellipse cx="50" cy="65" rx="30" ry="26" fill="#1C1815" stroke="#D49A3D" strokeWidth="3" />
            {/* Jebena tall neck */}
            <path d="M 42 22 L 58 22 L 54 44 L 46 44 Z" fill="#1C1815" stroke="#D49A3D" strokeWidth="3" />
            {/* Jebena spout */}
            <path d="M 32 54 Q 16 42 24 30" stroke="#D49A3D" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Jebena handle */}
            <path d="M 68 50 Q 86 44 64 26" stroke="#D49A3D" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Steam of coffee aroma */}
            <path d="M 50 16 Q 48 10 52 4" stroke="#FAF6EE" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          </g>

          {/* Traditional Mesob Basket Motif around Base */}
          <path
            d="M 44 87 L 56 87 L 54 94 L 46 94 Z"
            fill="#D49A3D"
            stroke="#FAF6EE"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display ${titleSizes[size]} ${
                isLight ? 'text-white' : 'text-[#1E3A2F]'
              }`}
            >
              BRIDGE ETHIOPIA
            </span>
          </div>
          <span
            className={`${subSizes[size]} ${
              isLight ? 'text-[#E5AC4D]' : 'text-[#B85C38]'
            } font-medium tracking-wider`}
          >
            Your Trusted Local Guide
          </span>
        </div>
      )}
    </div>
  );
};
