import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/ethiopiaData';
import { Destination, RegionId } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Check, 
  Compass,
  Building,
  TreePine,
  Search,
  BookOpen
} from 'lucide-react';

interface ExploreProps {
  onSelectDestination: (dest: Destination) => void;
  onBookExperience: (destTitle: string) => void;
}

const REGION_DEFINITIONS: { id: string; label: string }[] = [
  { id: 'all', label: 'All of Ethiopia' },
  { id: 'tigray', label: 'Tigray Heritage' },
  { id: 'northern-ethiopia', label: 'Northern Ethiopia' },
  { id: 'southern-ethiopia', label: 'Southern Ethiopia' },
  { id: 'addis-ababa', label: 'Addis Ababa' },
  { id: 'oromia', label: 'Oromia Region' },
  { id: 'eastern-ethiopia', label: 'Eastern Ethiopia' },
  { id: 'afar-danakil', label: 'Afar & Danakil' },
  { id: 'kafa-southwest', label: 'Kafa & Rainforests' },
];

export const ExploreEthiopiaSection: React.FC<ExploreProps> = ({
  onSelectDestination,
  onBookExperience,
}) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const regionsWithCounts = REGION_DEFINITIONS.map((r) => ({
    ...r,
    count: r.id === 'all' 
      ? DESTINATIONS_DATA.length 
      : DESTINATIONS_DATA.filter((d) => d.region === r.id).length,
  }));

  const filteredDestinations = DESTINATIONS_DATA.filter((dest) => {
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.regionLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.keyAttractions.some((attr) => attr.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="explore-ethiopia-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>{t('destinations_badge', 'Authentic Regions & Sacred Sites')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            {t('destinations_title', 'Explore Ethiopia\'s Majestic Destinations')}
          </h2>
          
          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            {t('destinations_desc', 'From ancient rock-hewn wonders and dramatic volcanic lakes to vibrant tribal cultures and mountain peaks.')}
          </p>

          <div className="pt-1">
            <button
              onClick={() => {
                const mapEl = document.getElementById('interactive-ethiopia-map');
                if (mapEl) {
                  mapEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F]/40 text-[#1E3A2F] text-xs font-bold shadow-xs hover:shadow-sm transition-all"
            >
              <Compass className="w-4 h-4 text-[#D49A3D]" />
              <span>View On Interactive Google Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C7E6D]" />
            </button>
          </div>
        </div>

        {/* Search & Region Filter Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Region Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 no-scrollbar">
              {regionsWithCounts.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedRegion === reg.id
                      ? 'bg-[#1E3A2F] text-white shadow-sm'
                      : 'bg-white text-[#52483E] hover:bg-[#E8E1D5]/60 border border-[#E8E1D5]'
                  }`}
                >
                  <span>{reg.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedRegion === reg.id ? 'bg-[#D49A3D] text-[#1E3A2F]' : 'bg-[#FAF8F5] text-[#8C7E6D]'
                  }`}>
                    {reg.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Keyword Search */}
            <div className="relative w-full sm:w-72 flex-shrink-0">
              <input
                type="text"
                placeholder="Search places (e.g. Wenchi, Lucy, Lalibela)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
              />
              <Search className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group img-zoom-parent"
              id={`destination-card-${dest.id}`}
            >
              {/* Card Image / Chronicle Header */}
              {dest.isChronicleOnly ? (
                <div className="relative min-h-[14rem] w-full p-5 sm:p-6 bg-gradient-to-br from-[#1E3A2F] via-[#162C23] to-[#0F1E18] text-white flex flex-col justify-between border-b border-[#D49A3D]/30">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[11px] font-bold tracking-wide">
                      {dest.regionLabel}
                    </span>
                    <span className="bg-white/10 text-white/90 border border-white/20 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] flex items-center gap-1 font-medium">
                      <BookOpen className="w-3 h-3 text-[#D49A3D]" />
                      <span>Historical Chronicle</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-4">
                    {dest.amharicName && (
                      <span className="text-[11px] text-[#D49A3D] font-medium tracking-wide block">
                        {dest.amharicName}
                      </span>
                    )}
                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-[#F4BE5E] transition-colors leading-snug">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#E8E1D5]/90 line-clamp-2 italic leading-relaxed">
                      "{dest.tagline}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D49A3D]">
                    <span className="flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3" />
                      In-Depth Written Record
                    </span>
                    <span className="text-white/70 text-[10px]">No Photo • Pure History</span>
                  </div>
                </div>
              ) : (
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <AuthenticImage
                    src={dest.heroImage}
                    alt={dest.name}
                    subjectName={dest.name}
                    photoKey={`dest-${dest.id}`}
                    photoCategory="destination"
                    className="w-full h-full object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Region Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-[#1E3A2F]/90 backdrop-blur-xs text-[#E5AC4D] text-[11px] font-bold tracking-wide border border-[#D49A3D]/40">
                      {dest.regionLabel}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3 text-[#D49A3D]" />
                    <span>Custom Itinerary</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold font-serif group-hover:text-[#F4BE5E] transition-colors drop-shadow-sm">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 italic">
                      {dest.tagline}
                    </p>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed line-clamp-3">
                  {dest.description}
                </p>

                {/* Key Highlights Chips */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#8C7E6D] block">Key Highlights</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.keyAttractions.slice(0, 3).map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] font-medium text-[#2E2822]"
                      >
                        {attr}
                      </span>
                    ))}
                    {dest.keyAttractions.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-[#FAF8F5] text-[10px] text-[#8C7E6D] font-medium">
                        +{dest.keyAttractions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-[#E8E1D5] flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="text-xs sm:text-sm font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Destination Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onBookExperience(dest.name)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-semibold shadow-xs"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Addis Ababa & Oromia Spotlight Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
          
          {/* Addis Ababa Highlight Feature */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1E3A2F] to-[#12241D] text-white space-y-4 shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[11px] font-extrabold uppercase tracking-wider">
                Dedicated Section
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif">Addis Ababa City Guide</h3>
              <p className="text-xs sm:text-sm text-[#D9D0C1] leading-relaxed">
                National Museum (Lucy), Unity Park, Mount Entoto panoramic views, Holy Trinity Cathedral, 
                Merkato walking adventures, traditional Tej houses, and authentic Tomoca coffee roasteries.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['National Museum', 'Mount Entoto', 'Unity Park', 'Merkato', 'Holy Trinity'].map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px]">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const addis = DESTINATIONS_DATA.find((d) => d.id === 'addis-ababa');
                    if (addis) onSelectDestination(addis);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white text-[#1E3A2F] hover:bg-[#FAF6EE] text-xs font-bold shadow-md transition-colors"
                >
                  Explore Addis Ababa In Depth
                </button>
              </div>
            </div>
          </div>

          {/* Oromia Region Highlight Feature */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#B85C38] to-[#8C3F22] text-white space-y-4 shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 rounded-full bg-white text-[#B85C38] text-[11px] font-extrabold uppercase tracking-wider">
                Dedicated Section
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif">Oromia Nature & Heritage</h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Wenchi Crater Lake horseback journeys, Bale Mountains Ethiopian Wolf tracking, 
                Sof Omar underground limestone caves, Bishoftu crater lakes, and authentic Oromo culinary culture.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Wenchi Crater Lake', 'Bale Mountains', 'Sof Omar Cave', 'Bishoftu Lakes', 'Oromo Cuisine'].map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[11px]">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedRegion('oromia');
                    window.scrollTo({ top: document.getElementById('explore-ethiopia-section')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white text-[#B85C38] hover:bg-[#FAF6EE] text-xs font-bold shadow-md transition-colors"
                >
                  View Oromia Destinations
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
