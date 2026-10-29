import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Utensils, 
  Compass, 
  Sparkles, 
  ShieldCheck,
  MessageCircle,
  Clock,
  HelpCircle,
  Coins,
  CheckCircle2
} from 'lucide-react';
import { FOUNDER_INFO, TOURS_DATA } from '../data/ethiopiaData';
import { useInquiries } from '../context/InquiriesContext';
import { useCurrency } from '../context/CurrencyContext';
import { sendAdminEmailNotification, PRIMARY_ADMIN_EMAIL, SECONDARY_ADMIN_EMAIL } from '../utils/adminEmailNotifier';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDestination?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialDestination = '',
}) => {
  const { addInquiry, adminEmail, adminWhatsapp, adminPhone } = useInquiries();
  const { formatPrice, currency } = useCurrency();
  const [submitted, setSubmitted] = useState(false);
  const [packageTier, setPackageTier] = useState<'standard' | 'heritage' | 'luxury'>('standard');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneOrWhatsApp: '',
    date: '',
    numberOfGuests: 2,
    serviceOrEvent: initialService || 'Custom Ethiopian Journey & Tour',
    destination: initialDestination || 'Addis Ababa & Oromia',
    specialRequests: '',
  });

  // Calculate live estimate based on selected experience, guests, and tier
  const getBasePriceUSD = (serviceName: string): number => {
    const match = TOURS_DATA.find((t) =>
      t.title.toLowerCase().includes(serviceName.toLowerCase()) ||
      serviceName.toLowerCase().includes(t.title.toLowerCase())
    );
    if (match && match.priceFromUSD > 0) return match.priceFromUSD;
    if (serviceName.includes('Coffee')) return 35;
    if (serviceName.includes('Cooking') || serviceName.includes('Kitchen')) return 35;
    if (serviceName.includes('Capital') || serviceName.includes('Addis')) return 85;
    if (serviceName.includes('Wenchi')) return 130;
    if (serviceName.includes('Lalibela')) return 620;
    if (serviceName.includes('Harar')) return 420;
    if (serviceName.includes('Bale')) return 540;
    if (serviceName.includes('Danakil')) return 590;
    if (serviceName.includes('Omo')) return 890;
    return 110;
  };

  const tierMultiplier = packageTier === 'luxury' ? 1.75 : packageTier === 'heritage' ? 1.35 : 1.0;
  const perPersonUSD = Math.round(getBasePriceUSD(formData.serviceOrEvent) * tierMultiplier);
  const totalUSD = perPersonUSD * Math.max(1, Number(formData.numberOfGuests || 1));

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData(prev => ({
        ...prev,
        serviceOrEvent: initialService || prev.serviceOrEvent || 'Custom Ethiopian Journey & Tour',
        destination: initialDestination || prev.destination || 'Addis Ababa & Oromia',
      }));
    }
  }, [isOpen, initialService, initialDestination]);

  if (!isOpen) return null;

  const serviceOptions = [
    'Addis Ababa Capital & Lucy Heritage Tour',
    'Hindek Kitchen Authentic Cooking Class & Mesob Feast',
    'Milko Coffee 3-Stage Ceremony & Tasting',
    'Wenchi Crater Lake & Oromia Highland Day Trip',
    'Bale Mountains Wildlife & Ethiopian Wolf Safari',
    'Lalibela Rock-Hewn Churches Pilgrimage',
    'Harar Jugol Walled City & Hyena Feeding Night Ritual',
    'Lower Omo Valley Living Cultural Immersion',
    'Danakil Depression & Erta Ale Lava Lake Expedition',
    'Ethiopian Cultural Festivals Experience',
    'Airport Meet & Greet + Private 4WD Land Cruiser Transport',
    'NGO / Delegation / Field Research Support Logistics',
    'Curated Lodge & Accommodation Reservation Assistance',
    'Fully Tailored Private Journey'
  ];

  const destinationOptions = [
    'Addis Ababa (Capital & National Museum)',
    'Wenchi Crater Lake (Oromia)',
    'Bale Mountains National Park & Harenna Forest',
    'Lalibela (UNESCO Rock-Hewn Monolithic Churches)',
    'Harar Jugol Walled City (Eastern Ethiopia)',
    'Gondar Imperial Castles & Fasil Ghebbi',
    'Simien Mountains National Park',
    'Lower Omo Valley (Southern Ethiopia)',
    'Danakil Depression & Dallol (Afar)',
    'Sof Omar Caves (Bale, Oromia)',
    'Bishoftu Crater Lakes Resort Area',
    'Kafa Biosphere Rainforests (Coffee Origin)',
    'Multiple Destinations / Nationwide Route'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save inquiry to admin inbox store with real-time audio toast trigger
    addInquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phoneOrWhatsApp,
      serviceOrEvent: formData.serviceOrEvent,
      destination: formData.destination,
      date: formData.date,
      numberOfGuests: Number(formData.numberOfGuests),
      specialRequests: formData.specialRequests,
      type: 'booking',
    });

    // Send admin notification via email dispatch
    sendAdminEmailNotification({
      type: 'booking',
      title: `Booking: ${formData.serviceOrEvent}`,
      senderName: formData.name,
      senderEmail: formData.email,
      senderPhone: formData.phoneOrWhatsApp,
      details: {
        'Service/Tour': formData.serviceOrEvent,
        'Destination': formData.destination,
        'Experience Tier': packageTier.toUpperCase(),
        'Target Date': formData.date,
        'Guests': formData.numberOfGuests,
        'Estimated Fare': `${formatPrice(totalUSD)} (${formatPrice(perPersonUSD)}/guest in ${currency})`,
      },
      notes: formData.specialRequests
    });
  };

  const tierLabel = packageTier === 'luxury' ? 'Luxury Eco-Lodge & Private 4WD' : packageTier === 'heritage' ? 'Boutique Heritage Lodge' : 'Standard Cultural Experience';

  const whatsappMessage = encodeURIComponent(
    `Hello Hindek! I would like to request a booking with Bridge Ethiopia:\n\n` +
    `• Name: ${formData.name || 'Traveler'}\n` +
    `• Experience: ${formData.serviceOrEvent}\n` +
    `• Tier: ${tierLabel}\n` +
    `• Destination: ${formData.destination}\n` +
    `• Date: ${formData.date || 'Flexible'}\n` +
    `• Guests: ${formData.numberOfGuests}\n` +
    `• Estimated Fare: ${formatPrice(totalUSD)} (${formatPrice(perPersonUSD)}/person)\n` +
    `• Phone/WhatsApp: ${formData.phoneOrWhatsApp || 'Via WhatsApp'}\n` +
    `• Special Requests: ${formData.specialRequests || 'None'}\n\n` +
    `Looking forward to confirming availability and itinerary with you!`
  );

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      id="booking-modal-overlay"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E1D5] relative text-[#2E2822]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#1E3A2F] flex items-center justify-center transition-colors focus:outline-none shadow-xs"
          aria-label="Close booking form"
          id="close-booking-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-9 space-y-6">
            
            {/* Header */}
            <div className="space-y-3 border-b border-[#E8E1D5] pb-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3D]/15 text-[#B85C38] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bridge Ethiopia Request Form</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1E3A2F]">
                Book Your Experience
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
                Connect directly with founder <strong>{FOUNDER_INFO.name}</strong>. Choose your preferred way to book or inquire:
              </p>

              {/* Highlight Direct Phone & WhatsApp Booking Card with Owner's Phone Number */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF6EE] to-[#F3ECE0] border-2 border-[#D49A3D]/40 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                    <span className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                      Direct Booking & Immediate Confirmation
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C7E6D]">
                    Available 7 Days a Week
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${FOUNDER_INFO.phone}`}
                    id="modal-quick-phone-btn"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs sm:text-sm font-bold transition-all shadow-xs group"
                  >
                    <Phone className="w-4 h-4 text-[#D49A3D] group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>Call: <strong className="text-[#D49A3D] tracking-wide">{FOUNDER_INFO.phone}</strong></span>
                  </a>

                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      `Hello Hindek! I want to book: ${formData.serviceOrEvent || 'a tour with Bridge Ethiopia'}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    id="modal-quick-whatsapp-btn"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold transition-all shadow-xs group"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span>WhatsApp: <strong className="tracking-wide">{FOUNDER_INFO.phone}</strong></span>
                  </a>
                </div>

                <p className="text-[11px] text-[#5C5247] leading-relaxed">
                  Call or WhatsApp Founder <strong>{FOUNDER_INFO.name}</strong> at <strong>{FOUNDER_INFO.phone}</strong> for instant reservation &amp; personalized advice, or submit the form below.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#8C7E6D]">
                <div className="h-px bg-[#E8E1D5] flex-1" />
                <span>or submit your request details online</span>
                <div className="h-px bg-[#E8E1D5] flex-1" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* 1. Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Sarah Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-input-name"
                    />
                    <User className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-input-email"
                    />
                    <Mail className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* 2. Phone / WhatsApp & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 555 123 4567 or +251..."
                      value={formData.phoneOrWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-input-phone"
                    />
                    <Phone className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Preferred Date / Timeframe *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oct 12, 2026 or Flexible"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-input-date"
                    />
                    <Calendar className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* 3. Number of Guests & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={formData.numberOfGuests}
                      onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-input-guests"
                    />
                    <Users className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Destination *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                      id="booking-select-destination"
                    >
                      {destinationOptions.map((dest, idx) => (
                        <option key={idx} value={dest}>{dest}</option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* 4. Service or Event Requested */}
              <div>
                <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                  Service or Event Requested *
                </label>
                <div className="relative">
                  <select
                    value={formData.serviceOrEvent}
                    onChange={(e) => setFormData({ ...formData, serviceOrEvent: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                    id="booking-select-service"
                  >
                    {serviceOptions.map((svc, idx) => (
                      <option key={idx} value={svc}>{svc}</option>
                    ))}
                  </select>
                  <Compass className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-3" />
                </div>
              </div>

              {/* Experience Tier & Live Fare Estimator */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#FAF0E6] border border-[#E8DACB] space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F]">
                    <Coins className="w-4 h-4 text-[#D49A3D]" />
                    <span>Experience Tier & Live Fare Estimate</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C7E6D]">
                    Currency: <strong className="text-[#1E3A2F]">{currency}</strong>
                  </span>
                </div>

                {/* Tier Selection */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackageTier('standard')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      packageTier === 'standard'
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-xs'
                        : 'bg-white text-[#52483E] border-[#E8E1D5] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Standard</div>
                    <div className={`text-[10px] ${packageTier === 'standard' ? 'text-white/80' : 'text-[#8C7E6D]'}`}>
                      Local Stays
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageTier('heritage')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      packageTier === 'heritage'
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-xs'
                        : 'bg-white text-[#52483E] border-[#E8E1D5] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="text-[11px] font-bold flex items-center justify-between">
                      <span>Boutique</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-[#D49A3D] text-[#1E3A2F] font-extrabold">Popular</span>
                    </div>
                    <div className={`text-[10px] ${packageTier === 'heritage' ? 'text-white/80' : 'text-[#8C7E6D]'}`}>
                      Heritage Lodges
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPackageTier('luxury')}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      packageTier === 'luxury'
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-xs'
                        : 'bg-white text-[#52483E] border-[#E8E1D5] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    <div className="text-[11px] font-bold">Luxury Eco</div>
                    <div className={`text-[10px] ${packageTier === 'luxury' ? 'text-white/80' : 'text-[#8C7E6D]'}`}>
                      Resort & 4WD
                    </div>
                  </button>
                </div>

                {/* Estimate Summary Pill */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E8DACB]/60 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C7E6D] block">
                      Estimated Total ({formData.numberOfGuests} {Number(formData.numberOfGuests) === 1 ? 'Guest' : 'Guests'})
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-[#1E3A2F]">
                      {formatPrice(totalUSD)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8C7E6D] block">Rate Per Guest</span>
                    <span className="text-xs font-bold text-[#B85C38]">
                      {formatPrice(perPersonUSD, { perPerson: true })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Special Requests */}
              <div>
                <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                  Special Requests / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Dietary preferences (vegan/gluten-free), lodging preferences, pickup location, mobility assistance, or any specific local activities..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none text-[#2E2822]"
                  id="booking-textarea-special"
                />
              </div>

              {/* Explicit Pricing & Privacy Policy Note */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DACB] flex items-start gap-2.5 text-xs text-[#5C5247]">
                <ShieldCheck className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-[#1E3A2F] font-bold">
                      Trust & Transparency:
                    </strong>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#34A853] bg-[#34A853]/10 px-2 py-0.5 rounded-full">
                      Direct Local Review
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#4A4036] leading-relaxed">
                    All inquiries are reviewed privately by Hindek to ensure trust, transparency, and tailored local guidance. Prices and payment details are never charged upfront and are arranged directly with you via WhatsApp or Email.
                  </p>
                </div>
              </div>

              {/* Submit CTA (WhatsApp Direct or Email Dispatch) */}
              <div className="pt-3 border-t border-[#E8E1D5] space-y-3">
                <div className="text-xs text-[#8C7E6D] flex items-center justify-between">
                  <span>Direct contact: <strong className="text-[#1E3A2F]">{FOUNDER_INFO.phone}</strong></span>
                  <span className="text-[#1E3A2F] font-mono text-[11px]">{FOUNDER_INFO.email}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                    id="booking-whatsapp-direct-btn"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant Reserve via WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="booking-submit-btn"
                  >
                    <Send className="w-4 h-4 text-[#D49A3D]" />
                    <span>Submit Online Form</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center mx-auto border-2 border-[#D49A3D]">
              <CheckCircle className="w-8 h-8 text-[#1E3A2F]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-serif text-[#1E3A2F]">
                Request Received! Ameseginalehu, {formData.name}!
              </h3>
              <p className="text-sm text-[#52483E] max-w-lg mx-auto leading-relaxed">
                Your booking request for <strong>{formData.serviceOrEvent}</strong> has been sent directly to 
                Founder Hindek via email (<strong>{PRIMARY_ADMIN_EMAIL}</strong>).
              </p>
              <p className="text-xs text-[#6B6155] max-w-md mx-auto">
                Founder <strong>{FOUNDER_INFO.name}</strong> will review your request directly in her email and contact you by email or WhatsApp to discuss availability, customized schedule, and pricing.
              </p>
            </div>

            {/* Request Summary Box */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] max-w-md mx-auto text-left text-xs space-y-2 text-[#423B33]">
              <div className="font-bold text-[#1E3A2F] border-b border-[#E8E1D5] pb-1.5 flex items-center justify-between">
                <span>Summary of Your Request</span>
                <span className="text-[#34A853] font-semibold">✓ Dispatched to Admin Email</span>
              </div>
              <div>• <strong>Service/Event:</strong> {formData.serviceOrEvent}</div>
              <div>• <strong>Destination:</strong> {formData.destination}</div>
              <div>• <strong>Target Date:</strong> {formData.date}</div>
              <div>• <strong>Guests:</strong> {formData.numberOfGuests}</div>
              <div>• <strong>Contact:</strong> {formData.phoneOrWhatsApp} ({formData.email})</div>
              {formData.specialRequests && (
                <div>• <strong>Notes:</strong> {formData.specialRequests}</div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors"
                id="booking-whatsapp-confirm-btn"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Hindek on WhatsApp Now</span>
              </a>

              <a
                href={`mailto:${PRIMARY_ADMIN_EMAIL}?cc=${encodeURIComponent(SECONDARY_ADMIN_EMAIL)}&subject=${encodeURIComponent(`Booking Request: ${formData.serviceOrEvent} - ${formData.name}`)}&body=${encodeURIComponent(`Hello Hindek,\n\nI have submitted a booking inquiry on Bridge Ethiopia:\n\n• Name: ${formData.name}\n• Service: ${formData.serviceOrEvent}\n• Date: ${formData.date}\n• Guests: ${formData.numberOfGuests}\n• Phone: ${formData.phoneOrWhatsApp}\n• Email: ${formData.email}\n\nNotes: ${formData.specialRequests || 'None'}\n\nLooking forward to your reply!`)}`}
                className="px-5 py-3.5 rounded-xl bg-white border border-[#1E3A2F]/30 text-[#1E3A2F] hover:bg-[#FAF8F5] font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#B85C38]" />
                <span>Email Hindek Directly</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E1D5] text-[#5C5247] hover:text-[#1E3A2F] font-bold text-xs"
              >
                Close & Return
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
