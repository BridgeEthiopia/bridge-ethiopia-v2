import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Compass, 
  Car, 
  Plane, 
  CalendarCheck, 
  PhoneCall, 
  HeartHandshake, 
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface TrustBadgesBannerProps {
  onOpenTravelTips?: () => void;
  defaultOpen?: boolean;
}

export const TrustBadgesBanner: React.FC<TrustBadgesBannerProps> = ({ 
  onOpenTravelTips,
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badges = [
    {
      icon: ShieldCheck,
      title: 'Certified Local Host & Guide',
      subtitle: 'Official Ethiopian tourism certification with authentic local knowledge',
      accent: 'text-[#34A853]',
      bg: 'bg-[#34A853]/10',
    },
    {
      icon: Car,
      title: 'Private Insured 4x4 Land Cruisers',
      subtitle: 'Modern A/C vehicles & experienced drivers for mountains, rift valley & deserts',
      accent: 'text-[#D49A3D]',
      bg: 'bg-[#D49A3D]/10',
    },
    {
      icon: Plane,
      title: 'Bole Airport Meet & Greet',
      subtitle: 'Direct personal pickup at Addis Ababa Bole Airport with SIM & exchange help',
      accent: 'text-[#2D9CDB]',
      bg: 'bg-[#2D9CDB]/10',
    },
    {
      icon: CalendarCheck,
      title: '100% Flexible & Tailored Dates',
      subtitle: 'Bespoke private journeys with custom pace and flexible rescheduling',
      accent: 'text-[#9B51E0]',
      bg: 'bg-[#9B51E0]/10',
    },
    {
      icon: PhoneCall,
      title: '24/7 Direct WhatsApp & Phone Care',
      subtitle: `Direct WhatsApp connection with Founder Hindek (${FOUNDER_INFO.whatsappDisplay})`,
      accent: 'text-[#25D366]',
      bg: 'bg-[#25D366]/10',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical & Community-First Tourism',
      subtitle: 'Direct support for local village elders, weavers, cooks, and artisans',
      accent: 'text-[#B85C38]',
      bg: 'bg-[#B85C38]/10',
    },
  ];

  return (
    <section 
      className="bg-white border-y border-[#E8E1D5] py-8 sm:py-10 relative overflow-hidden transition-all duration-300" 
      id="trust-guarantee-section"
    >
      {/* Decorative ambient background tints */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D49A3D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E3A2F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clickable Header Accordion Trigger */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF0E6] border border-[#E8DACB] hover:border-[#D49A3D]/70 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          aria-expanded={isOpen}
          aria-controls="trust-guarantee-content"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Traveler Peace of Mind & Safety Guarantee</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1E3A2F] group-hover:text-[#B85C38] transition-colors">
                Why Discerning International Travelers Trust Bridge Ethiopia
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E51] line-clamp-1">
                Certified Local Host • Private Insured 4x4s • Bole Airport Pickup • 24/7 WhatsApp with Founder Hindek
              </p>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <button
              type="button"
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isOpen 
                  ? 'bg-[#1E3A2F] text-white shadow-xs' 
                  : 'bg-[#D49A3D] hover:bg-[#c28b34] text-[#1E3A2F] shadow-xs'
              }`}
            >
              <span>{isOpen ? 'Close Guarantee Details' : 'Click to Open Safety Guarantees'}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4 animate-bounce" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Content (Opens when user clicks) */}
        {isOpen && (
          <div 
            id="trust-guarantee-content"
            className="mt-6 pt-6 border-t border-[#E8DACB]/60 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {/* Header Description & Travel Tips CTA */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DACB]">
              <div className="space-y-2 max-w-2xl">
                <p className="text-sm sm:text-base text-[#4A4036] leading-relaxed font-medium">
                  Led personally by founder <strong>{FOUNDER_INFO.name}</strong>, we bridge international guests directly with the living heart of Ethiopia—with safety, premium logistics, and genuine human warmth.
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#2E7D32] font-semibold">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Licensed & Insured
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> No Middlemen
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Personalized Care
                  </span>
                </div>
              </div>

              {onOpenTravelTips && (
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTravelTips();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF0E6] border-2 border-[#D49A3D] text-[#1E3A2F] text-xs font-bold shadow-xs transition-all hover:scale-102 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#D49A3D]" />
                    <span>View Ethiopia Travel Essentials (eVisa & Packing)</span>
                  </button>
                </div>
              )}
            </div>

            {/* 6 Guarantee Grid Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {badges.map((b, i) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E8E1D5] hover:border-[#D49A3D]/60 transition-all hover:shadow-md flex items-start gap-4 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${b.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-5 h-5 ${b.accent}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#1E3A2F] group-hover:text-[#B85C38] transition-colors leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-xs text-[#5C5247] leading-relaxed">
                        {b.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Direct WhatsApp Support Box */}
            <div className="rounded-2xl p-5 bg-[#FAF0E6] border border-[#E8DACB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-[#1E3A2F] font-bold">
                    Planning your trip to Ethiopia? Get personal answers from Founder Hindek in minutes.
                  </p>
                  <p className="text-xs text-[#6B5E51]">
                    Ask about itineraries, private 4x4 availability, and custom dates directly.
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                  "Hello Hindek! I am planning a trip to Ethiopia and would love to ask a few questions about tours and dates."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all hover:scale-102 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Ask Hindek on WhatsApp</span>
                <span className="text-white/90 text-xs">({FOUNDER_INFO.whatsappDisplay})</span>
              </a>
            </div>

            {/* Bottom Collapse Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#5C5247] hover:text-[#1E3A2F] text-xs font-semibold transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Collapse / Hide Guarantees</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
