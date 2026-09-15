import React, { useState } from 'react';
import { Logo } from './Logo';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useLanguage } from '../context/LanguageContext';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { TravelGuideModal } from './TravelGuideModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Coffee, 
  Utensils,
  ArrowUp,
  Camera,
  BookOpen,
  Send,
  CheckCircle2,
  Calendar,
  Bell,
  Share2,
  Check,
  Download,
  FileText
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPlanTrip: () => void;
  onOpenPhotoGuide?: () => void;
  onOpenUploadModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPlanTrip,
  onOpenPhotoGuide,
  onOpenUploadModal,
}) => {
  const { t } = useLanguage();
  const { isAdminMode, openUploadModal, toggleAdminMode } = useFounderPhoto();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isTravelGuideOpen, setIsTravelGuideOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? (window.location.origin || window.location.href) : 'https://bridge-ethiopia.com';
    const shareData = {
      title: 'Bridge Ethiopia | Authentic Cultural Tours & Local Guiding',
      text: 'Discover authentic Ethiopia with Hindek: private cultural tours, Hindek Kitchen cooking classes, traditional Grandpa coffee ceremonies, and curated expeditions.',
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await fallbackCopy(shareUrl);
        }
      }
    } else {
      await fallbackCopy(shareUrl);
    }
  };

  const fallbackCopy = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy link:', e);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate quick save & store subscription locally
    setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('bridge_ethiopia_subscribers') || '[]');
        if (!saved.includes(email.trim().toLowerCase())) {
          saved.push(email.trim().toLowerCase());
          localStorage.setItem('bridge_ethiopia_subscribers', JSON.stringify(saved));
        }
      } catch (err) {
        console.error('Error saving subscriber:', err);
      }

      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  return (
    <footer className="bg-[#12241D] text-white border-t border-[#1E3A2F]" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-12">
        
        {/* Free Ethiopia Travel Guide & Festival Calendar Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1A382C] via-[#1E3E31] to-[#254B3B] p-6 sm:p-8 lg:p-10 border border-[#2E5A48] shadow-xl relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#D49A3D]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#34A853]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-2.5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3D]/20 border border-[#D49A3D]/40 text-[#E5AC4D] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Free Traveler Insider Guide &amp; Festival Calendar</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Get Your Free 2025/2026 Ethiopia Travel Guide
              </h3>

              <p className="text-xs sm:text-sm text-[#D9D0C1] leading-relaxed max-w-xl">
                Curated by local guide Hindek: Sacred festival dates (Timkat, Meskel, Irreecha), highland weather guides, essential packing lists, and authentic culinary customs.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsTravelGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#E5AC4D] hover:text-white font-bold underline underline-offset-4 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Preview Guide Directly</span>
                </button>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="p-5 rounded-2xl bg-[#142C23] border border-[#34A853]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left animate-in fade-in zoom-in-95">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#34A853] flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Your Guide Is Ready!</span>
                        <span className="text-[10px] uppercase font-extrabold bg-[#34A853]/20 text-[#34A853] px-2 py-0.5 rounded-full">
                          Unlocked
                        </span>
                      </h4>
                      <p className="text-xs text-[#D9D0C1]">
                        Thank you for joining Bridge Ethiopia. You can view or print the guide now.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsTravelGuideOpen(true)}
                    className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <BookOpen className="w-4 h-4 text-[#1E3A2F]" />
                    <span>Open Travel Guide</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5 text-left">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7E6D]">
                        <Mail className="w-4 h-4 text-[#D49A3D]" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Enter your email for instant guide..."
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#12241D] border border-[#2E5A48] focus:border-[#D49A3D] focus:ring-2 focus:ring-[#D49A3D]/20 text-white placeholder-[#8C7E6D] text-xs sm:text-sm outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] disabled:bg-[#8C7E6D] text-[#1E3A2F] font-bold text-xs sm:text-sm shadow-md inline-flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1E3A2F] border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Guide...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Free Guide</span>
                          <Download className="w-3.5 h-3.5 text-[#1E3A2F]" />
                        </>
                      )}
                    </button>
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-[#FF6B6B] font-medium">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-[#A69989]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                    <span>Instant access • 100% Free • No spam, honest cultural guidance only.</span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Logo (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <span className="block font-serif font-black text-xl tracking-wider text-white">
                  BRIDGE ETHIOPIA
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-[#D49A3D] font-bold">
                  Your Trusted Local Guide
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D9D0C1] leading-relaxed max-w-md">
              Connecting the world with the heart of Ethiopia through trusted local guides, 
              authentic cultural experiences, traditional food, sacred coffee ceremonies, and unforgettable journeys.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#E8E1D5] space-y-2 max-w-md">
              <div className="font-bold text-[#D49A3D] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                  <span>Our Authentic Pledge</span>
                </div>
                {onOpenPhotoGuide && (
                  <button
                    type="button"
                    onClick={onOpenPhotoGuide}
                    className="text-[11px] text-[#D49A3D] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Photo Guide</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#C4B5A5]">
                We showcase authentic Ethiopian landscapes, living heritage, and genuine cuisine.
              </p>
              {onOpenUploadModal && (
                <button
                  type="button"
                  onClick={onOpenUploadModal}
                  className="mt-1 text-[11px] text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Camera className="w-3 h-3 text-[#D49A3D]" />
                  <span>Upload &amp; Manage Real Photos</span>
                </button>
              )}
            </div>

            <div className="text-xs text-[#8C7E6D]">
              Founded by <strong className="text-white">{FOUNDER_INFO.name}</strong> • Local Tourism Advocate
            </div>
          </div>

          {/* Column 2: Experiences & Food (3 Cols) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49A3D]">
              Signature Experiences
            </h4>
            <ul className="space-y-2 text-xs text-[#D9D0C1]">
              <li>
                <button
                  onClick={() => onNavigate('hindek-kitchen-section')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Hindek Kitchen Cooking Class</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hindek-coffee-section')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Coffee className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Grandpa Coffee Ceremony</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ethiopian-food-gallery-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Authentic Ethiopian & Oromo Food
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ethiopian-festivals-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Ethiopian Festivals & Celebrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('travel-assistance-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Airport Pickup & Local SIM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('community-ngo-section')}
                  className="hover:text-white transition-colors text-left text-[#D49A3D] font-medium"
                >
                  Community & NGO Support (Schools, Health, Orphanages)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations & Regions (2 Cols) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49A3D]">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-[#D9D0C1]">
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Addis Ababa City
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Wenchi Crater Lake
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Bale Mountains
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Lalibela Rock Churches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Harar Jugol Walled City
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Lower Omo Valley
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore-ethiopia-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Danakil Depression
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (2 Cols) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D49A3D]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#D9D0C1]">
              <a
                href={`tel:${FOUNDER_INFO.phone}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#D49A3D] flex-shrink-0" />
                <span>{FOUNDER_INFO.phone}</span>
              </a>
              
              <a
                href={`mailto:${FOUNDER_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#D49A3D] flex-shrink-0" />
                <span>{FOUNDER_INFO.email}</span>
              </a>

              <div className="flex items-start gap-1.5 text-[#8C7E6D] text-[11px] pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D49A3D] flex-shrink-0 mt-0.5" />
                <span>{FOUNDER_INFO.location}</span>
              </div>
            </div>

            {/* WhatsApp & Web Share API Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=Hello%20Hindek%2C%20I%20am%20interested%20in%20visiting%20Ethiopia%20with%20Bridge%20Ethiopia!`}
                target="_blank"
                rel="noreferrer"
                id="footer-whatsapp-btn"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-xs transition-colors shadow-xs group"
                title="Chat with Hindek on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                id="footer-share-btn"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer group"
                title="Share Bridge Ethiopia link via Web Share or copy URL"
                aria-label="Share Bridge Ethiopia website"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853] flex-shrink-0 animate-in zoom-in-75" />
                    <span className="text-[#34A853] truncate">{t('btn_share_copied', 'Copied!')}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#D49A3D] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="truncate">{t('btn_share', 'Share')}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onOpenPlanTrip}
              id="footer-plan-my-trip-btn"
              className="w-full py-2.5 px-3 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] font-bold text-xs transition-colors shadow-md text-center block cursor-pointer"
            >
              Plan My Trip
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E6D]">
          <div>
            © {new Date().getFullYear()} <strong>BRIDGE ETHIOPIA</strong>. {t('connecting_tagline', 'Connecting the World with the Heart of Ethiopia')}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white/10 px-2 py-1 rounded-lg border border-white/15">
              <LanguageSwitcher variant="compact" />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!isAdminMode) {
                  toggleAdminMode();
                }
                openUploadModal();
              }}
              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isAdminMode
                  ? 'bg-[#D49A3D] text-[#1E3A2F] border-[#D49A3D] font-bold shadow-sm'
                  : 'text-[#D9D0C1]/80 hover:text-white border-white/10 hover:border-white/30'
              }`}
              title="Founder Portal: Manage website photos & export permanent bundle"
            >
              <Camera className="w-3 h-3 text-[#D49A3D]" />
              <span>{isAdminMode ? '👑 Founder Admin' : 'Founder Login'}</span>
            </button>

            {onOpenPhotoGuide && (
              <button
                type="button"
                onClick={onOpenPhotoGuide}
                className="text-[11px] text-[#D9D0C1] hover:text-[#D49A3D] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Photo Guide</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Free Travel Guide & Festival Calendar Modal */}
      <TravelGuideModal
        isOpen={isTravelGuideOpen}
        onClose={() => setIsTravelGuideOpen(false)}
        onPlanTrip={onOpenPlanTrip}
      />
    </footer>
  );
};
