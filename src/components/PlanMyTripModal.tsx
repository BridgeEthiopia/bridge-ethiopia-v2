import React, { useState } from 'react';
import { PlanTripRequest } from '../types';
import { 
  X, 
  Send, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Utensils, 
  Compass, 
  Sparkles, 
  ShieldCheck,
  MessageCircle,
  Coins,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Luggage,
  Info
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useInquiries } from '../context/InquiriesContext';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Indicative traveler conversion rates (ETB floating base rate)
const RATES = {
  USD_TO_ETB: 125,
  EUR_TO_ETB: 135,
  GBP_TO_ETB: 160,
};

const COMMON_EXPENSES = [
  { item: 'Grandpa Coffee Ceremony (3 Cups)', etb: '150 - 300 ETB', usd: '$1.20 - $2.40', eur: '€1.10 - €2.20' },
  { item: 'Authentic Injera Feast (Doro Wat / Kitfo)', etb: '450 - 900 ETB', usd: '$3.50 - $7.20', eur: '€3.30 - €6.70' },
  { item: 'Local Museum / Historical Entry', etb: '300 - 800 ETB', usd: '$2.50 - $6.50', eur: '€2.20 - €5.90' },
  { item: 'Full-Day Private City & Kitchen Tour', etb: '6,000 - 10,000 ETB', usd: '$50 - $80', eur: '€45 - €75' },
  { item: '4WD Land Cruiser Day Trip (with Driver)', etb: '18,000 - 25,000 ETB', usd: '$145 - $200', eur: '€135 - €185' },
];

