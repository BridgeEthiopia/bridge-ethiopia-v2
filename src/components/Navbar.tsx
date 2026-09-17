import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { useInquiries } from '../context/InquiriesContext';
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Compass, 
  Calendar, 
  Utensils, 
  Coffee, 
  ShieldCheck, 
  Briefcase,
  ChevronDown,
  Camera,
  Inbox,
  ShoppingBag,
  HandHeart
} from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenBooking?: (itemTitle?: string) => void;
  onOpenPlanTrip: () => void;
  onOpenAiAssistant?: () => void;
  onOpenAdmin?: () => void;
  onOpenInbox?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  setActiveTab,
  onNavigate,
  onOpenBooking,
  onOpenPlanTrip,
  onOpenAiAssistant,
  onOpenAdmin,
  onOpenInbox,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [experiencesDropdown, setExperiencesDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const { openUploadModal, isAdminMode } = useFounderPhoto();
  const { unreadCount, openInbox } = useInquiries();
  const { t } = useLanguage();

  const handleInboxClick = () => {
    if (onOpenInbox) {
      onOpenInbox();
    } else {
      openInbox();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionMapping: Record<string, string> = {
    'home': 'hero-section',
    'destinations': 'explore-ethiopia-section',
    'map': 'interactive-ethiopia-map',
    'tours': 'tours-section',
    'hindek-kitchen': 'hindek-kitchen-section',
    'coffee-experience': 'hindek-coffee-section',
    'coffee-packages': 'coffee-packages-section',
    'food-gallery': 'ethiopian-food-gallery-section',
    'festivals': 'ethiopian-festivals-section',
    'travel-assistance': 'travel-assistance-section',
    'community-ngo': 'community-ngo-section',
    'hotels': 'accommodations-section',
    'about': 'about-section',
    'reviews': 'reviews-section',
    'how-to-book': 'how-to-book-section',
    'contact': 'contact-section'
  };

  const handleNavClick = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setMobileMenuOpen(false);
    setExperiencesDropdown(false);
    setMoreDropdown(false);

    const targetSection = sectionMapping[tabId] || tabId;
    if (targetSection === 'hero-section' || tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(targetSection);
    }
  };

  const handleBookingClick = (experienceTitle: string = 'Custom Travel Experience') => {
    if (typeof onOpenBooking === 'function') {
      onOpenBooking(experienceTitle);
    } else {
      onNavigate('contact-section');
    }
  };

  const handleAssistantClick = () => {
    if (typeof onOpenAiAssistant === 'function') {
      onOpenAiAssistant();
    } else {
      onNavigate('travel-assistance-section');
    }
  };

  const handleAdminClick = () => {
    if (typeof onOpenAdmin === 'function') {
      onOpenAdmin();
    } else {
      openUploadModal();
    }
  };

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E8E1D5] py-2.5'
          : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-[#E8E1D5]/60 py-3.5'
      }`}
    >
      {/* Top micro-bar for quick contact & language switcher */}
      <div className="hidden lg:block border-b border-[#E8E1D5]/50 pb-1.5 mb-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#6B6155]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-[#1E3A2F] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
              {t('official_badge', 'Official Platform of Hindek • Addis Ababa, Ethiopia')}
            </span>
            <span className="text-[#8C7E6D]">|</span>
            <span className="italic text-[#8C7E6D]">{t('connecting_tagline', 'Connecting the World with the Heart of Ethiopia')}</span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="compact" />
            <span className="text-[#D9D0C1]">|</span>
            <a
              href={`tel:${FOUNDER_INFO.phone}`}
              className="inline-flex items-center gap-1 hover:text-[#1E3A2F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>{FOUNDER_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                'Hello Hindek! I am planning a trip to Ethiopia and would love your trusted local guidance.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#1E3A2F] hover:text-[#166534] font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{t('btn_whatsapp_direct', 'WhatsApp Direct')}</span>
            </a>
            {isAdminMode && (
              <>
                <button
                  type="button"
                  onClick={() => openUploadModal()}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A2F] hover:text-[#B85C38] bg-[#D49A3D]/20 hover:bg-[#D49A3D]/30 px-3 py-1 rounded-md border border-[#D49A3D]/50 transition-colors cursor-pointer shadow-sm animate-in fade-in"
                  title="Photo Manager (Founder Mode Active)"
                >
                  <Camera className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Manage Photos</span>
                </button>
                <button
                  onClick={handleAdminClick}
                  className="text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer bg-[#1E3A2F] text-white border-[#1E3A2F] font-semibold"
                  title="Founder Mode is Active (Click to open manager)"
                >
                  👑 Founder Mode
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus:ring-2 focus:ring-[#D49A3D] rounded-lg p-1"
          aria-label="Bridge Ethiopia Home"
        >
          <Logo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-sm font-medium text-[#423B33]">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'home'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            {t('nav_home', 'Home')}
          </button>

          <button
            onClick={() => handleNavClick('destinations')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'destinations'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            {t('nav_destinations', 'Explore Ethiopia')}
          </button>

          <button
            onClick={() => handleNavClick('map')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'map'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => handleNavClick('tours')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'tours'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            {t('nav_tours', 'Tours & Expeditions')}
          </button>

          {/* Experiences Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setExperiencesDropdown(!experiencesDropdown)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                ['hindek-kitchen', 'coffee-experience', 'food-gallery', 'festivals'].includes(activeTab)
                  ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                  : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
              }`}
            >
              <span>{t('nav_experiences', 'Experiences')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-[#E8E1D5] py-2 hidden group-hover:block transition-all animate-in fade-in duration-200">
              <button
                onClick={() => handleNavClick('hindek-kitchen')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] flex items-center gap-2.5 text-[#2E2822]"
              >
                <Utensils className="w-4 h-4 text-[#B85C38]" />
                <div>
                  <div className="font-semibold text-sm">{t('nav_hindek_kitchen', 'Hindek Kitchen')}</div>
                  <div className="text-[11px] text-[#7A7063]">Cultural Cooking Immersion</div>
                </div>
              </button>
              <button
                onClick={() => handleNavClick('coffee-experience')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] flex items-center gap-2.5 text-[#2E2822]"
              >
                <Coffee className="w-4 h-4 text-[#D49A3D]" />
                <div>
                  <div className="font-semibold text-sm">{t('nav_coffee', 'Grandpa Coffee Experience')}</div>
                  <div className="text-[11px] text-[#7A7063]">3-Cup Sacred Ceremony & Tradition</div>
                </div>
              </button>
              <button
                onClick={() => handleNavClick('coffee-packages')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] flex items-center gap-2.5 text-[#2E2822]"
              >
                <ShoppingBag className="w-4 h-4 text-[#B85C38]" />
                <div>
                  <div className="font-semibold text-sm">Hindek Coffee Packages</div>
                  <div className="text-[11px] text-[#7A7063]">1kg Half Roast, 200g Black & Green Beans</div>
                </div>
              </button>
              <button
                onClick={() => handleNavClick('food-gallery')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] flex items-center gap-2.5 text-[#2E2822]"
              >
                <Utensils className="w-4 h-4 text-[#1E3A2F]" />
                <div>
                  <div className="font-semibold text-sm">{t('nav_food', 'Food Gallery')}</div>
                  <div className="text-[11px] text-[#7A7063]">Authentic Ethiopian Flavors & Heritage</div>
                </div>
              </button>
              <button
                onClick={() => handleNavClick('festivals')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] flex items-center gap-2.5 text-[#2E2822]"
              >
                <Calendar className="w-4 h-4 text-[#B85C38]" />
                <div>
                  <div className="font-semibold text-sm">{t('nav_festivals', 'Festivals')}</div>
                  <div className="text-[11px] text-[#7A7063]">Timkat, Irreecha, Meskel & Celebrations</div>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('travel-assistance')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'travel-assistance'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            {t('nav_travel_assistance', 'Travel Concierge')}
          </button>

          <button
            onClick={() => handleNavClick('hotels')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'hotels'
                ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
            }`}
          >
            {t('nav_hotels', 'Eco-Lodges & Stays')}
          </button>

          {/* More Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setMoreDropdown(!moreDropdown)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                ['about', 'reviews', 'how-to-book', 'contact'].includes(activeTab)
                  ? 'text-[#1E3A2F] bg-[#1E3A2F]/10 font-bold'
                  : 'hover:text-[#1E3A2F] hover:bg-[#F2EFE9]'
              }`}
            >
              <span>{t('nav_more', 'More Guides')}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-[#E8E1D5] py-2 hidden group-hover:block transition-all animate-in fade-in duration-200">
              <button
                onClick={() => handleNavClick('community-ngo')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-sm text-[#2E2822] flex items-center gap-2.5 border-b border-[#F2EFE9]"
              >
                <HandHeart className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-xs text-[#1E3A2F]">Community & NGO Support</div>
                  <div className="text-[10px] text-[#7A7063]">Schools, Health, Orphanages & Govt Guidance</div>
                </div>
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-sm text-[#2E2822]"
              >
                {t('nav_about', 'About Hindek')}
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-sm text-[#2E2822]"
              >
                {t('nav_reviews', 'Traveler Reviews')}
              </button>
              <button
                onClick={() => handleNavClick('how-to-book')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-sm text-[#2E2822]"
              >
                {t('nav_how_to_book', 'How to Book')}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-sm text-[#2E2822]"
              >
                {t('nav_contact', 'Contact Us')}
              </button>
            </div>
          </div>
        </nav>

        {/* Action Buttons & Language Switcher */}
        <div className="hidden lg:flex items-center gap-2.5">
          <LanguageSwitcher variant="compact" />

          {/* Admin Inbox Trigger with Live Badge (Only visible in Founder Mode) */}
          {isAdminMode && (
            <button
              onClick={handleInboxClick}
              className="p-2 rounded-xl bg-[#FAF6EE] border border-[#D49A3D]/40 text-[#1E3A2F] hover:bg-[#D49A3D]/20 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer relative"
              title="Hindek Admin Inquiries & Bookings Inbox"
              id="navbar-admin-inbox-btn"
            >
              <Inbox className="w-3.5 h-3.5 text-[#B85C38]" />
              <span className="hidden 2xl:inline">Inbox</span>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-extrabold bg-[#B85C38] text-white rounded-full leading-none animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {isAdminMode && (
            <button
              onClick={() => openUploadModal()}
              className="p-2 rounded-xl bg-[#FAF6EE] border border-[#D49A3D]/40 text-[#1E3A2F] hover:bg-[#D49A3D]/20 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="Upload custom photos (Founder Admin)"
            >
              <Camera className="w-3.5 h-3.5 text-[#B85C38]" />
              <span className="hidden 2xl:inline">{t('btn_upload_photos', 'Upload Photos')}</span>
            </button>
          )}

          <button
            onClick={handleAssistantClick}
            className="p-2 rounded-xl bg-[#FAF6EE] border border-[#E8E1D5] text-[#1E3A2F] hover:bg-[#1E3A2F]/5 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Ask AI Travel Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span className="hidden 2xl:inline">{t('btn_ask_ai', 'AI Concierge')}</span>
          </button>

          <button
            onClick={onOpenPlanTrip}
            className="px-3.5 py-2 rounded-xl bg-[#FAF6EE] border border-[#1E3A2F]/20 text-[#1E3A2F] hover:bg-[#1E3A2F]/10 font-semibold text-xs transition-all shadow-sm"
          >
            {t('btn_plan_my_trip', 'Plan My Trip')}
          </button>

          <button
            onClick={() => handleBookingClick('Custom Travel Experience')}
            className="px-4 py-2 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow"
          >
            {t('btn_book_experience', 'Book an Experience')}
          </button>
        </div>

        {/* Mobile Menu & Quick Lang Toggle Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher variant="compact" />
          <button
            onClick={() => handleBookingClick('Bridge Ethiopia Experience')}
            className="px-3 py-1.5 rounded-lg bg-[#1E3A2F] text-white text-xs font-bold"
          >
            {t('btn_book_experience', 'Book')}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#F2EFE9] text-[#1E3A2F] hover:bg-[#E8E1D5] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E8E1D5] shadow-2xl px-5 py-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
          {/* Mobile Language Selector */}
          <div className="mb-4 pb-3 border-b border-[#E8E1D5]">
            <div className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E6D] mb-2">
              {t('lbl_language', 'Language')} / Afaan / ቋንቋ
            </div>
            <LanguageSwitcher variant="segmented" />
          </div>

          <div className="flex flex-col gap-1 pb-4 border-b border-[#E8E1D5]">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                activeTab === 'home' ? 'bg-[#1E3A2F] text-white' : 'text-[#2E2822]'
              }`}
            >
              {t('nav_home', 'Home')}
            </button>
            <button
              onClick={() => handleNavClick('destinations')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                activeTab === 'destinations' ? 'bg-[#1E3A2F] text-white' : 'text-[#2E2822]'
              }`}
            >
              {t('nav_destinations', 'Explore Ethiopia')}
            </button>
            <button
              onClick={() => handleNavClick('map')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold flex items-center gap-2 ${
                activeTab === 'map' ? 'bg-[#1E3A2F] text-white' : 'text-[#2E2822]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#D49A3D]" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => handleNavClick('tours')}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${
                activeTab === 'tours' ? 'bg-[#1E3A2F] text-white' : 'text-[#2E2822]'
              }`}
            >
              {t('nav_tours', 'Tours & Expeditions')}
            </button>
          </div>

          <div className="py-3 border-b border-[#E8E1D5]">
            <div className="text-xs uppercase tracking-wider font-bold text-[#8C7E6D] px-3 mb-2">
              {t('nav_experiences', 'Signature Experiences')}
            </div>
            <button
              onClick={() => handleNavClick('hindek-kitchen')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'hindek-kitchen' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#3E362E]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#B85C38]" />
              {t('nav_hindek_kitchen', 'Hindek Kitchen')} (Cooking Experience)
            </button>
            <button
              onClick={() => handleNavClick('coffee-experience')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'coffee-experience' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#3E362E]'
              }`}
            >
              <Coffee className="w-4 h-4 text-[#D49A3D]" />
              {t('nav_coffee', 'Hindek Grandpa Coffee Experience')}
            </button>
            <button
              onClick={() => handleNavClick('coffee-packages')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'coffee-packages' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#3E362E]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#B85C38]" />
              Hindek Coffee Packages (1kg, 200g & Green Beans)
            </button>
            <button
              onClick={() => handleNavClick('food-gallery')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'food-gallery' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#3E362E]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#1E3A2F]" />
              {t('nav_food', 'Ethiopian Food Gallery')}
            </button>
            <button
              onClick={() => handleNavClick('festivals')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'festivals' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#3E362E]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#B85C38]" />
              {t('nav_festivals', 'Festivals & Celebrations (Timkat & Irreecha)')}
            </button>
          </div>

          <div className="py-3 border-b border-[#E8E1D5] flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('community-ngo')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeTab === 'community-ngo' ? 'bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold' : 'text-[#1E3A2F]'
              }`}
            >
              <HandHeart className="w-4 h-4 text-[#B85C38]" />
              <span className="font-semibold">Community Support & NGO / Govt Guidance</span>
            </button>
            <button
              onClick={() => handleNavClick('travel-assistance')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_travel_assistance', 'Travel Services & Assistance')}
            </button>
            <button
              onClick={() => handleNavClick('hotels')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_hotels', 'Lodges & Accommodations')}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_about', 'About Hindek & Bridge Ethiopia')}
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_reviews', 'Traveler Reviews & Stories')}
            </button>
            <button
              onClick={() => handleNavClick('how-to-book')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_how_to_book', 'How To Book & Travel Tips')}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg text-sm font-medium text-[#3E362E]"
            >
              {t('nav_contact', 'Contact & Direct WhatsApp')}
            </button>
          </div>

          {/* Mobile CTAs */}
          <div className="pt-4 flex flex-col gap-2.5">
            {isAdminMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleInboxClick();
                }}
                className="w-full py-3 rounded-xl bg-[#FAF6EE] border border-[#D49A3D]/50 text-[#1E3A2F] font-bold text-center text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Inbox className="w-4 h-4 text-[#B85C38]" />
                <span>Admin Inbox & Bookings</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#B85C38] text-white rounded-full font-bold">
                    {unreadCount} new
                  </span>
                )}
              </button>
            )}
            {isAdminMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openUploadModal();
                }}
                className="w-full py-3 rounded-xl bg-[#FAF6EE] border border-[#D49A3D]/50 text-[#1E3A2F] font-bold text-center text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#B85C38]" />
                <span>{t('btn_upload_photos', 'Upload Photos')}</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlanTrip();
              }}
              className="w-full py-3 rounded-xl bg-[#FAF6EE] border border-[#1E3A2F]/30 text-[#1E3A2F] font-bold text-center text-sm"
            >
              {t('btn_plan_my_trip', 'Plan My Trip')}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleBookingClick('Custom Travel Experience');
              }}
              className="w-full py-3 rounded-xl bg-[#1E3A2F] text-white font-bold text-center text-sm"
            >
              {t('btn_book_experience', 'Book an Experience')}
            </button>
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                'Hello Hindek! I am contacting you from the Bridge Ethiopia website.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-center text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {t('btn_whatsapp_direct', 'Chat on WhatsApp')} ({FOUNDER_INFO.phone})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
