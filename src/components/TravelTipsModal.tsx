import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Wifi, 
  Banknote, 
  HeartPulse, 
  Sun, 
  Compass, 
  ExternalLink, 
  Check, 
  Info,
  ShieldCheck,
  MessageCircle,
  Phone
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface TravelTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelTipsModal: React.FC<TravelTipsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'visa' | 'money' | 'sim' | 'health' | 'seasons'>('visa');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#E8DACB]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#1E3A2F] text-white flex items-center justify-between shrink-0 border-b border-[#D49A3D]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif">
                Ethiopia Travel Essentials & Visitor Guide
              </h2>
              <p className="text-xs text-white/80">
                Official advice from local host {FOUNDER_INFO.name} for smooth arrivals
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#E8DACB] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('visa')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'visa'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#5C5247] hover:bg-[#E8DACB]/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>eVisa & Entry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('money')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'money'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#5C5247] hover:bg-[#E8DACB]/60'
            }`}
          >
            <Banknote className="w-3.5 h-3.5 text-[#34A853]" />
            <span>Cash, Currency & ATMs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sim')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sim'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#5C5247] hover:bg-[#E8DACB]/60'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-[#2D9CDB]" />
            <span>SIM Card & Airport</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seasons')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'seasons'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#5C5247] hover:bg-[#E8DACB]/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-[#F2994A]" />
            <span>Best Season to Visit</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('health')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'health'
                ? 'bg-[#1E3A2F] text-white shadow-xs'
                : 'text-[#5C5247] hover:bg-[#E8DACB]/60'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-[#EB5757]" />
            <span>Health & Packing</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#423B33] leading-relaxed flex-1">
          {activeTab === 'visa' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF0E6] border border-[#E8DACB] flex items-start gap-3">
                <Info className="w-5 h-5 text-[#B85C38] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1E3A2F] text-sm">
                    Apply Only via the Official Ethiopian eVisa Portal
                  </h3>
                  <p className="text-xs text-[#5C5247]">
                    Never use third-party broker websites that overcharge. The single official government portal is:
                  </p>
                  <a
                    href="https://www.evisa.gov.et"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#1E3A2F] font-bold underline hover:text-[#B85C38] text-xs pt-1"
                  >
                    <span>www.evisa.gov.et</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#1E3A2F] text-xs uppercase tracking-wider">
                  Important eVisa Requirements
                </h4>
                <ul className="space-y-2 text-xs text-[#423B33]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Passport Validity:</strong> Must be valid for at least 6 months past your arrival date.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Processing Time:</strong> Usually approved within 48 to 72 hours. Apply at least 1–2 weeks before departure.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Duration:</strong> Single-entry 30-day or 90-day tourist visas are available.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Print Your Approval:</strong> Print two copies of your approved eVisa PDF to present at Bole Airport immigration.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'money' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] flex items-start gap-3">
                <Banknote className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#1B5E20] text-sm">
                    Bring Crisp, Uncreased Cash (USD or EUR)
                  </h3>
                  <p className="text-xs text-[#2E7D32]">
                    Local banks and official forex exchange counters in Addis Ababa strictly require US Dollar bills printed in <strong>2013 or newer</strong> with no tears, stamps, or ink marks.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#1E3A2F] text-xs uppercase tracking-wider">
                  Currency & Payments Practical Tips
                </h4>
                <ul className="space-y-2 text-xs text-[#423B33]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Local Currency:</strong> Ethiopian Birr (ETB). Official exchange rate fluctuates (~130–140 ETB per 1 USD).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Credit Cards:</strong> Visa and Mastercard work at major Addis Ababa hotels and upscale restaurants, but cash (Birr) is required for markets, tips, crafts, and roadside coffee.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>ATMs:</strong> Dashen Bank, Awash Bank, and Commercial Bank of Ethiopia (CBE) ATMs accept foreign cards in Addis Ababa.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'sim' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#E1F5FE] border border-[#B3E5FC] flex items-start gap-3">
                <Wifi className="w-5 h-5 text-[#0288D1] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#01579B] text-sm">
                    Getting a Local SIM Card at Bole Airport
                  </h3>
                  <p className="text-xs text-[#0288D1]">
                    As you exit baggage claim into the arrivals hall at Bole Terminal 2, you will find official kiosks for <strong>Ethio Telecom</strong> and <strong>Safaricom Ethiopia</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#1E3A2F] text-xs uppercase tracking-wider">
                  Setup Instructions
                </h4>
                <ul className="space-y-2 text-xs text-[#423B33]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Passport Required:</strong> Show your physical passport and pay for a tourist data package (~$5 to $15 for 15GB–30GB).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Network Coverage:</strong> Ethio Telecom has the broadest 4G/LTE coverage in regional areas (Lalibela, Bale, Arba Minch).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Airport Pickup:</strong> If you booked airport transfer with Hindek, she will meet you outside the exit and help you complete the SIM registration in minutes!</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'seasons' && (
            <div className="space-y-4">
              <h3 className="font-bold text-[#1E3A2F] text-sm">
                Best Times to Visit by Destination
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                  <h4 className="font-bold text-[#1E3A2F] text-xs">Historic North & Lalibela</h4>
                  <p className="text-xs text-[#6B5E51] mt-1">
                    <strong>October – March:</strong> Sunny, lush green after rains, ideal for festivals (Meskel in Sept, Ganna in Jan, Timket in Jan).
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                  <h4 className="font-bold text-[#1E3A2F] text-xs">Danakil Depression</h4>
                  <p className="text-xs text-[#6B5E51] mt-1">
                    <strong>November – February:</strong> Mildest desert temperatures (30°C–38°C) for climbing Erta Ale volcano safely.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                  <h4 className="font-bold text-[#1E3A2F] text-xs">Bale Mountains & Sanetti</h4>
                  <p className="text-xs text-[#6B5E51] mt-1">
                    <strong>October – April:</strong> Dry trekking season, highest visibility for tracking the rare Ethiopian Wolf.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5]">
                  <h4 className="font-bold text-[#1E3A2F] text-xs">Southern Ethiopia & Omo Valley</h4>
                  <p className="text-xs text-[#6B5E51] mt-1">
                    <strong>December – March & June – September:</strong> Dry roads for smooth 4x4 safaris and Lake Chamo boat excursions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFF3E0] border border-[#FFE0B2] flex items-start gap-3">
                <HeartPulse className="w-5 h-5 text-[#E65100] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-bold text-[#E65100] text-sm">
                    Altitude & Climate in Addis Ababa
                  </h3>
                  <p className="text-xs text-[#BF360C]">
                    Addis Ababa sits at 2,400 meters (8,000 ft) elevation. Drink plenty of bottled water on your first 24 hours to stay well hydrated.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#1E3A2F] text-xs uppercase tracking-wider">
                  Health & Packing Recommendations
                </h4>
                <ul className="space-y-2 text-xs text-[#423B33]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Vaccines:</strong> Yellow Fever certificate required if traveling from an endemic country. Routine travel vaccines recommended.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Clothing for Churches:</strong> Modest clothing covering shoulders and knees. Slip-on shoes are convenient as shoes are removed before entering ancient rock churches.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                    <span><strong>Evenings:</strong> Highland nights in Addis Ababa, Lalibela, and Bale Mountains get brisk (10°C–14°C), so pack a warm fleece or light jacket.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DACB] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#6B5E51] text-center sm:text-left">
            Have specific travel questions? Ask Hindek directly on WhatsApp:
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                "Hello Hindek! I have a few questions about preparing for my trip to Ethiopia."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Hindek</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-[#E8DACB] text-[#1E3A2F] text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
