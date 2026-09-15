import React from 'react';
import { Destination } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { 
  X, 
  MapPin, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  Utensils, 
  Building, 
  ShieldCheck, 
  MessageCircle, 
  Mountain,
  ChevronRight
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookNow: (destinationTitle: string) => void;
  onPlanTrip: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onBookNow,
  onPlanTrip,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D5] relative text-[#2E2822]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close destination modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner (Authentic Real Photo) */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
          <AuthenticImage
            src={destination.heroImage}
            alt={destination.name}
            subjectName={destination.name}
            photoKey={`dest-${destination.id}`}
            photoCategory="destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          
          {/* Region Badge & Titles */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
                {destination.regionLabel}
              </span>
              {destination.oromoName && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-xs">
                  {destination.oromoName}
                </span>
              )}
              {destination.amharicName && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-xs">
                  {destination.amharicName}
                </span>
              )}
              {destination.tigrinyaName && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-xs">
                  {destination.tigrinyaName}
                </span>
              )}
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white drop-shadow-md">
              {destination.name}
            </h2>
            
            <p className="text-sm sm:text-base text-[#F4BE5E] font-medium italic drop-shadow-sm">
              "{destination.tagline}"
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#B85C38]" />
              <div>
                <span className="text-[#8C7E6D] text-[11px] block">Schedule Type</span>
                <span className="font-semibold text-[#1E3A2F]">Customizable Itinerary</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#D49A3D]" />
              <div>
                <span className="text-[#8C7E6D] text-[11px] block">Best Time to Visit</span>
                <span className="font-semibold text-[#1E3A2F]">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            {destination.elevation && (
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <Mountain className="w-4 h-4 text-[#1E3A2F]" />
                <div>
                  <span className="text-[#8C7E6D] text-[11px] block">Elevation</span>
                  <span className="font-semibold text-[#1E3A2F]">{destination.elevation}</span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-[#1E3A2F] font-serif">About this Destination</h3>
            <p className="text-[#52483E] leading-relaxed text-sm sm:text-base">
              {destination.description}
            </p>
          </div>

          {/* Why Visit Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#1E3A2F] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D49A3D]" />
              <span>Why Visit {destination.name}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {destination.whyVisit.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]/80 text-xs sm:text-sm text-[#423B33]">
                  <CheckCircle className="w-4 h-4 text-[#1E3A2F] flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Things to Do & Key Attractions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2F] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B85C38]" />
                <span>Things to Do</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#52483E]">
                {destination.thingsToDo.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] mt-2 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2F] flex items-center gap-2">
                <Building className="w-5 h-5 text-[#1E3A2F]" />
                <span>Key Landmarks & Attractions</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {destination.keyAttractions.map((attr, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1D5] text-xs font-medium text-[#2E2822]">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Culture & Food Highlights */}
          <div className="p-5 rounded-2xl bg-[#FAF0E6]/50 border border-[#E8DACB] space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#B85C38] mb-1">
                Culture & Living Heritage
              </h4>
              <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed">
                {destination.cultureAndHeritage}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E3A2F] mb-2 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-[#D49A3D]" />
                <span>Local Food Highlights</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {destination.localFoodHighlights.map((dish, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-white border border-[#E8DACB] text-xs font-semibold text-[#1E3A2F]">
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Tips */}
          <div className="space-y-2.5">
            <h3 className="text-base font-bold text-[#1E3A2F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#34A853]" />
              <span>Bridge Ethiopia Local Travel Tips</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.travelTips.map((tip, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#FAF8F5] text-xs text-[#5C5247] border border-[#E8E1D5]">
                  💡 {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Previews */}
          {destination.gallery && destination.gallery.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C7E6D]">
                Gallery of {destination.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {destination.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden aspect-4/3 border border-[#E8E1D5]">
                    <AuthenticImage
                      src={imgUrl}
                      alt={`${destination.name} gallery image ${idx + 1}`}
                      subjectName={`${destination.name} View ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Accommodations */}
          {destination.nearbyLodging && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                Recommended Lodging & Stays
              </h4>
              <div className="flex flex-wrap gap-2">
                {destination.nearbyLodging.map((stay, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white border border-[#E8E1D5] text-xs text-[#423B33] font-medium">
                    🏡 {stay}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs inside Modal */}
          <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#6B6155]">
              Guided by <strong className="text-[#1E3A2F]">{FOUNDER_INFO.name}</strong> & verified local guides
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                  `Hello Hindek! I am inquiring about visiting ${destination.name} with Bridge Ethiopia.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onPlanTrip();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#1E3A2F]/30 text-[#1E3A2F] font-bold text-xs hover:bg-[#E8E1D5] transition-colors"
              >
                Customize Trip
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookNow(destination.name);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request Booking</span>
                <ChevronRight className="w-4 h-4 text-[#D49A3D]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
