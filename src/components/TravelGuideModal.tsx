import React from 'react';
import { 
  X, 
  BookOpen, 
  Calendar, 
  Compass, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Coffee, 
  MapPin, 
  Printer, 
  MessageCircle,
  Clock,
  Luggage,
  Award
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface TravelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanTrip?: () => void;
}

export const TravelGuideModal: React.FC<TravelGuideModalProps> = ({
  isOpen,
  onClose,
  onPlanTrip,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="travel-guide-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 text-[#2E2822]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#1E3A2F] text-white flex items-center justify-between border-b border-[#2E5445] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D49A3D]/20 border border-[#D49A3D]/40 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#D49A3D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="travel-guide-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Ethiopia Travel Guide &amp; Festival Calendar
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[10px] font-extrabold uppercase">
                  2025 / 2026 Edition
                </span>
              </div>
              <p className="text-xs text-[#E5AC4D]">
                Curated insider advice directly from Hindek &amp; the Bridge Ethiopia team
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Print or save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-left">
          
          {/* Welcome Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF5EC] to-[#F3ECE0] border border-[#D49A3D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D49A3D] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Boutique Local Insights</span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#1E3A2F]">
                Welcome to the Cradle of Humanity &amp; Coffee
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5044] max-w-xl leading-relaxed">
                Ethiopia follows its own 13-month calendar and ancient traditions. Here is what you need to travel safely, honor local culture, and experience the journey of a lifetime.
              </p>
            </div>

            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=Hello%20Hindek%2C%20I%20just%20read%20your%20Free%20Ethiopia%20Travel%20Guide%20and%20have%20a%20question!`}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Hindek on WhatsApp</span>
            </a>
          </div>

          {/* 1. Sacred Festivals Calendar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
              <Calendar className="w-5 h-5 text-[#D49A3D]" />
              <h3 className="text-base sm:text-lg font-bold text-[#1E3A2F]">
                1. Major Ethiopian Festivals (2025 – 2026)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1E3A2F]">Timkat (Epiphany)</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D49A3D]/20 text-[#8F5F1B] font-mono text-[11px] font-bold">Jan 19</span>
                </div>
                <p className="text-xs text-[#5A5044]">
                  Processions of sacred Tabots, baptismal blessings, white traditional <em>Shamma</em> robes in Gondar and Addis Ababa.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1E3A2F]">Meskel (Finding of True Cross)</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D49A3D]/20 text-[#8F5F1B] font-mono text-[11px] font-bold">Sep 27</span>
                </div>
                <p className="text-xs text-[#5A5044]">
                  Spectacular Demera bonfires, Adey Abeba yellow wildflowers, and UNESCO heritage night ceremonies at Meskel Square.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1E3A2F]">Irreecha (Oromo Thanksgiving)</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#34A853]/20 text-[#1E5C31] font-mono text-[11px] font-bold">Late Sep / Early Oct</span>
                </div>
                <p className="text-xs text-[#5A5044]">
                  Millions gather at sacred Lake Hora Harsadi (Bishoftu) with fresh green grass (Coqorsa) giving thanks to Waaqa.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1E3A2F]">Genna (Ethiopian Christmas)</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#D49A3D]/20 text-[#8F5F1B] font-mono text-[11px] font-bold">Jan 7</span>
                </div>
                <p className="text-xs text-[#5A5044]">
                  Pilgrimages to the 12th-century rock-hewn churches of Lalibela, all-night chanting, and traditional field games.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Best Seasons & Packing Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Weather & Seasons */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
                <Sun className="w-5 h-5 text-[#D49A3D]" />
                <h3 className="text-base font-bold text-[#1E3A2F]">
                  2. Best Months to Visit
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5A5044] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>October to March (Peak Season):</strong> Sunny, dry, clear highland skies. Ideal for Lalibela, Bale Mountains, and Simien trekking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>November to February:</strong> Best time for the Danakil Depression and Erta Ale volcano (cooler night temperatures).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>June to August (Kiremt):</strong> Heavy rains in the highlands, but the countryside turns brilliantly green and lush.</span>
                </li>
              </ul>
            </div>

            {/* Essential Packing List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
                <Luggage className="w-5 h-5 text-[#D49A3D]" />
                <h3 className="text-base font-bold text-[#1E3A2F]">
                  3. Essential Packing List
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-[#5A5044] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>Layered Clothing:</strong> Addis Ababa (2,355m) and Bale are chilly at night (8–12°C) but warm during the day (22–26°C).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>Slip-on Shoes / Socks:</strong> You must remove shoes when entering ancient churches and sacred homes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                  <span><strong>Modest Scarf / Shawl:</strong> Great for church visits, dust protection, and sudden cool breezes.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* 3. Cultural Etiquette & Practical Tips */}
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#D49A3D]" />
              <h3 className="text-base font-bold text-[#1E3A2F]">
                4. Cultural Etiquette &amp; Dining Traditions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5A5044]">
              <div className="p-3 bg-white rounded-xl border border-[#E8E1D5] space-y-1">
                <strong className="block text-[#1E3A2F]">Right Hand Dining</strong>
                <p>Always tear Injera and accept items with your right hand. Washing hands before and after meals is a sacred ritual.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8E1D5] space-y-1">
                <strong className="block text-[#1E3A2F]">Gursha (Act of Friendship)</strong>
                <p>If a host offers to feed you a morsel of food directly into your mouth (Gursha), it is a warm gesture of honor and hospitality.</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8E1D5] space-y-1">
                <strong className="block text-[#1E3A2F]">The 3 Cups of Coffee</strong>
                <p>The coffee ceremony consists of <em>Abol</em> (1st), <em>Tona</em> (2nd), and <em>Baraka</em> (3rd, the blessing). Drinking all three brings good fortune.</p>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E1D5]">
            <div className="text-xs text-[#8C7E6D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34A853]" />
              <span>Bridge Ethiopia • Official Local Guiding &amp; Concierge Platform</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onPlanTrip) onPlanTrip();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Plan My Customized Journey
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
