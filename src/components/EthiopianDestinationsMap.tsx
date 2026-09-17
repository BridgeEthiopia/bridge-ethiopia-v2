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
  AlertCircle,
  BookOpen,
  Plus,
  Minus,
  RotateCcw,
  Navigation2
} from 'lucide-react';

interface EthiopianMapProps {
  onSelectDestination: (dest: Destination) => void;
  onBookExperience: (destTitle: string, destinationName?: string) => void;
}

// Center of Ethiopia
const ETHIOPIA_CENTER = { lat: 9.145, lng: 40.4897 };
const DEFAULT_ZOOM = 6.2;

// Projection bounds for Ethiopia vector map
const MIN_LAT = 3.4;
const MAX_LAT = 15.0;
const MIN_LNG = 32.8;
const MAX_LNG = 48.0;

const projectToPercent = (lat: number, lng: number) => {
  const x = Math.max(4, Math.min(96, ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 100));
  const y = Math.max(4, Math.min(96, ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 100));
  return { x, y };
};

export const EthiopianDestinationsMap: React.FC<EthiopianMapProps> = ({
  onSelectDestination,
  onBookExperience,
}) => {
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [mapType, setMapType] = useState<'terrain' | 'roadmap' | 'satellite'>('terrain');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'atlas' | 'google'>(() => {
    const key = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
    return key && key.trim() !== '' && key !== 'YOUR_KEY_HERE' ? 'google' : 'atlas';
  });

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const mapId = (import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string) || undefined;
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

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.85));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section className="py-12 sm:py-16 bg-[#F4F1EA] border-b border-[#E8E1D5]" id="interactive-ethiopia-map">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Interactive Spatial Guide & Topography</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E3A2F] tracking-tight font-serif">
              Map of Ethiopia's Sacred Sites, Highlands & Kingdoms
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
              Explore geotagged sanctuaries across all 9 regional circuits—from the Gheralta cliff churches and Lalibela to the Jimma Kingdom palace and the Danakil volcanic depression.
            </p>
          </div>

          {/* Quick Stats & Map Engine Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {hasValidKey && (
              <div className="flex items-center bg-white p-1 rounded-xl border border-[#E8E1D5] text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('atlas')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'atlas'
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'text-[#7A7063] hover:text-[#1E3A2F]'
                  }`}
                >
                  Visual Atlas
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('google')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    viewMode === 'google'
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'text-[#7A7063] hover:text-[#1E3A2F]'
                  }`}
                >
                  Google Maps
                </button>
              </div>
            )}
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
              { id: 'oromia', label: 'Oromia & Jimma' },
              { id: 'tigray', label: 'Tigray Heritage' },
              { id: 'northern-ethiopia', label: 'Northern Highlands' },
              { id: 'addis-ababa', label: 'Addis Ababa' },
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
        <div className="relative w-full h-[540px] sm:h-[620px] rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-lg bg-[#1B2923] select-none">
          
          {/* Zoom & Reset Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#E8E1D5] shadow-md">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2 hover:bg-[#F2EFE9] text-[#1E3A2F] rounded-lg transition-colors cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2 hover:bg-[#F2EFE9] text-[#1E3A2F] rounded-lg transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-2 hover:bg-[#F2EFE9] text-[#1E3A2F] rounded-lg transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Map View: Google Maps or Visual Topographic Atlas */}
          {viewMode === 'google' && hasValidKey ? (
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

                {activeDestination && activeDestination.coordinates && (
                  <InfoWindow
                    position={activeDestination.coordinates}
                    onCloseClick={() => setActiveDestination(null)}
                  >
                    <div className="max-w-[280px] p-1 text-[#2E2822] space-y-2">
                      <div className="relative min-h-[5rem] w-full rounded-lg p-3 bg-gradient-to-br from-[#1E3A2F] via-[#162D24] to-[#0D1A14] text-white flex flex-col justify-between border border-[#D49A3D]/40">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#D49A3D] text-[#1E3A2F] text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                            {activeDestination.regionLabel}
                          </span>
                          <span className="text-[#D49A3D] text-[9px] font-semibold flex items-center gap-1">
                            <BookOpen className="w-2.5 h-2.5" />
                            Chronicle
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-white font-serif mt-1 line-clamp-1">
                          {activeDestination.name}
                        </h4>
                      </div>
                      <div>
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
          ) : (
            /* Visual Geographic Topographic Atlas (High Reliability, No Missing Key Issues) */
            <div 
              className="relative w-full h-full overflow-hidden transition-transform duration-300 ease-out"
              style={{
                background: mapType === 'satellite' 
                  ? 'radial-gradient(circle at 50% 50%, #152B22 0%, #0D1A14 100%)' 
                  : mapType === 'roadmap'
                  ? 'radial-gradient(circle at 50% 50%, #26362E 0%, #192620 100%)'
                  : 'radial-gradient(circle at 50% 50%, #1F362C 0%, #12211A 100%)',
                transform: `scale(${zoomLevel})`,
                transformOrigin: '50% 50%',
              }}
            >
              {/* Topographical SVG Relief & Geological Contours of Ethiopia */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              >
                {/* Horn of Africa & Ethiopia Geographic Contour */}
                <path
                  d="M 28 8 Q 38 4, 52 7 Q 62 14, 76 22 Q 92 34, 94 48 Q 88 64, 72 74 Q 54 86, 38 92 Q 22 90, 16 78 Q 12 60, 18 40 Q 22 20, 28 8 Z"
                  fill="#2A483B"
                  stroke="#3D6352"
                  strokeWidth="0.6"
                />
                {/* Great Ethiopian Rift Valley Fracture Line */}
                <path
                  d="M 52 14 Q 46 36, 40 52 Q 34 68, 28 86"
                  fill="none"
                  stroke="#D49A3D"
                  strokeWidth="0.8"
                  strokeDasharray="2, 2"
                  opacity="0.6"
                />
                {/* Lake Tana Water Basin */}
                <ellipse cx="37" cy="28" rx="3.5" ry="3" fill="#1E4B6E" opacity="0.8" />
                {/* Rift Valley Lakes */}
                <ellipse cx="40" cy="54" rx="2" ry="3.5" fill="#1E4B6E" opacity="0.8" />
                <ellipse cx="37" cy="68" rx="2.5" ry="4" fill="#1E4B6E" opacity="0.8" />
                {/* Northern Simien Mountain Range Relief */}
                <path
                  d="M 32 20 L 36 17 L 40 21 L 43 18 L 46 22"
                  fill="none"
                  stroke="#E5AC4D"
                  strokeWidth="0.7"
                  opacity="0.7"
                />
                {/* Bale Mountains Southeastern Range Relief */}
                <path
                  d="M 48 62 L 53 58 L 57 63 L 62 60"
                  fill="none"
                  stroke="#E5AC4D"
                  strokeWidth="0.7"
                  opacity="0.7"
                />
              </svg>

              {/* Geographic Region Label Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[18%] left-[34%] text-[10px] font-bold text-[#E5AC4D]/70 tracking-widest uppercase">
                  Northern Highlands
                </div>
                <div className="absolute top-[10%] left-[54%] text-[10px] font-bold text-[#DC2626]/70 tracking-widest uppercase">
                  Danakil Depression
                </div>
                <div className="absolute top-[48%] left-[42%] text-[10px] font-bold text-[#FAF6EE]/80 tracking-widest uppercase">
                  Addis Ababa • Shewa
                </div>
                <div className="absolute top-[60%] left-[22%] text-[10px] font-bold text-[#B85C38]/80 tracking-widest uppercase">
                  Jimma & Kafa
                </div>
                <div className="absolute top-[62%] left-[52%] text-[10px] font-bold text-[#D49A3D]/70 tracking-widest uppercase">
                  Bale Mountains
                </div>
                <div className="absolute top-[78%] left-[24%] text-[10px] font-bold text-[#059669]/70 tracking-widest uppercase">
                  Omo Valley
                </div>
                <div className="absolute top-[46%] left-[64%] text-[10px] font-bold text-[#9333EA]/70 tracking-widest uppercase">
                  Harar Jugol
                </div>
              </div>

              {/* Clickable Destination Pins on Topographical Canvas */}
              {displayedDestinations.map((dest) => {
                if (!dest.coordinates) return null;
                const { x, y } = projectToPercent(dest.coordinates.lat, dest.coordinates.lng);
                const isSelected = activeDestination?.id === dest.id;
                const markerColor = getRegionColor(dest.region);

                return (
                  <div
                    key={dest.id}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-full z-10 cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDestination(dest);
                    }}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <span 
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: markerColor }}
                      />
                    )}
                    
                    {/* Marker Pin */}
                    <div 
                      className={`relative flex items-center justify-center p-1.5 rounded-full shadow-lg transition-transform duration-200 ${
                        isSelected 
                          ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black/50' 
                          : 'group-hover:scale-115'
                      }`}
                      style={{ backgroundColor: isSelected ? '#D49A3D' : markerColor }}
                    >
                      <MapPin className="w-3.5 h-3.5 text-white" />
                    </div>

                    {/* Compact Label Tag */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                      isSelected 
                        ? 'bg-[#FAF6EE] text-[#1E3A2F] ring-1 ring-[#D49A3D]' 
                        : 'bg-black/75 text-white/90 group-hover:bg-black/90'
                    }`}>
                      {dest.name.split(':')[0].split('&')[0]}
                    </div>
                  </div>
                );
              })}

              {/* Floating Destination Details Card on Map */}
              {activeDestination && (
                <div 
                  className="absolute bottom-6 right-6 z-30 w-80 sm:w-96 max-w-[calc(100%-3rem)] bg-[#FAF8F5]/98 backdrop-blur-md rounded-2xl border border-[#D49A3D]/40 p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-2 border-b border-[#E8E1D5] pb-2.5 mb-2.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: getRegionColor(activeDestination.region) }}
                        />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B85C38]">
                          {activeDestination.regionLabel}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base font-serif text-[#1E3A2F] mt-0.5 leading-snug">
                        {activeDestination.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveDestination(null)}
                      className="p-1 rounded-lg hover:bg-[#E8E1D5] text-[#7A7063] transition-colors"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-[#52483E] line-clamp-2 leading-relaxed mb-3">
                    {activeDestination.tagline || activeDestination.description}
                  </p>

                  <div className="flex items-center justify-between gap-3 text-[11px] text-[#7A7063] mb-3 bg-white p-2 rounded-xl border border-[#E8E1D5]">
                    <div className="flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5 text-[#D49A3D]" />
                      <span>{activeDestination.elevation || 'Highlands'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#1E3A2F]" />
                      <span>{activeDestination.suggestedDuration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectDestination(activeDestination)}
                      className="flex-1 px-3 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#D49A3D]" />
                      <span>Read Chronicle</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookExperience(activeDestination.name, activeDestination.name)}
                      className="px-3.5 py-2 rounded-xl bg-[#D49A3D] hover:bg-[#C2892C] text-[#1E3A2F] text-xs font-extrabold transition-colors shadow-sm"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Regional Legend Box Overlay */}
          <div className="hidden sm:block absolute bottom-5 left-5 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E1D5] shadow-lg max-w-xs text-xs space-y-2 pointer-events-auto">
            <div className="font-bold text-[#1E3A2F] flex items-center gap-1.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Regional Circuits Legend</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-[#52483E]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A2F]" />
                <span>Addis Ababa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B85C38]" />
                <span>Oromia & Jimma</span>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {destinationsWithCoords.slice(0, 8).map((d) => (
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
                  <div className="font-bold line-clamp-1">{d.name.split(':')[0].split('&')[0]}</div>
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
