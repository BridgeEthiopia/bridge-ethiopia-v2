import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { DESTINATIONS_DATA } from '../data/ethiopiaData';
import { Destination } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  Maximize2,
  Compass,
  Mountain,
  AlertCircle
} from 'lucide-react';

interface EthiopianMapProps {
  onSelectDestination: (dest: Destination) => void;
  onBookExperience: (destTitle: string, destinationName?: string) => void;
}

// Center of Ethiopia
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.4897 };
const DEFAULT_ZOOM = 6.2;

export const EthiopianDestinationsMap: React.FC<EthiopianMapProps> = ({
  onSelectDestination,
  onBookExperience,
}) => {
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [mapType, setMapType] = useState<'terrain' | 'roadmap' | 'satellite'>('terrain');

  // Key reading: check environment variable or fallback gracefully
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const mapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string) || 'DEMO_MAP_ID';
  const hasValidKey = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'YOUR_KEY_HERE');

  const destinationsWithCoords = DESTINATIONS_DATA.filter((d) => d.coordinates !== undefined);

  const displayedDestinations = destinationsWithCoords.filter((dest) => {
    if (selectedRegionFilter === 'all') return true;
    return dest.region === selectedRegionFilter;
  });

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'addis-ababa':
        return '#1E3A2F'; // Forest deep green
      case 'oromia':
        return '#B85C38'; // Terra cotta
      case 'tigray':
        return '#D49A3D'; // Rich Gold
      case 'northern-ethiopia':
        return '#2563EB'; // Royal blue
      case 'southern-ethiopia':
        return '#059669'; // Emerald
      case 'eastern-ethiopia':
        return '#9333EA'; // Purple
      case 'afar-danakil':
        return '#DC2626'; // Red volcanic
      case 'kafa-southwest':
        return '#15803D'; // Rainforest green
      default:
        return '#D49A3D';
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#E8E1D5]" id="interactive-ethiopia-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Interactive Google Map & Spatial Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E3A2F] tracking-tight font-serif">
              Map of Ethiopia's Sacred Sites & Highlands
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
              Explore geotagged destinations across all 9 regional circuits. Click any marker to view elevation, highlights, and custom expedition routes.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E8E1D5] shadow-xs text-xs font-semibold text-[#1E3A2F]">
            <div className="flex -space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1E3A2F]" />
              <span className="w-3 h-3 rounded-full bg-[#B85C38]" />
              <span className="w-3 h-3 rounded-full bg-[#D49A3D]" />
              <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
            </div>
            <span>{displayedDestinations.length} Geotagged Sanctuaries</span>
          </div>
        </div>

        {/* Region Filter Bar & Map Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E8E1D5] shadow-xs">
          {/* Region Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <span className="text-[11px] font-bold text-[#8C7E6D] uppercase tracking-wider px-2">
              Filter:
            </span>
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'tigray', label: 'Tigray & Axum' },
              { id: 'northern-ethiopia', label: 'Northern Highlands' },
              { id: 'addis-ababa', label: 'Addis Ababa' },
              { id: 'oromia', label: 'Oromia' },
              { id: 'southern-ethiopia', label: 'Southern Omo & Lakes' },
              { id: 'afar-danakil', label: 'Afar & Danakil' },
              { id: 'eastern-ethiopia', label: 'Harar' },
              { id: 'kafa-southwest', label: 'Kafa Rainforest' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegionFilter(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegionFilter === reg.id
                    ? 'bg-[#1E3A2F] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#52483E] hover:bg-[#E8E1D5] border border-[#E8E1D5]'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Map Layer Mode buttons */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E1D5] text-xs">
            <button
              onClick={() => setMapType('terrain')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                mapType === 'terrain' ? 'bg-[#1E3A2F] text-white shadow-xs' : 'text-[#7A7063] hover:text-[#1E3A2F]'
              }`}
            >
              Terrain
            </button>
            <button
              onClick={() => setMapType('roadmap')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                mapType === 'roadmap' ? 'bg-[#1E3A2F] text-white shadow-xs' : 'text-[#7A7063] hover:text-[#1E3A2F]'
              }`}
            >
              Roads
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                mapType === 'satellite' ? 'bg-[#1E3A2F] text-white shadow-xs' : 'text-[#7A7063] hover:text-[#1E3A2F]'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-lg bg-[#EAE5DA]">
          
          {/* Fallback Notice if API key is not configured */}
          {!hasValidKey && (
            <div className="absolute top-3 left-3 z-10 bg-[#1E3A2F]/90 backdrop-blur-md text-[#FAF6EE] border border-[#D49A3D]/40 px-3.5 py-2 rounded-xl text-xs font-medium shadow-lg flex items-center gap-2.5 max-w-md">
              <Compass className="w-4 h-4 text-[#D49A3D] flex-shrink-0" />
              <span>
                <strong>Map Prototyping Mode:</strong> Active with Google Maps Platform. Add <code className="font-mono text-[11px] bg-black/30 px-1.5 py-0.5 rounded text-[#E5AC4D]">VITE_GOOGLE_MAPS_API_KEY</code> for custom quota.
              </span>
            </div>
          )}

          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={ETHIOPIA_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              mapId={mapId}
              mapTypeId={mapType}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="w-full h-full"
            >
              {displayedDestinations.map((dest) => {
                if (!dest.coordinates) return null;
                const markerColor = getRegionColor(dest.region);
                const isSelected = activeDestination?.id === dest.id;

                return (
                  <AdvancedMarker
                    key={dest.id}
                    position={dest.coordinates}
                    title={dest.name}
                    onClick={() => setActiveDestination(dest)}
                  >
                    <Pin
                      background={isSelected ? '#D49A3D' : markerColor}
                      borderColor="#FFFFFF"
                      glyphColor="#FFFFFF"
                      scale={isSelected ? 1.3 : 1.0}
                    />
                  </AdvancedMarker>
                );
              })}

              {/* InfoWindow for Selected Marker */}
              {activeDestination && activeDestination.coordinates && (
                <InfoWindow
                  position={activeDestination.coordinates}
                  onCloseClick={() => setActiveDestination(null)}
                >
                  <div className="max-w-[280px] p-1 text-[#2E2822] space-y-2">
                    <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-800">
                      <AuthenticImage
                        src={activeDestination.heroImage}
                        alt={activeDestination.name}
                        subjectName={activeDestination.name}
                        photoKey={`map-${activeDestination.id}`}
                        photoCategory="destination"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-[#1E3A2F]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                        {activeDestination.regionLabel}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm font-serif text-[#1E3A2F] leading-tight">
                        {activeDestination.name}
                      </h4>
                      {activeDestination.elevation && (
                        <p className="text-[10px] text-[#7A7063] flex items-center gap-1 mt-0.5">
                          <Mountain className="w-3 h-3 text-[#D49A3D]" />
                          <span>Elevation: {activeDestination.elevation}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-[#5C5247] mt-1 line-clamp-2 leading-snug">
                        {activeDestination.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectDestination(activeDestination)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onBookExperience(activeDestination.name, activeDestination.name)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#D49A3D] hover:bg-[#C2892C] text-[#1E3A2F] text-xs font-bold transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>

          {/* Interactive Legend Box Overlay */}
          <div className="hidden sm:block absolute bottom-5 left-5 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E1D5] shadow-lg max-w-xs text-xs space-y-2 pointer-events-auto">
            <div className="font-bold text-[#1E3A2F] flex items-center gap-1.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Regional Legend</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[#52483E]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                <span>Addis Ababa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B85C38]" />
                <span>Oromia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D49A3D]" />
                <span>Tigray & Axum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                <span>Northern Loop</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
                <span>Southern Omo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                <span>Danakil Afar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Destination Quick Jump Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D49A3D]" />
              <span>Featured Geotagged Locations</span>
            </h3>
            <span className="text-xs text-[#8C7E6D]">Click to focus location on map</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {destinationsWithCoords.slice(0, 7).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setActiveDestination(d);
                  const mapElement = document.getElementById('interactive-ethiopia-map');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                  activeDestination?.id === d.id
                    ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-sm'
                    : 'bg-white hover:bg-[#FAF8F5] text-[#2E2822] border-[#E8E1D5]'
                }`}
              >
                <div>
                  <div className="font-bold line-clamp-1">{d.name.split(':')[0]}</div>
                  <div className={`text-[10px] ${activeDestination?.id === d.id ? 'text-[#E5AC4D]' : 'text-[#8C7E6D]'}`}>
                    {d.regionLabel.split(' ')[0]}
                  </div>
                </div>
                <div className={`mt-2 text-[10px] flex items-center gap-1 ${activeDestination?.id === d.id ? 'text-white/80' : 'text-[#7A7063]'}`}>
                  <Mountain className="w-3 h-3" />
                  <span>{d.elevation?.split(' ')[0] || 'Highlands'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
