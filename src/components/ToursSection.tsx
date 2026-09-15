import React, { useState } from 'react';
import { TOURS_DATA } from '../data/ethiopiaData';
import { Tour } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { 
  Compass, 
  Users, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  SlidersHorizontal,
  Calendar
} from 'lucide-react';

interface ToursProps {
  onSelectTour: (tour: Tour) => void;
  onBookTour: (tourTitle: string) => void;
  onPlanCustomTrip: () => void;
}

export const ToursSection: React.FC<ToursProps> = ({
  onSelectTour,
  onBookTour,
  onPlanCustomTrip,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tours & Expeditions' },
    { id: 'City Tours', label: 'City Tours' },
    { id: 'Historical & UNESCO', label: 'Historical & UNESCO' },
    { id: 'Nature & Trekking', label: 'Nature & Trekking' },
    { id: 'Food & Culinary', label: 'Food & Cooking' },
    { id: 'Coffee Trail', label: 'Coffee Ceremonies' },
    { id: 'Wildlife & Birding', label: 'Wildlife & Safaris' },
    { id: 'Cultural & Tribal', label: 'Cultural Immersion' },
  ];

  const filteredTours = TOURS_DATA.filter((tour) => {
    if (selectedCategory === 'all') return true;
    return tour.category === selectedCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="tours-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Curated Journeys</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Popular <span className="text-[#B85C38] font-serif italic">Tours & Expeditions</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Private, family, group, and custom-tailored itineraries led by licensed local guides 
            with authentic cultural sensitivity and transparent pricing.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'bg-white text-[#52483E] hover:bg-[#E8E1D5] border border-[#E8E1D5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group img-zoom-parent"
              id={`tour-card-${tour.id}`}
            >
              {/* Tour Image */}
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <AuthenticImage
                    src={tour.image}
                    alt={tour.title}
                    subjectName={tour.title}
                    photoKey={`tour-${tour.id}`}
                    photoCategory="tour"
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#1E3A2F]/90 backdrop-blur-xs text-[#D49A3D] text-[11px] font-bold">
                      {tour.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs text-white px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 font-semibold">
                    <Star className="w-3.5 h-3.5 text-[#D49A3D] fill-[#D49A3D]" />
                    <span>{tour.rating}</span>
                  </div>

                  {/* Card Bottom Overlay */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-end justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#E5AC4D] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Private Guided</span>
                    </div>
                    <div className="text-right text-xs text-white/90 font-medium">
                      Flexible Itinerary
                    </div>
                  </div>
                </div>

                {/* Tour Info */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <h3 className="text-lg font-bold font-serif text-[#1E3A2F] group-hover:text-[#B85C38] transition-colors line-clamp-2">
                    {tour.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed line-clamp-3">
                    {tour.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#8C7E6D] block tracking-wider">
                      Tour Highlights
                    </span>
                    <ul className="space-y-1 text-xs text-[#423B33]">
                      {tour.highlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                          <span className="text-[#34A853] font-bold">✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 border-t border-[#E8E1D5] flex items-center justify-between gap-2 mt-4">
                <button
                  onClick={() => onSelectTour(tour)}
                  className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors"
                >
                  <span>View Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onBookTour(tour.title)}
                  className="px-4 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tour Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#FAF0E6] border border-[#E8DACB] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#B85C38] text-white text-[11px] font-bold uppercase tracking-wider">
              Tailored For You
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A2F] font-serif">
              Want a 100% Personalized Itinerary?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5247] max-w-xl">
              Tell us your desired destinations, pace, food preferences, and travel dates. 
              Founder Hindek will create a custom itinerary for you or your group.
            </p>
          </div>

          <button
            onClick={onPlanCustomTrip}
            className="px-6 py-3.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all whitespace-nowrap flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#D49A3D]" />
            <span>Build My Custom Trip</span>
          </button>
        </div>

      </div>
    </section>
  );
};