export const PlanMyTripModal: React.FC<PlanTripModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addInquiry } = useInquiries();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<PlanTripRequest>>({
    fullName: '',
    email: '',
    phoneOrWhatsApp: '',
    country: '',
    travelDates: '',
    travelPace: 'Moderate / Balanced',
    numberOfTravelers: 2,
    travelerType: 'Couple',
    budgetLevel: 'Comfortable Mid-Range',
    selectedDestinations: ['Addis Ababa', 'Wenchi Crater Lake', 'Lalibela'],
    interests: ['Cultural Heritage', 'Coffee Ceremonies', 'Traditional Food'],
    foodPreferences: ['Open to All authentic stews', 'Vegetarian (Fasting dishes)'],
    culturalDepth: 'Deep cultural immersion',
    adventureLevel: 'Moderate walking/exploring',
    hotelPreference: 'Eco-Lodges & Nature',
    transportationNeeds: 'Private 4WD Land Cruiser with Driver',
    specialRequests: '',
  });

  if (!isOpen) return null;

  const destinationOptions = [
    'Addis Ababa (Capital & Lucy)',
    'Axum & Ancient Obelisks (Tigray)',
    'Gheralta Mountain Cliff Churches (Tigray)',
    'Lalibela Rock-Hewn Churches',
    'Gondar Imperial Castles',
    'Simien Mountains (Gelada Baboons)',
    'Wenchi Crater Lake (Oromia)',
    'Bale Mountains & Ethiopian Wolves',
    'Sof Omar Caves (Oromia)',
    'Lower Omo Valley Cultures (Southern)',
    'Arba Minch & Lake Chamo (Southern)',
    'Dorze Bamboo Mountain Villages (Southern)',
    'Konso UNESCO Cultural Terraces (Southern)',
    'Harar Jugol Walled City',
    'Danakil Depression & Dallol (Afar)',
    'Kafa Rainforests (Coffee Birthplace)',
    'Bishoftu Crater Lakes'
  ];

  const interestOptions = [
    'Hindek Kitchen Cooking Experience',
    'Hindek Grandpa Coffee Ceremony',
    'NGO / Development Organization Field Support',
    'Educational & School Program Visits',
    'UNESCO Historic Monolithic Churches',
    'Wildlife & Endemic Animal Safaris',
    'Mountain Hiking & Trekking',
    'Ethiopian Cultural & Religious Festivals',
    'Photography & Research Expeditions',
    'Local Handcraft & Weaving Markets',
    'Oromo Living Cultural Heritage'
  ];

  const foodOptions = [
    'All Authentic Ethiopian Foods (Doro Wat, Tibs, Kitfo)',
    'Vegetarian & Vegan Friendly (Beyaynetu / Shiro)',
    'Oromo Specialties (Marqaa, Buna Qalaa, Dhadhaa)',
    'Gluten-Free 100% Teff Injera',
    'Mild Spicing Preference',
    'Spicy Food Lover (Berbere / Mitmita)'
  ];

  const toggleDestination = (dest: string) => {
    const cur = formData.selectedDestinations || [];
    if (cur.includes(dest)) {
      setFormData({ ...formData, selectedDestinations: cur.filter((d) => d !== dest) });
    } else {
      setFormData({ ...formData, selectedDestinations: [...cur, dest] });
    }
  };

  const toggleInterest = (interest: string) => {
    const cur = formData.interests || [];
    if (cur.includes(interest)) {
      setFormData({ ...formData, interests: cur.filter((i) => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...cur, interest] });
    }
  };

  const toggleFood = (food: string) => {
    const cur = formData.foodPreferences || [];
    if (cur.includes(food)) {
      setFormData({ ...formData, foodPreferences: cur.filter((f) => f !== food) });
    } else {
      setFormData({ ...formData, foodPreferences: [...cur, food] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    addInquiry({
      fullName: formData.fullName || 'Traveler',
      email: formData.email || '',
      phone: formData.phoneOrWhatsApp,
      serviceOrEvent: `Custom Trip Plan (${formData.travelPace || 'Tailored'})`,
      destination: (formData.preferredRegions || []).join(', ') || 'Nationwide / Flexible',
      date: formData.travelDates || 'Flexible dates',
      numberOfGuests: Number(formData.numberOfTravelers || 2),
      specialRequests: `Interests: ${(formData.interests || []).join(', ') || 'General'}. Budget: ${formData.budgetTier || 'Standard'}. Notes: ${formData.specialRequirements || 'None'}`,
      type: 'custom-trip',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D5] relative text-[#2E2822]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#1E3A2F] flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close trip planner"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Header */}
            <div className="space-y-2 border-b border-[#E8E1D5] pb-5">
              <span className="px-3 py-1 rounded-full bg-[#B85C38]/10 text-[#B85C38] text-xs font-bold uppercase tracking-wider">
                Tailored Travel Planning
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1E3A2F]">
                Plan My Ethiopian Journey
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6155] leading-relaxed">
                Provide your travel preferences below. Founder <strong>{FOUNDER_INFO.name}</strong> will 
                design a personalized day-by-day itinerary with verified local guides and honest pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* 1. Contact & Personal Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#1E3A2F]" />
                  <span>1. Traveler Contact Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phoneOrWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Country of Origin *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom / USA / Germany"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Travel Dates & Group */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B85C38]" />
                  <span>2. Travel Dates & Group Size</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Target Travel Dates</label>
                    <input
                      type="text"
                      placeholder="e.g. Nov 15 - Nov 28, 2026"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Number of Travelers</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.numberOfTravelers}
                      onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) || 1 })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#423B33] mb-1">Budget Level</label>
                    <select
                      value={formData.budgetLevel}
                      onChange={(e) => setFormData({ ...formData, budgetLevel: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    >
                      <option value="Backpacker / Budget">Backpacker / Budget</option>
                      <option value="Comfortable Mid-Range">Comfortable Mid-Range</option>
                      <option value="Premium / Luxury">Premium / Luxury</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Desired Destinations */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  3. Destinations You Want to Visit (Select All That Apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destinationOptions.map((dest, idx) => {
                    const isSelected = formData.selectedDestinations?.includes(dest);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleDestination(dest)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                            : 'bg-[#FAF8F5] text-[#423B33] border-[#E8E1D5] hover:bg-[#E8E1D5]'
                        }`}
                      >
                        <span>{dest}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#D49A3D]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Experiences & Interests */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  4. Interests & Experiences
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map((interest, idx) => {
                    const isSelected = formData.interests?.includes(interest);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleInterest(interest)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#B85C38] text-white border-[#B85C38]'
                            : 'bg-[#FAF8F5] text-[#423B33] border-[#E8E1D5] hover:bg-[#E8E1D5]'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Food & Dietary Preferences */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  5. Food & Culinary Preferences
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {foodOptions.map((food, idx) => {
                    const isSelected = formData.foodPreferences?.includes(food);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleFood(food)}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#1E3A2F] text-white border-[#1E3A2F]'
                            : 'bg-[#FAF8F5] text-[#423B33] border-[#E8E1D5] hover:bg-[#E8E1D5]'
                        }`}
                      >
                        <span>{food}</span>
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#D49A3D]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Accommodation & Transport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#423B33] mb-1">Lodging & Stay Preference</label>
                  <select
                    value={formData.hotelPreference}
                    onChange={(e) => setFormData({ ...formData, hotelPreference: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  >
                    <option value="Eco-Lodges & Nature">Eco-Lodges & Nature</option>
                    <option value="Boutique & Heritage Guesthouses">Boutique & Heritage Guesthouses</option>
                    <option value="4/5-Star City Stays">4/5-Star City Stays</option>
                    <option value="Local Guesthouses">Local Guesthouses</option>
                    <option value="Mix of styles">Mix of styles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#423B33] mb-1">Transport Needs</label>
                  <select
                    value={formData.transportationNeeds}
                    onChange={(e) => setFormData({ ...formData, transportationNeeds: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  >
                    <option value="Private 4WD Land Cruiser with Driver">Private 4WD Land Cruiser with Driver</option>
                    <option value="Domestic flights + local transfers">Domestic flights + local transfers</option>
                    <option value="Minibus for group">Minibus for group</option>
                    <option value="Airport pickup only">Airport pickup only</option>
                    <option value="Need recommendations">Need recommendations</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1 pt-2">
                <label className="block text-xs font-semibold text-[#423B33]">Special Requests & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about mobility needs, photography interests, special celebrations, or specific local questions..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                />
              </div>

              {/* Trust & Transparency Disclaimer */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DACB] flex items-start gap-2.5 text-xs text-[#5C5247]">
                <ShieldCheck className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#1E3A2F] font-bold">
                      Trust & Transparency:
                    </strong>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-full">
                      Reviewed by Hindek
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#4A4036] leading-relaxed">
                    All inquiries are reviewed privately by Hindek to ensure trust and transparency. We do not charge upfront fees; your personalized quote and itinerary details will be shared directly with you.
                  </p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-[#6B6155] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                  <span>No obligation • 100% personalized by local experts</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D49A3D]" />
                  <span>Submit Trip Request</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center mx-auto border-2 border-[#D49A3D]">
              <CheckCircle className="w-8 h-8 text-[#1E3A2F]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-serif text-[#1E3A2F]">
                Ameseginalehu! Thank You, {formData.fullName}!
              </h3>
              <p className="text-sm text-[#52483E] max-w-md mx-auto leading-relaxed">
                Your travel inquiry has been sent directly to <strong>{FOUNDER_INFO.name}</strong>. 
                We will review your preferences and contact you via WhatsApp and Email within 12 hours with your personalized Ethiopian travel plan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="font-semibold text-[#1E3A2F]">Trip Summary:</div>
              <div>• Travelers: {formData.numberOfTravelers} guest(s) ({formData.travelerType})</div>
              <div>• Destinations: {formData.selectedDestinations?.join(', ')}</div>
              <div>• Budget: {formData.budgetLevel}</div>
              <div>• Phone/WhatsApp: {formData.phoneOrWhatsApp}</div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                  `Hello Hindek! I just submitted a trip request for ${formData.fullName} (${formData.numberOfTravelers} travelers).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Hindek on WhatsApp Now</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-[#1E3A2F] font-bold text-xs"
              >
                Back to Site
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
