import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreEthiopiaSection } from './components/ExploreEthiopiaSection';
import { EthiopianDestinationsMap } from './components/EthiopianDestinationsMap';
import { ToursSection } from './components/ToursSection';
import { HindekKitchenSection } from './components/HindekKitchenSection';
import { HindekCoffeeSection } from './components/HindekCoffeeSection';
import { FoodGallerySection } from './components/FoodGallerySection';
import { FestivalsSection } from './components/FestivalsSection';
import { TravelAssistantSection } from './components/TravelAssistantSection';
import { CommunitySupportSection } from './components/CommunitySupportSection';
import { AccommodationsSection } from './components/AccommodationsSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { HowToBookSection } from './components/HowToBookSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { TourDetailModal } from './components/TourDetailModal';
import { PlanMyTripModal } from './components/PlanMyTripModal';
import { BookingModal } from './components/BookingModal';
import { CommunityInquiryModal } from './components/CommunityInquiryModal';
import { FounderPhotoUploadModal } from './components/FounderPhotoUploadModal';
import { PhotoGuideModal } from './components/PhotoGuideModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FounderPhotoProvider, useFounderPhoto } from './context/FounderPhotoContext';
import { LanguageProvider } from './context/LanguageContext';
import { InquiriesProvider } from './context/InquiriesContext';
import { Destination, Tour } from './types';
import { MessageCircle, Camera, ArrowRight, ArrowLeft, Home, Layers, CheckCircle, Sparkles } from 'lucide-react';
import { FOUNDER_INFO } from './data/ethiopiaData';

// Authentic images for step overview cards
import lalibelaImg from './assets/images/lalibela_st_george_church_1787813645261.jpg';
import danakilImg from './assets/images/danakil_dallol_springs_1787813682387.jpg';
import kitchenImg from './assets/images/kitchen-dish-doro-wat.jpg';
import coffeeImg from './assets/images/tour-hindek-grandpa-coffee-ceremony.jpg';
import festivalImg from './assets/images/meskel_demera_fire_1787814613769.jpg';
import skylineImg from './assets/images/addis_ababa_skyline_1787813744000.jpg';
import founderImg from './assets/images/hindek_real_photo_portrait.jpg';
import dorzeImg from './assets/images/arba_minch_dorze_1787901932452.jpg';

interface StepInfo {
  step: number;
  tabKey: string;
  title: string;
  badge: string;
  description: string;
  image: string;
}

