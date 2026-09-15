import React, { useState } from 'react';
import { FESTIVALS_DATA, FOUNDER_INFO } from '../data/ethiopiaData';
import { Festival } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Clock,
  Camera,
  Layers,
  Heart,
  Droplets,
  Flower2,
  Users,
  Flame
} from 'lucide-react';
import { useCustomPhotoContext } from '../context/CustomPhotoContext';

interface FestivalsProps {
  onPlanTripForFestival: (festivalName: string) => void;
}

export const FestivalsSection: React.FC<FestivalsProps> = ({
  onPlanTripForFestival,
}) => {
  const [viewMode, setViewMode] = useState<'combined' | 'single'>('combined');
  const [selectedFestival, setSelectedFestival] = useState<Festival>(FESTIVALS_DATA[0]);
  const { openUploadModal, isAdminMode } = useCustomPhotoContext();

  const timkat = FESTIVALS_DATA.find(f => f.id === 'timkat') || FESTIVALS_DATA[0];
  const irreecha = FESTIVALS_DATA.find(f => f.id === 'irreecha') || FESTIVALS_DATA[1];
  const meskel = FESTIVALS_DATA.find(f => f.id === 'meskel') || FESTIVALS_DATA[2];

  // Combined visual gallery highlights for the sacred celebrations
  const combinedMoments = [
    {
      title: 'Timkat Holy Tabot & Water Blessing',
      native: 'ጥምቀት - የፋሲለደስ መዋኛ',
      festival: 'Timkat',
      category: 'Orthodox Christian',
      location: 'Fasilides’ Bath, Gondar',
      desc: 'Priests in golden vestments bless the waters as thousands celebrate renewal and baptism.',
      photoKey: 'fest-timkat',
      fallbackImg: timkat.image,
      tagColor: 'bg-[#D49A3D] text-[#1E3A2F]',
      badge: '⛪ Epiphany'
    },
    {
      title: 'Irreecha Thanksgiving at Lake Hora',
      native: 'Irreechaa - Hora Harsadi',
      festival: 'Irreecha',
      category: 'Oromo Heritage',
      location: 'Lake Hora Harsadi, Bishoftu',
      desc: 'Millions gather holding fresh green Coqorsa grass to give thanks to Waaqa for peace and abundance.',
      photoKey: 'fest-irreecha',
      fallbackImg: irreecha.image,
      tagColor: 'bg-[#2E7D32] text-white',
      badge: '🌿 Thanksgiving'
    },
    {
      title: 'Meskel Demera Giant Bonfire Lighting',
      native: 'መስቀል - ደመራ ማብራት',
      festival: 'Meskel',
      category: 'UNESCO Heritage',
      location: 'Meskel Square, Addis Ababa',
      desc: 'Hundreds of thousands gather at twilight to watch the Patriarch ignite the colossal pyramid bonfire adorned with Adey Abeba daisies.',
      photoKey: 'fest-meskel',
      fallbackImg: meskel.image,
      tagColor: 'bg-[#B85C38] text-white',
      badge: '🔥 Demera Bonfire'
    },
    {
      title: 'Timkat Sea of White Netelas & Chants',
      native: 'የካህናት ዝማሬና ጸናጽል',
      festival: 'Timkat',
      category: 'Orthodox Christian',
      location: 'Jan Meda & Meskel Square, Addis Ababa',
      desc: 'Processions accompanied by silver sistra, resonant drums (Kebero), and royal horse cavalcades.',
      photoKey: 'fest-timkat',
      fallbackImg: timkat.image,
      tagColor: 'bg-[#D49A3D] text-[#1E3A2F]',
      badge: '✨ Sacred Procession'
    },
    {
      title: 'Irreecha Traditional Outfits & Adey Abeba',
      native: 'Uffata Aadaa Oromoo',
      festival: 'Irreecha',
      category: 'Oromo Heritage',
      location: 'Finfinnee / Addis Ababa & Bishoftu',
      desc: 'Vibrant embroidered Oromo attire, beadwork, and yellow Adey Abeba spring flowers.',
      photoKey: 'fest-irreecha',
      fallbackImg: irreecha.image,
      tagColor: 'bg-[#2E7D32] text-white',
      badge: '🌸 Cultural Pride'
    },
    {
      title: 'Meskel Ash Blessing & Family Feasting',
      native: 'የመስቀል አመድ ምርቃትና ድግስ',
      festival: 'Meskel',
      category: 'Orthodox Christian',
      location: 'Nationwide & Meskel Square',
      desc: 'Marking foreheads with holy Demera charcoal ash for blessings, followed by hearty feasts of Doro Wat and Kitfo.',
      photoKey: 'fest-meskel',
      fallbackImg: meskel.image,
      tagColor: 'bg-[#D49A3D] text-[#1E3A2F]',
      badge: '✝️ True Cross'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="ethiopian-festivals-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Living Celebrations & Sacred Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Ethiopian <span className="text-[#B85C38] font-serif italic">Festivals & Celebrations</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Ethiopia’s calendar is filled with spectacular colorful festivals where millions gather in white 
            traditional Netelas, ancient liturgical chants echo through mountain valleys, and sacred waters are blessed in gratitude.
          </p>
        </div>

        {/* View Selection & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8E1D5] pb-4">
          
          {/* Main Primary View Switcher */}
          <div className="flex items-center p-1 bg-white rounded-2xl border border-[#E8E1D5] shadow-sm">
            <button
              onClick={() => setViewMode('combined')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                viewMode === 'combined'
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'text-[#5C5247] hover:text-[#1E3A2F]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D49A3D]" />
              <span>Timkat, Irreecha & Meskel (Grand Celebrations)</span>
            </button>
            <button
              onClick={() => setViewMode('single')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                viewMode === 'single'
                  ? 'bg-[#1E3A2F] text-white shadow-sm'
                  : 'text-[#5C5247] hover:text-[#1E3A2F]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#D49A3D]" />
              <span>Explore All Festivals</span>
            </button>
          </div>

          {/* Quick Upload Action (Founder Admin Only) */}
          {isAdminMode && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openUploadModal({
                  key: 'fest-meskel',
                  title: 'Meskel, Timkat & Irreecha Festival Photos',
                  category: 'festival',
                  currentSrc: meskel.image
                })}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F] text-xs font-semibold text-[#1E3A2F] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Upload Festival Photos</span>
              </button>
            </div>
          )}
        </div>

        {/* COMBINED VIEW: Timkat, Irreecha & Meskel in One Place */}
        {viewMode === 'combined' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Header Banner for Combined Showcase */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E3A2F] via-[#2A473C] to-[#1E3A2F] text-white text-center space-y-3 relative overflow-hidden shadow-xl">
              <div className="relative z-10 max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[#E5AC4D] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 text-[#E5AC4D]" />
                  <span>The Three Crown Celebrations of Ethiopia</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Timkat, Irreecha & Meskel in One Unified Showcase
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/90 leading-relaxed">
                  Experience the spiritual water blessings of <strong>Timkat (ጥምቀት)</strong>, the sacred thanksgiving of <strong>Irreecha (Irreechaa)</strong>, and the glowing Demera bonfire festival of <strong>Meskel (መስቀል)</strong> — symbolizing Ethiopia’s deep unity of faith, gratitude, fire, and living heritage.
                </p>
              </div>
            </div>

            {/* TRIPLE SHOWCASE CARDS (3-Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* CARD 1: TIMKAT */}
              <div className="bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-64 sm:h-72 bg-slate-900 group">
                    <AuthenticImage
                      src={timkat.image}
                      alt={timkat.name}
                      subjectName={timkat.name}
                      photoKey="fest-timkat"
                      photoCategory="festival"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-xs font-bold uppercase tracking-wider shadow">
                        Orthodox Christian
                      </span>
                    </div>

                    {/* Quick Upload Button (Founder Admin Only) */}
                    {isAdminMode && (
                      <button
                        type="button"
                        onClick={() => openUploadModal({
                          key: 'fest-timkat',
                          title: 'Timkat (Ethiopian Epiphany)',
                          category: 'festival',
                          currentSrc: timkat.image
                        })}
                        className="absolute top-4 right-4 z-10 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-[11px] font-semibold flex items-center gap-1 backdrop-blur-sm transition-all cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-[#D49A3D]" />
                        <span>Upload Photo</span>
                      </button>
                    )}

                    {/* Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                      <div className="text-xs text-[#E5AC4D] font-bold">ጥምቀት • January 19</div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                        Timkat (Epiphany)
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B6155]">
                      <MapPin className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                      <span className="font-semibold text-[#1E3A2F]">Epicenters:</span>
                      <span>Gondar, Addis Ababa, Lalibela</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#423B33] leading-relaxed line-clamp-3">
                      {timkat.history}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                      <div className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-[#34A853]" />
                        <span>Highlights:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#52483E]">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#D49A3D] font-bold">•</span>
                          <span><strong>Tabot Blessing:</strong> Holy ark replicas in golden robes.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#D49A3D] font-bold">•</span>
                          <span><strong>Fasilides Pool:</strong> Consecrated waters in Gondar.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap gap-2">
                  <button
                    onClick={() => onPlanTripForFestival('Timkat Epiphany Experience')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>Book Timkat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      'Hello Hindek! I want to plan a trip to experience Timkat in Gondar/Addis Ababa.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] hover:bg-[#E8E1D5] text-[#1E3A2F] text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat</span>
                  </a>
                </div>
              </div>

              {/* CARD 2: IRREECHA */}
              <div className="bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-64 sm:h-72 bg-slate-900 group">
                    <AuthenticImage
                      src={irreecha.image}
                      alt={irreecha.name}
                      subjectName={irreecha.name}
                      photoKey="fest-irreecha"
                      photoCategory="festival"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#2E7D32] text-white text-xs font-bold uppercase tracking-wider shadow">
                        Oromo Heritage
                      </span>
                    </div>

                    {/* Quick Upload Button (Founder Admin Only) */}
                    {isAdminMode && (
                      <button
                        type="button"
                        onClick={() => openUploadModal({
                          key: 'fest-irreecha',
                          title: 'Irreecha (Oromo Thanksgiving)',
                          category: 'festival',
                          currentSrc: irreecha.image
                        })}
                        className="absolute top-4 right-4 z-10 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-[11px] font-semibold flex items-center gap-1 backdrop-blur-sm transition-all cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-[#D49A3D]" />
                        <span>Upload Photo</span>
                      </button>
                    )}

                    {/* Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                      <div className="text-xs text-[#E5AC4D] font-bold">Irreechaa • Late September / October</div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                        Irreecha (Thanksgiving)
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B6155]">
                      <MapPin className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                      <span className="font-semibold text-[#1E3A2F]">Epicenters:</span>
                      <span>Lake Hora (Bishoftu) & Addis Ababa</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#423B33] leading-relaxed line-clamp-3">
                      {irreecha.history}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                      <div className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
                        <Flower2 className="w-3.5 h-3.5 text-[#D49A3D]" />
                        <span>Highlights:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#52483E]">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#34A853] font-bold">•</span>
                          <span><strong>Coqorsa Grass & Adey Abeba:</strong> Dipping into sacred lake water.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#34A853] font-bold">•</span>
                          <span><strong>Gadaa Prayers:</strong> Giving thanks to Waaqa for peace & harvest.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap gap-2">
                  <button
                    onClick={() => onPlanTripForFestival('Irreecha Oromo Thanksgiving Experience')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>Book Irreecha</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      'Hello Hindek! I want to plan a trip to experience Irreecha at Lake Hora / Addis Ababa.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] hover:bg-[#E8E1D5] text-[#1E3A2F] text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat</span>
                  </a>
                </div>
              </div>

              {/* CARD 3: MESKEL */}
              <div className="bg-white rounded-3xl border border-[#E8E1D5] overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-64 sm:h-72 bg-slate-900 group">
                    <AuthenticImage
                      src={meskel.image}
                      alt={meskel.name}
                      subjectName={meskel.name}
                      photoKey="fest-meskel"
                      photoCategory="festival"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#B85C38] text-white text-xs font-bold uppercase tracking-wider shadow">
                        UNESCO Heritage
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#E5AC4D] text-xs font-medium">
                        🔥 Demera
                      </span>
                    </div>

                    {/* Quick Upload Button (Founder Admin Only) */}
                    {isAdminMode && (
                      <button
                        type="button"
                        onClick={() => openUploadModal({
                          key: 'fest-meskel',
                          title: 'Meskel (Finding of True Cross)',
                          category: 'festival',
                          currentSrc: meskel.image
                        })}
                        className="absolute top-4 right-4 z-10 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white text-[11px] font-semibold flex items-center gap-1 backdrop-blur-sm transition-all cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-[#D49A3D]" />
                        <span>Upload Photo</span>
                      </button>
                    )}

                    {/* Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                      <div className="text-xs text-[#E5AC4D] font-bold">መስቀል • September 27</div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                        Meskel (True Cross)
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B6155]">
                      <MapPin className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                      <span className="font-semibold text-[#1E3A2F]">Epicenters:</span>
                      <span>Meskel Square (Addis Ababa) & Nationwide</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#423B33] leading-relaxed line-clamp-3">
                      {meskel.history}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1.5">
                      <div className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#B85C38]" />
                        <span>Highlights:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#52483E]">
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#B85C38] font-bold">•</span>
                          <span><strong>Colossal Demera Bonfire:</strong> Lit at dusk with Adey Abeba yellow daisies.</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="text-[#B85C38] font-bold">•</span>
                          <span><strong>Ash Cross Blessing:</strong> Marking foreheads with sacred ash for the New Year.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="p-5 sm:p-6 pt-0 flex flex-wrap gap-2">
                  <button
                    onClick={() => onPlanTripForFestival('Meskel Demera Festival Experience')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <span>Book Meskel</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      'Hello Hindek! I want to plan a trip to experience the Meskel Demera Festival in Addis Ababa.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] hover:bg-[#E8E1D5] text-[#1E3A2F] text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Chat</span>
                  </a>
                </div>
              </div>

            </div>

            {/* COMBINED VISUAL MOMENTS GRID */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#1E3A2F]">
                    Timkat, Irreecha & Meskel Moments in Harmony
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B6155]">
                    Explore authentic photography capturing the sacred waters, spiritual gratitude, and vibrant Demera bonfires across Ethiopia.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C7E6D]">
                  <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Interactive Real Photo Gallery</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {combinedMoments.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <AuthenticImage
                        src={item.fallbackImg}
                        alt={item.title}
                        subjectName={item.title}
                        photoKey={item.photoKey}
                        photoCategory="festival"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                      
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.tagColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                        <div className="text-[10px] text-[#E5AC4D] font-medium">{item.native}</div>
                        <div className="text-xs font-bold text-white line-clamp-1">{item.title}</div>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <p className="text-xs text-[#52483E] leading-relaxed">
                        {item.desc}
                      </p>
                      
                      <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] text-[#8C7E6D]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B85C38]" />
                          <span className="truncate max-w-[150px]">{item.location}</span>
                        </span>
                        {isAdminMode && (
                          <button
                            type="button"
                            onClick={() => openUploadModal({
                              key: item.photoKey,
                              title: item.title,
                              category: 'festival',
                              currentSrc: item.fallbackImg
                            })}
                            className="text-[#1E3A2F] hover:text-[#B85C38] font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
                          >
                            <Camera className="w-3 h-3" />
                            <span>Photo</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Combined Booking CTA Bar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1E3A2F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1.5 text-center sm:text-left max-w-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#D49A3D] flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Tailored Festival Itineraries</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Want to Experience Meskel, Timkat & Irreecha with Hindek?
                </h4>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed">
                  Bridge Ethiopia provides licensed guides, transportation, prime festival view bookings, and cultural orientation for stress-free festival immersion.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onPlanTripForFestival('Ethiopian Grand Festivals Package (Meskel, Timkat & Irreecha)')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D49A3D] hover:bg-[#C2892C] text-[#1E3A2F] font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Plan Festival Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* SINGLE FESTIVAL EXPLORER VIEW */}
        {viewMode === 'single' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Festival Selector Carousel / Tabs */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-3 no-scrollbar">
              {FESTIVALS_DATA.map((fest) => (
                <button
                  key={fest.id}
                  onClick={() => setSelectedFestival(fest)}
                  className={`px-4 py-3 rounded-2xl text-left transition-all flex-shrink-0 border ${
                    selectedFestival.id === fest.id
                      ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-md'
                      : 'bg-white text-[#423B33] hover:bg-[#FAF6EE] border-[#E8E1D5]'
                  }`}
                >
                  <div className="text-xs font-bold">{fest.name.split('(')[0].trim()}</div>
                  <div className={`text-[10px] ${selectedFestival.id === fest.id ? 'text-[#E5AC4D]' : 'text-[#8C7E6D]'}`}>
                    {fest.dateOrSeason}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Festival Feature Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-xl grid grid-cols-1 lg:grid-cols-12">
              
              {/* Real Photo Banner */}
              <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full bg-slate-900 group">
                <AuthenticImage
                  src={selectedFestival.image}
                  alt={selectedFestival.name}
                  subjectName={selectedFestival.name}
                  photoKey={`fest-${selectedFestival.id}`}
                  photoCategory="festival"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-xs font-bold uppercase tracking-wider shadow">
                    {selectedFestival.culture}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                    {selectedFestival.name}
                  </h3>
                  <p className="text-xs text-[#E5AC4D] font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Next Upcoming: {selectedFestival.nextDate}</span>
                  </p>
                </div>
              </div>

              {/* Festival Content Details */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Primary Locations */}
                  <div className="flex items-center gap-2 text-xs text-[#6B6155]">
                    <MapPin className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                    <span className="font-semibold text-[#1E3A2F]">Key Locations:</span>
                    <span>{selectedFestival.primaryLocations.join(' • ')}</span>
                  </div>

                  {/* History & Cultural Meaning */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E3A2F]">
                      History & Spiritual Meaning
                    </h4>
                    <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed">
                      {selectedFestival.history}
                    </p>
                    <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed italic">
                      {selectedFestival.culturalMeaning}
                    </p>
                  </div>

                  {/* What Visitors Can Experience */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#B85C38]">
                      What You Will Experience
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#423B33]">
                      {selectedFestival.visitorExperience.map((exp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#34A853] font-bold">✓</span>
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Travel Tips for this Festival */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1 text-xs text-[#5C5247]">
                    <strong className="text-[#1E3A2F] block font-semibold">Local Guide Tip:</strong>
                    {selectedFestival.travelTips[0]}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-[#E8E1D5] flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onPlanTripForFestival(`Festival Journey: ${selectedFestival.name}`)}
                    className="px-6 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Request Booking for {selectedFestival.name.split('(')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4 text-[#D49A3D]" />
                  </button>

                  {isAdminMode && (
                    <button
                      type="button"
                      onClick={() => openUploadModal({
                        key: `fest-${selectedFestival.id}`,
                        title: selectedFestival.name,
                        category: 'festival',
                        currentSrc: selectedFestival.image
                      })}
                      className="px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1E3A2F]/20 text-[#1E3A2F] hover:bg-[#E8E1D5] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-[#D49A3D]" />
                      <span>Upload Real Photo</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      `Hello Hindek! I want to experience ${selectedFestival.name} in Ethiopia with Bridge Ethiopia.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#1E3A2F]/20 text-[#1E3A2F] hover:bg-[#E8E1D5] font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Hindek</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
