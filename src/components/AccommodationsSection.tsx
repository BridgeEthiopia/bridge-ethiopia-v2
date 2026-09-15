import React, { useState } from 'react';
import { ACCOMMODATIONS_DATA } from '../data/ethiopiaData';
import { Accommodation } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { 
  Building, 
  MapPin, 
  Star, 
  Check, 
  ArrowRight, 
  ShieldCheck,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface AccommodationProps {
  onInquireStay: (stayName: string) => void;
}

export const AccommodationsSection: React.FC<AccommodationProps> = ({
  onInquireStay,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { id: 'all', label: 'All Stays' },
    { id: 'eco-lodge', label: 'Eco-Lodges & Nature' },
    { id: 'heritage', label: 'Boutique & Heritage' },
    { id: 'luxury-city', label: 'Addis Luxury Stays' },
    { id: 'resort', label: 'Lake & Spa Resorts' },
  ];

  const filteredStays = ACCOMMODATIONS_DATA.filter((stay) => {
    if (selectedType === 'all') return true;
    return stay.type === selectedType;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="accommodations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Where to Stay in Ethiopia</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Curated <span className="text-[#B85C38] font-serif italic">Lodges & Stays</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            From cliffside eco-lodges overlooking mountain valleys to historic guesthouses in ancient walled cities, 
            we connect you with trusted, authentic, and verified accommodations.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedType === t.id
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'bg-white text-[#52483E] hover:bg-[#E8E1D5] border border-[#E8E1D5]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStays.map((stay) => (
            <div
              key={stay.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group img-zoom-parent"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <AuthenticImage
                    src={stay.image}
                    alt={stay.name}
                    subjectName={stay.name}
                    photoKey={`hotel-${stay.id}`}
                    photoCategory="hotel"
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#1E3A2F]/90 text-[#D49A3D] text-[11px] font-bold">
                      {stay.region}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 bg-black/60 text-white px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 font-semibold">
                    <Star className="w-3 h-3 text-[#D49A3D] fill-[#D49A3D]" />
                    <span>{stay.rating}</span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#F4BE5E] transition-colors">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-[#E8DACB] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{stay.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5">
                  <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed line-clamp-3">
                    {stay.description}
                  </p>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#8C7E6D] block tracking-wider">
                      Amenities & Features
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {stay.amenities.map((am, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] text-[#423B33]"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-[#E8E1D5] flex items-center justify-between gap-2 mt-4">
                <span className="text-xs font-semibold text-[#1E3A2F] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Verified Standards</span>
                </span>

                <button
                  onClick={() => onInquireStay(`Lodging Reservation: ${stay.name} (${stay.location})`)}
                  className="px-4 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
