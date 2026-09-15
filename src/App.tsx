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
import { FounderPinModal } from './components/FounderPinModal';
import { PhotoGuideModal } from './components/PhotoGuideModal';
import { AdminInboxModal } from './components/AdminInboxModal';
import { RealtimeNotificationToast } from './components/RealtimeNotificationToast';
import { FounderPhotoProvider, useFounderPhoto } from './context/FounderPhotoContext';
import { LanguageProvider } from './context/LanguageContext';
import { InquiriesProvider, useInquiries } from './context/InquiriesContext';
import { Destination, Tour } from './types';
import { MessageCircle, Camera, Sparkles, Inbox } from 'lucide-react';
import { FOUNDER_INFO } from './data/ethiopiaData';

function AppContent() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPhotoGuideOpen, setIsPhotoGuideOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string>('Custom Ethiopian Journey & Tour');
  const [bookingDestination, setBookingDestination] = useState<string>('Addis Ababa & Oromia');
  
  // Community Giving & NGO / Government Guidance Modal State
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [communityTopic, setCommunityTopic] = useState<'community-support' | 'ngo-guidance'>('community-support');
  const [communityServiceName, setCommunityServiceName] = useState('');

  const handleOpenCommunityInquiry = (topic: 'community-support' | 'ngo-guidance', serviceName: string) => {
    setCommunityTopic(topic);
    setCommunityServiceName(serviceName);
    setIsCommunityModalOpen(true);
  };
  
  const { openUploadModal, isAdminMode } = useFounderPhoto();
  const { openInbox, unreadCount } = useInquiries();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2E2822] font-sans antialiased selection:bg-[#D49A3D]/30 selection:text-[#1E3A2F]">
      
      {/* Real-time Notification Banner / Audio Chime Toast */}
      <RealtimeNotificationToast />

      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenBooking={handleBookExperience}
        onOpenPlanTrip={() => setIsPlanTripOpen(true)}
        onOpenAiAssistant={() => handleNavigate('travel-assistance-section')}
        onOpenAdmin={() => openUploadModal()}
        onOpenInbox={() => openInbox()}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('explore-ethiopia-section')}
          onPlanTripClick={() => setIsPlanTripOpen(true)}
          onBookExperienceClick={() => handleNavigate('hindek-kitchen-section')}
          onContactClick={() => handleNavigate('contact-section')}
          onSearchFilter={handleSearchFilter}
        />

        {/* 2. Explore Ethiopia & Destinations by Region */}
        <ExploreEthiopiaSection
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onBookExperience={handleBookExperience}
        />

        {/* 2b. Interactive Google Maps Platform Explorer */}
        <EthiopianDestinationsMap
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onBookExperience={handleBookExperience}
        />

        {/* 3. Popular Tours & Expeditions */}
        <ToursSection
          onSelectTour={(tour) => setSelectedTour(tour)}
          onBookTour={handleBookExperience}
          onPlanCustomTrip={() => setIsPlanTripOpen(true)}
        />

        {/* 4. Hindek Kitchen (Signature Culinary & Cultural Experience) */}
        <HindekKitchenSection
          onBookClass={handleBookExperience}
          onOpenPlanTrip={() => setIsPlanTripOpen(true)}
        />

        {/* 5. Hindek Grandpa Coffee Experience */}
        <HindekCoffeeSection
          onBookCeremony={handleBookExperience}
        />

        {/* 6. Ethiopian & Oromo Food Gallery */}
        <FoodGallerySection
          onBookFoodTour={handleBookExperience}
        />

        {/* 7. Ethiopian Festivals & Celebrations */}
        <FestivalsSection
          onPlanTripForFestival={handleBookExperience}
        />

        {/* 8. Local Travel Assistance (Airport, SIM, Transport, Translators, Govt Liaison) */}
        <TravelAssistantSection
          onContactSupport={handleBookExperience}
          onOpenCommunityNgo={() => handleNavigate('community-ngo-section')}
        />

        {/* 9. Community Giving & International NGO / Government Guidance */}
        <CommunitySupportSection
          onOpenInquiry={handleOpenCommunityInquiry}
        />

        {/* 10. Curated Hotels & Lodges */}
        <AccommodationsSection
          onInquireStay={handleBookExperience}
        />

        {/* 10. About Hindek, Bridge Ethiopia & Community/NGO Support */}
        <AboutSection
          onOpenPlanTrip={() => setIsPlanTripOpen(true)}
          onOpenContact={() => handleNavigate('contact-section')}
        />

        {/* 11. Traveler Reviews */}
        <ReviewsSection />

        {/* 12. How to Book */}
        <HowToBookSection
          onPlanTripClick={() => setIsPlanTripOpen(true)}
          onExploreToursClick={() => handleNavigate('tours-section')}
        />

        {/* 13. Contact Us */}
        <ContactSection />
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

      {/* Persistent Floating Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-3">
        {/* Real Photo Uploader Quick Trigger Button (Founder Admin Only) */}
        {isAdminMode && (
          <button
            type="button"
            onClick={() => openUploadModal()}
            className="px-4 py-3 bg-[#1E3A2F] hover:bg-[#152B23] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide transition-all transform hover:scale-105 border border-[#D49A3D]/40 cursor-pointer group animate-in fade-in slide-in-from-bottom-2"
            id="floating-upload-photos-btn"
            title="Upload your own real photos for Hindek, places, food, and festivals (Admin Mode)"
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

      {/* Real Photo Manager Modal */}
      <FounderPhotoUploadModal />

      {/* Founder PIN Security Authentication Modal */}
      <FounderPinModal />

      {/* Real Photo Authenticity & Upload Guide Modal */}
      <PhotoGuideModal
        isOpen={isPhotoGuideOpen}
        onClose={() => setIsPhotoGuideOpen(false)}
        onOpenUploadModal={() => {
          setIsPhotoGuideOpen(false);
          openUploadModal();
        }}
      />

      {/* Admin Booking Inquiries & Messages Modal */}
      <AdminInboxModal />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <FounderPhotoProvider>
        <InquiriesProvider>
          <AppContent />
        </InquiriesProvider>
      </FounderPhotoProvider>
    </LanguageProvider>
  );
}
