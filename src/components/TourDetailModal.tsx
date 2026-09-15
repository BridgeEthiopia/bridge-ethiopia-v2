import React, { useState } from 'react';
import { Tour } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { WriteReviewModal } from './WriteReviewModal';
import { 
  X, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Star, 
  MessageCircle, 
  ChevronRight, 
  Calendar,
  Compass
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface TourDetailProps {
  tour: Tour | null;
  onClose: () => void;
  onBookTour: (tourTitle: string) => void;
}

export const TourDetailModal: React.FC<TourDetailProps> = ({
  tour,
  onClose,
  onBookTour,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D5] relative text-[#2E2822]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close tour details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <AuthenticImage
            src={tour.image}
            alt={tour.title}
            subjectName={tour.title}
            photoKey={`tour-${tour.id}`}
            photoCategory="tour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
          
          <div className="absolute top-5 left-5">
            <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
              {tour.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[#E5AC4D]">
                <Star className="w-4 h-4 fill-[#E5AC4D]" />
                <span className="font-bold">{tour.rating}</span>
                <span className="text-white/80">({tour.reviewsCount} verified traveler reviews)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="px-3 py-1 rounded-lg bg-black/50 hover:bg-black/70 border border-white/30 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer"
                title="Rate this tour or leave your review"
              >
                <Star className="w-3 h-3 text-[#D49A3D] fill-[#D49A3D]" />
                <span>Rate & Review Tour</span>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {tour.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm text-center">
            <div>
              <span className="text-[#8C7E6D] text-[11px] block">Schedule</span>
              <span className="font-bold text-[#1E3A2F]">Customizable Pace</span>
            </div>
            <div>
              <span className="text-[#8C7E6D] text-[11px] block">Group Size</span>
              <span className="font-bold text-[#1E3A2F]">{tour.groupSize}</span>
            </div>
            <div>
              <span className="text-[#8C7E6D] text-[11px] block">Booking Policy</span>
              <span className="font-bold text-[#1E3A2F] text-xs">Custom Quote</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed">
            {tour.shortDescription}
          </p>

          {/* Itinerary Steps */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#1E3A2F] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D49A3D]" />
              <span>Itinerary & Route Schedule</span>
            </h3>
            <div className="space-y-2.5">
              {tour.itinerarySummary.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-[#423B33]">
                  <span className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF0E6]/50 border border-[#E8DACB] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#34A853]" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#52483E]">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#34A853]">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D] flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-[#8C7E6D]" />
                <span>Not Included</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6B6155]">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span>–</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                `Hello Hindek! I am interested in booking: ${tour.title}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookTour(tour.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs tracking-wide shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Request Booking</span>
              <ChevronRight className="w-4 h-4 text-[#D49A3D]" />
            </button>
          </div>

        </div>
      </div>

      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        defaultExperience={tour.title}
      />
    </div>
  );
};
