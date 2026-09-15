import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle, 
  Heart, 
  School, 
  HeartPulse, 
  Baby, 
  Building2, 
  Landmark, 
  FileText, 
  MessageCircle, 
  ShieldCheck, 
  HandHeart,
  Globe,
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useInquiries } from '../context/InquiriesContext';

export interface CommunityInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: 'schools' | 'health' | 'orphanage' | 'government' | 'ngo' | 'general';
  initialServiceName?: string;
}

export const CommunityInquiryModal: React.FC<CommunityInquiryModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'general',
  initialServiceName = '',
}) => {
  const { addInquiry, adminWhatsapp, adminEmail } = useInquiries();
  const [submitted, setSubmitted] = useState(false);

  const [category, setCategory] = useState<string>(() => {
    switch (initialTopic) {
      case 'schools': return 'School & Education Support';
      case 'health': return 'Health Center & Rural Clinic Support';
      case 'orphanage': return 'Orphanage & Vulnerable Children Care';
      case 'government': return 'Government Offices & Permit Guidance';
      case 'ngo': return 'International NGO Field Logistics & Liaison';
      default: return initialServiceName || 'Community Support (Schools, Health, Orphanages)';
    }
  });

  const [supportType, setSupportType] = useState<string>('In-Kind Donation / Supplies');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState('');
  const [organization, setOrganization] = useState('');
  const [preferredDates, setPreferredDates] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (initialServiceName) {
        setCategory(initialServiceName);
      } else if (initialTopic === 'schools') {
        setCategory('School & Education Support');
        setSupportType('In-Kind Donation / Supplies');
      } else if (initialTopic === 'health') {
        setCategory('Health Center & Rural Clinic Support');
        setSupportType('In-Kind Donation / Supplies');
      } else if (initialTopic === 'orphanage') {
        setCategory('Orphanage & Vulnerable Children Care');
        setSupportType('Direct Sponsorship / Provisions');
      } else if (initialTopic === 'government') {
        setCategory('Government Offices & Permit Guidance');
        setSupportType('Official Liaison & Office Navigation');
      } else if (initialTopic === 'ngo') {
        setCategory('International NGO Field Logistics & Liaison');
        setSupportType('NGO Mission Logistics & Translation');
      }
    }
  }, [isOpen, initialTopic, initialServiceName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isNgoOrGov = category.includes('Government') || category.includes('NGO') || category.includes('Permit');

    addInquiry({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phoneOrWhatsApp.trim(),
      serviceOrEvent: `${category} [${supportType}]`,
      destination: organization ? `Org: ${organization}` : 'Bridge Ethiopia Community / Liaison',
      date: preferredDates || new Date().toISOString().split('T')[0],
      numberOfGuests: 1,
      specialRequests: `Organization: ${organization || 'Individual / Traveler'}\nAssistance Type: ${supportType}\nDetails: ${message}`,
      type: isNgoOrGov ? 'ngo-guidance' : 'community-support'
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hindek! I am reaching out regarding Bridge Ethiopia's Community Support & NGO / Government Guidance.\n\n` +
    `• Name: ${fullName || 'Interested Traveler/Partner'}\n` +
    `• Focus Area: ${category}\n` +
    `• Support/Service Type: ${supportType}\n` +
    (organization ? `• Organization: ${organization}\n` : '') +
    (preferredDates ? `• Timeline/Dates: ${preferredDates}\n` : '') +
    (message ? `• Note: ${message}\n` : '') +
    `I would love to receive guidance and discuss next steps.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-6 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#1E3A2F] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#D49A3D] text-xs font-bold uppercase tracking-wider mb-2">
            <HandHeart className="w-4 h-4" />
            <span>Bridge Ethiopia Community & Institutional Liaison</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Support Local Communities or Request NGO / Government Guidance
          </h3>

          <p className="text-xs sm:text-sm text-[#D9D0C1] mt-2 leading-relaxed">
            Give back directly to schools, health centers, or orphanages, or connect with Hindek for professional guidance with Ethiopian government offices and NGO missions.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#1E3A2F]/10 border-2 border-[#1E3A2F] text-[#1E3A2F] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-[#34A853]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-2xl font-bold font-serif text-[#1E3A2F]">
                  Request Received with Gratitude!
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Hindek has been notified immediately. We are honored to coordinate transparent community support or guide your institutional requirements.
                </p>
              </div>

              {/* Instant WhatsApp Quick Link */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] max-w-md mx-auto space-y-3">
                <p className="text-xs text-[#6B6155]">
                  Need faster coordination or arriving in Ethiopia soon? Message Hindek directly:
                </p>
                <a
                  href={`https://wa.me/${adminWhatsapp || FOUNDER_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open in WhatsApp ({FOUNDER_INFO.whatsappDisplay})</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#1E3A2F] text-white text-xs font-bold hover:bg-[#152B23] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Fast Category Selector Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5247]">
                  What area do you want to support or need guidance with? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'School & Education Support', label: 'Local Schools & Education', icon: School, sub: 'Books, stationery, desks, solar lamps' },
                    { id: 'Health Center & Rural Clinic Support', label: 'Health Centers & Clinics', icon: HeartPulse, sub: 'First-aid, maternal kits, water filters' },
                    { id: 'Orphanage & Vulnerable Children Care', label: 'Orphanages & Children Care', icon: Baby, sub: 'Food staples, clothes, blankets, care' },
                    { id: 'Government Offices & Permit Guidance', label: 'Government Offices & Permits', icon: Landmark, sub: 'Immigration, ministries, customs, bureaus' },
                    { id: 'International NGO Field Logistics & Liaison', label: 'International NGO Missions', icon: Building2, sub: 'Field logistics, 4WD fleet, translation' },
                    { id: 'In-Person Community Visit / Volunteering', label: 'Community Visit During Tour', icon: Users, sub: 'Meet elders, visit school during journey' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = category === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setCategory(item.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-[#1E3A2F]/10 border-[#1E3A2F] text-[#1E3A2F] ring-1 ring-[#1E3A2F]'
                            : 'bg-[#FAF8F5] border-[#E8E1D5] text-[#5C5247] hover:border-[#1E3A2F]/40'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${isSelected ? 'bg-[#1E3A2F] text-[#D49A3D]' : 'bg-white text-[#B85C38]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[11px] text-[#7A7063] leading-tight">{item.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support / Service Form */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5247]">
                  How would you like to assist or what support do you require? *
                </label>
                <select
                  value={supportType}
                  onChange={(e) => setSupportType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs font-medium text-[#2E2822] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
                >
                  <option value="In-Kind Donation / Supplies">In-Kind Donation (bringing books, medical supplies, clothes)</option>
                  <option value="Financial Contribution / Direct Sponsorship">Financial Sponsorship (classrooms, desks, clinic kits, nutrition)</option>
                  <option value="In-Person Visit & Handover During Tour">In-Person Handover (visit school/orphanage with Hindek on tour)</option>
                  <option value="Official Liaison & Office Navigation">Government Office Navigation (Immigration, Ministries, Customs clearance)</option>
                  <option value="NGO Mission Logistics & Translation">NGO Logistics (4WD vehicles, licensed drivers, field fixer, translation)</option>
                  <option value="Volunteer / Medical / Educational Skills">Volunteering / Knowledge Exchange</option>
                  <option value="Custom Project Consultation">Custom Community Project Consultation</option>
                </select>
              </div>

              {/* Personal & Organization Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C5247] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins or Dr. Ahmed"
                    className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C5247] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C5247] mb-1">
                    Phone or WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneOrWhatsApp}
                    onChange={(e) => setPhoneOrWhatsApp(e.target.value)}
                    placeholder="e.g. +1 555 123 4567 or +251 ..."
                    className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C5247] mb-1">
                    Organization / NGO / Institution (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. UNICEF, Red Cross, University, or Individual"
                    className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C5247] mb-1">
                  Expected Dates or Travel Timeline (Optional)
                </label>
                <input
                  type="text"
                  value={preferredDates}
                  onChange={(e) => setPreferredDates(e.target.value)}
                  placeholder="e.g. October 2026, or 'Planning for next month'"
                  className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C5247] mb-1">
                  Tell Hindek about your intentions or specific needs
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. We have two suitcases of children's books and pencils we want to give to a village school during our Oromia tour, OR we need assistance obtaining a filming permit from the Ministry of Tourism..."
                  className="w-full p-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                />
              </div>

              {/* Ethics & Transparency Badge */}
              <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] text-[11px] text-[#52483E] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E3A2F] block">Ethical Giving & Direct Accountability Guarantee:</strong>
                  100% of your contributions go directly to the designated school, clinic, or orphanage. Bridge Ethiopia provides full photo confirmation and receipts. For NGO & government support, Hindek provides professional, independent coordination.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href={`https://wa.me/${adminWhatsapp || FOUNDER_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-[#E8E1D5] text-xs font-semibold text-[#5C5247] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Request'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