const STEPS: StepInfo[] = [
  {
    step: 1,
    tabKey: 'destinations',
    title: 'Explore Destinations & Interactive Map',
    badge: 'Destinations',
    description: 'Bale Mountains, Lalibela rock churches, Danakil Depression, Oromia, Arba Minch & Harar.',
    image: lalibelaImg,
  },
  {
    step: 2,
    tabKey: 'tours',
    title: 'Curated Tours & Expeditions',
    badge: 'Tours',
    description: 'Personalized private expeditions with certified local experts across all regions of Ethiopia.',
    image: danakilImg,
  },
  {
    step: 3,
    tabKey: 'hindek-kitchen',
    title: 'Hindek Kitchen & Culinary Immersion',
    badge: 'Culinary Masterclass',
    description: 'Hands-on traditional Ethiopian cooking class, 100% teff injera making, and cultural feast.',
    image: kitchenImg,
  },
  {
    step: 4,
    tabKey: 'coffee-experience',
    title: 'Grandpa Sacred Coffee Ritual',
    badge: 'Coffee Ceremony',
    description: 'Traditional 3-cup Jebena brewing (Abol, Tona, Baraka), frankincense incense, and wild Kafa beans.',
    image: coffeeImg,
  },
  {
    step: 5,
    tabKey: 'festivals',
    title: 'Cultural Festivals & Heritage',
    badge: 'Festivals',
    description: 'Witness Timkat epiphany, Meskel Demera bonfires, Irreecha Thanksgiving, and holy pilgrimages.',
    image: festivalImg,
  },
  {
    step: 6,
    tabKey: 'travel-assistance',
    title: 'Local Travel Logistics & Support',
    badge: 'Services & NGO',
    description: 'Airport meet & greet, 4x4 transport, SIM cards, local translators, and community NGO liaison.',
    image: skylineImg,
  },
  {
    step: 7,
    tabKey: 'about',
    title: 'About Hindek & Bridge Ethiopia',
    badge: 'Our Mission',
    description: 'Meet Hindek, our licensed guides, our ethical tourism philosophy, and community impact.',
    image: founderImg,
  },
  {
    step: 8,
    tabKey: 'reviews',
    title: 'Traveler Reviews & Direct Booking',
    badge: 'Reviews & Contact',
    description: 'Read verified traveler experiences and send your custom trip inquiry directly to Hindek.',
    image: dorzeImg,
  },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPhotoGuideOpen, setIsPhotoGuideOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>('Custom Ethiopian Journey & Tour');
  const [bookingDestination, setBookingDestination] = useState<string>('Addis Ababa & Oromia');
  
  // Community Giving & NGO / Government Guidance Modal State
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [communityTopic, setCommunityTopic] = useState<'schools' | 'health' | 'orphanage' | 'government' | 'ngo' | 'general'>('general');
  const [communityServiceName, setCommunityServiceName] = useState('');

  const handleOpenCommunityInquiry = (topic: 'schools' | 'health' | 'orphanage' | 'government' | 'ngo' | 'general', serviceName?: string) => {
    setCommunityTopic(topic);
    setCommunityServiceName(serviceName || '');
    setIsCommunityModalOpen(true);
  };
  
  const { openUploadModal, isAdminMode } = useFounderPhoto();

  // Helper to map tabKey to step number (1-8)
  const getStepNumber = (tab: string): number => {
    switch (tab) {
      case 'destinations':
      case 'map':
        return 1;
      case 'tours':
        return 2;
      case 'hindek-kitchen':
      case 'food-gallery':
        return 3;
      case 'coffee-experience':
      case 'coffee-packages':
        return 4;
      case 'festivals':
        return 5;
      case 'travel-assistance':
      case 'community-ngo':
      case 'hotels':
        return 6;
      case 'about':
        return 7;
      case 'reviews':
      case 'how-to-book':
      case 'contact':
        return 8;
      default:
        return 1;
    }
  };

  const currentStepNumber = getStepNumber(activeTab);

  const goToStep = (stepNum: number) => {
    const target = STEPS.find((s) => s.step === stepNum);
    if (target) {
      setActiveTab(target.tabKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const idToTab: Record<string, string> = {
      'hero-section': 'home',
      'explore-ethiopia-section': 'destinations',
      'interactive-ethiopia-map': 'destinations',
      'tours-section': 'tours',
      'hindek-kitchen-section': 'hindek-kitchen',
      'hindek-coffee-section': 'coffee-experience',
      'coffee-packages-section': 'coffee-experience',
      'ethiopian-food-gallery-section': 'hindek-kitchen',
      'ethiopian-festivals-section': 'festivals',
      'travel-assistance-section': 'travel-assistance',
      'community-ngo-section': 'travel-assistance',
      'accommodations-section': 'travel-assistance',
      'about-section': 'about',
      'reviews-section': 'reviews',
      'how-to-book-section': 'reviews',
      'contact-section': 'contact'
    };

    const targetTab = idToTab[sectionId] || sectionId;
    setActiveTab(targetTab);

    setTimeout(() => {
      if (sectionId === 'hero-section' || targetTab === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }, 60);
  };

  const handleBookExperience = (experienceTitle: string, destinationName?: string) => {
    setBookingService(experienceTitle || 'Custom Ethiopian Journey & Tour');
    if (destinationName) {
      setBookingDestination(destinationName);
    }
    setIsBookingModalOpen(true);
  };

  const handleSearchFilter = (region: string, category: string) => {
    if (category.includes('kitchen') || category.includes('cooking')) {
      handleNavigate('hindek-kitchen-section');
    } else if (category.includes('coffee')) {
      handleNavigate('hindek-coffee-section');
    } else if (category.includes('festivals')) {
      handleNavigate('ethiopian-festivals-section');
    } else {
      handleNavigate('explore-ethiopia-section');
    }
  };

  // Step Navigation Bar for active step views
  const renderStepNavControls = () => (
    <div className="bg-[#1E3A2F] text-white py-3.5 px-4 shadow-md sticky top-16 z-30 border-y border-[#D49A3D]/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D49A3D] text-[#1E3A2F] hover:bg-[#c28b34] transition-all cursor-pointer text-xs sm:text-sm font-bold shadow-sm"
            title="Return to Bridge Ethiopia Home Page"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Home className="w-4 h-4" />
            <span>Back to Home Page</span>
          </button>
          <span className="text-white/40">/</span>
          <span className="text-[#FAF8F5] font-semibold text-xs sm:text-sm">
            {STEPS[currentStepNumber - 1]?.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {currentStepNumber > 1 && (
            <button
              onClick={() => goToStep(currentStepNumber - 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          )}

          {currentStepNumber < 8 ? (
            <button
              onClick={() => goToStep(currentStepNumber + 1)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#D49A3D] hover:bg-[#c28b34] text-[#1E3A2F] font-bold transition-colors cursor-pointer text-xs sm:text-sm shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D49A3D] hover:bg-[#c28b34] text-[#1E3A2F] font-bold transition-colors cursor-pointer text-xs sm:text-sm shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home Page</span>
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer text-xs"
            title="View all sections on one page"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Show All</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2E2822] font-sans antialiased selection:bg-[#D49A3D]/30 selection:text-[#1E3A2F]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={handleNavigate}
        onOpenBooking={handleBookExperience}
        onOpenPlanTrip={() => setIsPlanTripOpen(true)}
        onOpenAiAssistant={() => handleNavigate('travel-assistance-section')}
        onOpenAdmin={() => openUploadModal()}
      />

      {/* Main Content Flow */}
      <main className="pt-20 lg:pt-24">
        {/* Step-by-step navigation banner when a step is active */}
        {activeTab !== 'home' && activeTab !== 'all' && renderStepNavControls()}

        {/* Navigation bar when Show All is active */}
        {activeTab === 'all' && (
          <div className="bg-[#1E3A2F] text-white py-3.5 px-4 shadow-md sticky top-16 z-30 border-y border-[#D49A3D]/30">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-sm">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D49A3D] text-[#1E3A2F] hover:bg-[#c28b34] font-bold transition-all cursor-pointer text-xs sm:text-sm shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <Home className="w-4 h-4" />
                <span>Back to Home Page</span>
              </button>
              <span className="text-xs text-[#FAF8F5]/80 font-medium">Viewing All Sections</span>
            </div>
          </div>
        )}

        {/* 1. HOME VIEW: Hero + Step-by-Step Selection Navigator */}
        {activeTab === 'home' && (
          <div>
            {/* The Authentic Hero Section */}
            <Hero
              onExploreClick={() => handleNavigate('explore-ethiopia-section')}
              onPlanTripClick={() => setIsPlanTripOpen(true)}
              onBookExperienceClick={() => handleNavigate('hindek-kitchen-section')}
              onContactClick={() => handleNavigate('contact-section')}
              onSearchFilter={handleSearchFilter}
            />

            {/* Curated Experience Guide: Explored by Category */}
            <section id="experiences-guide" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Curated Experiences</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E3A2F] mb-4">
                  Explore Bridge Ethiopia
                </h2>
                <p className="text-base text-[#6B6155] leading-relaxed">
                  Select any category below to explore. Each section opens with authentic photography, detailed itineraries, and direct booking options.
                </p>
              </div>

              {/* 8 Clean Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEPS.map((stepItem) => (
                  <div
                    key={stepItem.step}
                    onClick={() => {
                      setActiveTab(stepItem.tabKey);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E8E1D5] hover:border-[#D49A3D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Card Photo */}
                    <div className="relative h-44 w-full overflow-hidden bg-[#E8E1D5]">
                      <img
                        src={stepItem.image}
                        alt={stepItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Category Tag */}
                      <div className="absolute bottom-3 left-3 bg-[#D49A3D] text-[#1E3A2F] px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm">
                        {stepItem.badge}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#1E3A2F] group-hover:text-[#B85C38] transition-colors mb-2 leading-snug">
                          {stepItem.title}
                        </h3>
                        <p className="text-xs text-[#6B6155] line-clamp-3 leading-relaxed mb-4">
                          {stepItem.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs font-bold text-[#1E3A2F] group-hover:text-[#D49A3D] transition-colors">
                        <span>Explore Now</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Option */}
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('all');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F] text-[#1E3A2F] text-sm font-semibold transition-all hover:shadow-md cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#D49A3D]" />
                  <span>Prefer to scroll? View all sections on one page</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* STEP 1: Destinations & Map */}
        {(activeTab === 'destinations' || activeTab === 'map' || activeTab === 'all') && (
          <div>
            <ExploreEthiopiaSection
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onBookExperience={handleBookExperience}
            />
            <EthiopianDestinationsMap
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onBookExperience={handleBookExperience}
            />
          </div>
        )}

        {/* STEP 2: Popular Tours & Expeditions */}
        {(activeTab === 'tours' || activeTab === 'all') && (
          <ToursSection
            onSelectTour={(tour) => setSelectedTour(tour)}
            onBookTour={handleBookExperience}
            onPlanCustomTrip={() => setIsPlanTripOpen(true)}
          />
        )}

        {/* STEP 3: Hindek Kitchen & Food Gallery */}
        {(activeTab === 'hindek-kitchen' || activeTab === 'food-gallery' || activeTab === 'all') && (
          <div>
            <HindekKitchenSection
              onBookClass={handleBookExperience}
              onOpenPlanTrip={() => setIsPlanTripOpen(true)}
            />
            <FoodGallerySection
              onBookFoodTour={handleBookExperience}
            />
          </div>
        )}

        {/* STEP 4: Hindek Grandpa Coffee Experience */}
        {(activeTab === 'coffee-experience' || activeTab === 'coffee-packages' || activeTab === 'all') && (
          <HindekCoffeeSection
            onBookCeremony={handleBookExperience}
          />
        )}

        {/* STEP 5: Ethiopian Festivals & Celebrations */}
        {(activeTab === 'festivals' || activeTab === 'all') && (
          <FestivalsSection
            onPlanTripForFestival={handleBookExperience}
          />
        )}

        {/* STEP 6: Travel Assistance, Community NGO & Accommodations */}
        {(activeTab === 'travel-assistance' || activeTab === 'community-ngo' || activeTab === 'hotels' || activeTab === 'all') && (
          <div>
            <TravelAssistantSection
              onContactSupport={handleBookExperience}
              onOpenCommunityNgo={() => handleNavigate('community-ngo-section')}
            />
            <CommunitySupportSection
              onOpenSupportModal={handleOpenCommunityInquiry}
            />
            <AccommodationsSection
              onInquireStay={handleBookExperience}
            />
          </div>
        )}

        {/* STEP 7: About Hindek, Bridge Ethiopia & Mission */}
        {(activeTab === 'about' || activeTab === 'all') && (
          <AboutSection
            onOpenPlanTrip={() => setIsPlanTripOpen(true)}
            onOpenContact={() => handleNavigate('contact-section')}
          />
        )}

        {/* STEP 8: Traveler Reviews, How to Book & Contact */}
        {(activeTab === 'reviews' || activeTab === 'how-to-book' || activeTab === 'contact' || activeTab === 'all') && (
          <div>
            <ReviewsSection />
            <HowToBookSection
              onPlanTripClick={() => setIsPlanTripOpen(true)}
              onExploreToursClick={() => handleNavigate('tours-section')}
            />
            <ContactSection />
          </div>
        )}

        {/* Bottom step navigation bar when viewing a single step or all sections */}
        {activeTab !== 'home' && (
          <div className="py-8 px-4 bg-white border-t border-[#E8E1D5] text-center">
            <div className="max-w-md mx-auto flex flex-wrap items-center justify-center gap-3">
              {activeTab !== 'all' && currentStepNumber > 1 && (
                <button
                  onClick={() => goToStep(currentStepNumber - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E8E1D5] hover:bg-[#FAF8F5] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#D49A3D]" />
                  <span>Previous</span>
                </button>
              )}

              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A2F] text-white text-sm font-bold hover:bg-[#162B23] transition-all cursor-pointer shadow-md hover:scale-105"
                title="Return to Bridge Ethiopia Home Page"
              >
                <ArrowLeft className="w-4 h-4 text-[#D49A3D]" />
                <Home className="w-4 h-4 text-[#D49A3D]" />
                <span>Back to Home Page</span>
              </button>

              {activeTab !== 'all' && currentStepNumber < 8 && (
                <button
                  onClick={() => goToStep(currentStepNumber + 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D49A3D] text-[#1E3A2F] text-sm font-bold hover:bg-[#c28b34] transition-colors cursor-pointer shadow-sm"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPlanTrip={() => setIsPlanTripOpen(true)}
        onOpenPhotoGuide={() => setIsPhotoGuideOpen(true)}
        onOpenUploadModal={() => openUploadModal()}
      />

      {/* Modals */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookNow={handleBookExperience}
        onPlanTrip={() => setIsPlanTripOpen(true)}
      />

      <TourDetailModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        onBookTour={handleBookExperience}
      />

      <PlanMyTripModal
        isOpen={isPlanTripOpen}
        onClose={() => setIsPlanTripOpen(false)}
      />

      {/* Primary Direct Booking & Event Request Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialService={bookingService}
        initialDestination={bookingDestination}
      />

      {/* Community Support & International NGO / Government Guidance Inquiry Modal */}
      <CommunityInquiryModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        initialTopic={communityTopic}
        initialServiceName={communityServiceName}
      />

      {/* Floating Back to Home Page Button (Visible whenever user is exploring any sub-page or section) */}
      {activeTab !== 'home' && (
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 left-6 z-40 px-4 py-3 bg-[#1E3A2F] hover:bg-[#162B23] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide transition-all transform hover:scale-105 border-2 border-[#D49A3D] cursor-pointer group animate-in fade-in slide-in-from-bottom-2"
          id="floating-back-to-home-btn"
          title="Back to Home Page"
          aria-label="Back to Home Page"
        >
          <ArrowLeft className="w-4 h-4 text-[#D49A3D] group-hover:-translate-x-1 transition-transform" />
          <Home className="w-4 h-4 text-[#D49A3D]" />
          <span>Back to Home Page</span>
        </button>
      )}

      {/* Persistent Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* Photo Uploader Quick Trigger Button (Founder Admin Only) */}
        {isAdminMode && (
          <button
            type="button"
            onClick={() => openUploadModal()}
            className="px-4 py-3 bg-[#1E3A2F] hover:bg-[#152B23] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide transition-all transform hover:scale-105 border border-[#D49A3D]/40 cursor-pointer group animate-in fade-in slide-in-from-bottom-2"
            id="floating-upload-photos-btn"
            title="Upload custom photos for Hindek, places, food, and festivals (Admin Mode)"
          >
            <Camera className="w-4 h-4 text-[#D49A3D] group-hover:rotate-12 transition-transform" />
            <span>Photo Manager (Admin)</span>
          </button>
        )}

        {/* Persistent Floating WhatsApp Quick Access Button */}
        <a
          href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
            'Hello Hindek! I am planning a trip to Ethiopia and would like some advice.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide transition-all transform hover:scale-105"
          id="floating-whatsapp-btn"
          aria-label="Chat with local Ethiopian guide on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">Ask Local Guide</span>
        </a>
      </div>

      {/* Photo Manager Modal */}
      <FounderPhotoUploadModal />

      {/* Photo Upload Guide Modal */}
      <PhotoGuideModal
        isOpen={isPhotoGuideOpen}
        onClose={() => setIsPhotoGuideOpen(false)}
        onOpenUploadModal={() => {
          setIsPhotoGuideOpen(false);
          openUploadModal();
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <FounderPhotoProvider>
          <InquiriesProvider>
            <AppContent />
          </InquiriesProvider>
        </FounderPhotoProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
