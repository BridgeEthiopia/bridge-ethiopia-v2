import React, { useState, useRef } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Coffee, 
  Users,
  Search,
  Camera,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { AuthenticImage } from './AuthenticImage';
import { useCustomPhotoContext, compressImage } from '../context/CustomPhotoContext';
import { useLanguage } from '../context/LanguageContext';
import heroMountainShowcaseImg from '../assets/images/bale_mountains_peaks_1789693539082.jpg';
import betGiyorgisHeroImg from '../assets/images/lalibela_st_george_church_1787813645261.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onPlanTripClick: () => void;
  onBookExperienceClick: () => void;
  onContactClick: () => void;
  onSearchFilter: (region: string, category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onPlanTripClick,
  onBookExperienceClick,
  onContactClick,
  onSearchFilter,
}) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { t } = useLanguage();
  const { photos, updatePhoto, setCustomPhoto, openUploadModal, isAdminMode } = useCustomPhotoContext();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const showcaseInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter(selectedRegion, selectedExperience);
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await compressImage(file, 800, 800, 0.85);
      updatePhoto('heroAvatar', dataUrl);
      setUploadNotice('Photo updated! Hindek profile photo is now active.');
      setTimeout(() => setUploadNotice(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleShowcaseFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const dataUrl = await compressImage(file, 1600, 1600, 0.85);
      setCustomPhoto('hero_featured_destination', dataUrl);
      setUploadNotice('Hero showcase photo updated successfully!');
      setTimeout(() => setUploadNotice(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden" id="hero-section">
      {/* Background with warm ambient lighting & authentic imagery */}
      <div className="absolute inset-0 -z-10 bg-[#FAF8F5]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply"
          style={{
            backgroundImage: `url(${betGiyorgisHeroImg})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/90 to-[#FAF8F5]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upload Success Feedback Banner */}
        {uploadNotice && (
          <div className="mb-6 p-3.5 rounded-2xl bg-[#1E3A2F] text-white border border-[#D49A3D] shadow-lg flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#34A853] flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">{uploadNotice}</span>
            </div>
            <button
              onClick={() => setUploadNotice(null)}
              className="text-xs text-[#D49A3D] hover:underline font-bold px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A2F]/10 border border-[#1E3A2F]/20 text-[#1E3A2F] text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D49A3D]" />
              <span className="tracking-wide">{t('connecting_tagline', 'Connecting the World with the Heart of Ethiopia')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E3A2F] tracking-tight leading-[1.12]">
                {t('hero_title_main', 'BRIDGE ETHIOPIA')} <br className="hidden sm:inline" />
                <span className="text-[#B85C38] font-serif italic text-3xl sm:text-4xl lg:text-5xl block mt-1">
                  {t('hero_tagline', 'Cultural Journeys & Authentic Living')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#52483E] leading-relaxed max-w-2xl font-normal">
                {t('hero_desc', 'Explore Ethiopia through trusted local guides, authentic cultural experiences, breathtaking destinations, traditional food, coffee ceremonies, festivals, and unforgettable journeys.')}
              </p>
            </div>

            {/* Value Proposition Micro Badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#5C5247] font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#1E3A2F]" />
                <span>{t('hero_stat_exp_lbl', 'Trusted Local Knowledge')}</span>
              </div>
              <span className="text-[#D9D0C1]">•</span>
              <div className="flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#D49A3D]" />
                <span>{t('coffee_badge', 'Authentic Experiences')}</span>
              </div>
              <span className="text-[#D9D0C1]">•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#E5AC4D] fill-[#E5AC4D]" />
                <span>{t('about_title', 'Ethiopian Hospitality')}</span>
              </div>
            </div>

            {/* The 4 Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl bg-[#1E3A2F] hover:bg-[#162D24] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                id="hero-explore-btn"
              >
                <Compass className="w-4 h-4 text-[#D49A3D]" />
                <span>{t('hero_cta_explore', 'Explore Ethiopia')}</span>
              </button>

              <button
                onClick={onPlanTripClick}
                className="px-6 py-3.5 rounded-xl bg-[#B85C38] hover:bg-[#A04D2C] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                id="hero-plan-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('btn_plan_my_trip', 'Plan My Trip')}</span>
              </button>

              <button
                onClick={onBookExperienceClick}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF6EE] text-[#1E3A2F] border border-[#1E3A2F]/30 font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                id="hero-book-btn"
              >
                <Sparkles className="w-4 h-4 text-[#D49A3D]" />
                <span>{t('btn_book_experience', 'Book an Experience')}</span>
              </button>

              <button
                onClick={onContactClick}
                className="px-5 py-3.5 rounded-xl bg-[#F2EFE9] hover:bg-[#E8E1D5] text-[#423B33] font-semibold text-sm transition-all"
                id="hero-contact-btn"
              >
                <span>{t('nav_contact', 'Contact Us')}</span>
              </button>
            </div>

            {/* Founder Note & Trust Guarantee */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs flex items-center gap-3.5 max-w-xl group relative">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp"
                onChange={handleAvatarFile}
                className="hidden"
                id="hero-avatar-file-input"
              />
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#D49A3D] shadow-xs">
                <img
                  src={photos.heroAvatar}
                  alt={FOUNDER_INFO.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isAdminMode && (
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                    title="Upload Founder Photo directly from your device"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                )}
              </div>
              <div className="text-xs text-[#52483E] flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#1E3A2F] text-sm">
                    {FOUNDER_INFO.name} <span className="text-[#8C7E6D] font-normal text-xs">• Founder & General Manager</span>
                  </p>
                  {isAdminMode && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="text-[11px] text-[#1E3A2F] bg-[#FAF6EE] hover:bg-[#D49A3D]/20 border border-[#D49A3D]/40 px-2 py-0.5 rounded-md font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Upload from device"
                      >
                        <Camera className="w-3 h-3 text-[#B85C38]" />
                        <span>{isUploading ? 'Saving...' : 'Upload Photo'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openUploadModal('heroAvatar')}
                        className="text-[10px] text-[#8C7E6D] hover:text-[#1E3A2F] hover:underline font-medium cursor-pointer"
                        title="Open full photo manager"
                      >
                        Manager
                      </button>
                    </div>
                  )}
                </div>
                <p className="italic text-[#6B6155] line-clamp-2 mt-0.5">
                  &quot;Like a trusted Ethiopian friend welcoming you home. Honest advice, local knowledge, and genuine cultural immersion.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <input
              ref={showcaseInputRef}
              type="file"
              accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp"
              onChange={handleShowcaseFile}
              className="hidden"
              id="hero-showcase-file-input"
            />
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Visual Hero Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 group img-zoom-parent bg-slate-900">
                <AuthenticImage
                  src={heroMountainShowcaseImg}
                  alt="Authentic Ethiopia Alpine Mountain Peaks and Living Heritage"
                  subjectName="Bale Mountains Alpine Peaks & Living Heritage"
                  photoKey="hero_featured_destination"
                  photoCategory="destination"
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Direct Upload Trigger on Hero Card (Founder Admin Only) */}
                {isAdminMode && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openUploadModal({
                        key: 'hero_featured_destination',
                        title: '🌟 First Page Hero Showcase Photo',
                        category: 'destination',
                        currentSrc: heroMountainShowcaseImg,
                        aspectRatio: 'portrait'
                      })}
                      className="px-3 py-1.5 rounded-full bg-black/80 hover:bg-[#1E3A2F] text-white text-xs font-bold backdrop-blur-md border border-[#D49A3D] shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      title="Upload or change photo for this showcase card"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                )}

                {/* Floating Caption on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[11px] font-extrabold uppercase tracking-wider">
                    Authentic Ethiopia
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif">
                    From Mountain Peaks to Living Heritage
                  </h3>
                  <p className="text-xs text-white/90 line-clamp-2">
                    Lalibela, Wenchi Caldera, Bale Mountains, Harar, Omo Valley, and traditional coffee ceremonies.
                  </p>
                </div>
              </div>

              {/* Floating Badge: Hindek Kitchen Signature */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E8E1D5] max-w-[210px] hidden sm:flex items-center gap-3 animate-in fade-in duration-500">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center flex-shrink-0 text-[#B85C38]">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E3A2F]">Hindek Kitchen</div>
                  <div className="text-[10px] text-[#7A7063]">Authentic Cooking & Coffee Ceremony</div>
                </div>
              </div>

              {/* Floating Badge: Trusted Local Guide */}
              <div className="absolute -top-4 -right-4 bg-[#1E3A2F] text-white px-3.5 py-2 rounded-2xl shadow-xl border border-[#D49A3D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D49A3D]" />
                <span className="text-xs font-bold tracking-wide">Trusted Local Experiences</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search / Interactive Filter Bar */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-[#E8E1D5] max-w-5xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Region Selector */}
            <div className="sm:col-span-4 flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <MapPin className="w-5 h-5 text-[#B85C38] flex-shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] uppercase font-bold text-[#8C7E6D]">{t('search_region_label', 'Destination Region')}</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#1E3A2F] focus:outline-none cursor-pointer"
                >
                  <option value="">{t('search_all_regions', 'All Regions of Ethiopia')}</option>
                  <option value="addis-ababa">Addis Ababa (Capital)</option>
                  <option value="oromia">Oromia (Wenchi, Bale, Sof Omar)</option>
                  <option value="northern-ethiopia">Northern (Lalibela, Gondar, Simien)</option>
                  <option value="southern-ethiopia">Southern (Arba Minch, Omo Valley, Dorze, Konso)</option>
                  <option value="eastern-ethiopia">Eastern (Harar Walled City)</option>
                  <option value="afar-danakil">Afar & Danakil Depression</option>
                  <option value="kafa-southwest">Kafa (Birthplace of Coffee)</option>
                </select>
              </div>
            </div>

            {/* Experience Type Selector */}
            <div className="sm:col-span-5 flex items-center gap-3 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5]">
              <Compass className="w-5 h-5 text-[#D49A3D] flex-shrink-0" />
              <div className="w-full text-left">
                <label className="block text-[10px] uppercase font-bold text-[#8C7E6D]">{t('search_experience_label', 'Experience Type')}</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#1E3A2F] focus:outline-none cursor-pointer"
                >
                  <option value="">{t('search_all_types', 'All Travel Experiences')}</option>
                  <option value="hindek-kitchen">{t('nav_hindek_kitchen', 'Hindek Kitchen Cooking Class')}</option>
                  <option value="coffee">{t('nav_coffee', 'Hindek Grandpa Coffee Experience')}</option>
                  <option value="historical">Historic & UNESCO Monuments</option>
                  <option value="cultural">Cultural & Ethnic Traditions</option>
                  <option value="nature">Nature & Mountain Trekking</option>
                  <option value="wildlife">Endemic Wildlife Safaris</option>
                  <option value="festivals">{t('nav_festivals', 'Ethiopian Festivals & Celebrations')}</option>
                </select>
              </div>
            </div>

            {/* Search CTA */}
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-[#D49A3D]" />
                <span>{t('search_btn', 'Find Experience')}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
