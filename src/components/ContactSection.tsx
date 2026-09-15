import React, { useState } from 'react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { useInquiries } from '../context/InquiriesContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  Globe, 
  Clock, 
  Sparkles,
  ShieldCheck,
  Camera
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [sent, setSent] = useState(false);
  const { photos, openUploadModal, isAdminMode } = useFounderPhoto();
  const { addInquiry } = useInquiries();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneOrWhatsApp: '',
    subject: 'General Inquiry / Trip Advice',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    addInquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phoneOrWhatsApp,
      serviceOrEvent: `Contact Message: ${formData.subject}`,
      specialRequests: formData.message,
      type: 'inquiry',
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-white" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>We Are Here For You</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Contact <span className="text-[#B85C38] font-serif italic">Bridge Ethiopia</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Have questions about visiting Ethiopia, road conditions, dietary needs, or festival dates? 
            Connect directly with founder Hindek and our trusted local team.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-6">
              
              {/* Founder Mini Card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs group relative">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D49A3D] shadow-xs flex-shrink-0">
                  <img
                    src={photos.contactAvatar}
                    alt={FOUNDER_INFO.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {isAdminMode && (
                    <button
                      type="button"
                      onClick={() => openUploadModal('contactAvatar')}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                      title="Update Photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5">
                      <span>{FOUNDER_INFO.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                    </div>
                    {isAdminMode && (
                      <button
                        type="button"
                        onClick={() => openUploadModal('contactAvatar')}
                        className="text-[10px] text-[#B85C38] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                      >
                        <Camera className="w-2.5 h-2.5" />
                        <span>Change Photo</span>
                      </button>
                    )}
                  </div>
                  <div className="text-[11px] text-[#B85C38] font-semibold">Founder, Bridge Ethiopia</div>
                  <div className="text-[11px] text-[#8C7E6D]">Ready to help plan your visit to Ethiopia</div>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#8C7E6D]">Bridge Ethiopia Office</span>
                <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">Direct Communication Channels</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#423B33]">
                {/* Phone */}
                <a
                  href={`tel:${FOUNDER_INFO.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B85C38] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7E6D] block">Call Us Directly</span>
                    <span className="font-bold text-[#1E3A2F]">{FOUNDER_INFO.phone}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                    'Hello Hindek! I am reaching out from the Bridge Ethiopia website.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#25D366] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center text-[#25D366] flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7E6D] block">WhatsApp Message (Fastest Response)</span>
                    <span className="font-bold text-[#1E3A2F]">{FOUNDER_INFO.whatsapp}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${FOUNDER_INFO.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#D49A3D] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7E6D] block">Official Email</span>
                    <span className="font-bold text-[#1E3A2F]">{FOUNDER_INFO.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E1D5]">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#1E3A2F] flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#8C7E6D] block">Headquarters & Reception</span>
                    <span className="font-bold text-[#1E3A2F]">{FOUNDER_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] text-xs text-[#6B6155] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3A2F]">
                  <Clock className="w-4 h-4 text-[#D49A3D]" />
                  <span>Local Response Hours</span>
                </div>
                <p>Monday – Sunday: 8:00 AM – 8:00 PM East Africa Time (EAT)</p>
                <p className="text-[11px] text-[#8C7E6D]">24/7 on-ground emergency assistance for active in-country travelers.</p>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] text-left">
              
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">Send a Direct Message</h3>
                    <p className="text-xs text-[#6B6155]">
                      Fill out this quick note and Hindek will reply promptly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#423B33] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#423B33] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#423B33] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phoneOrWhatsApp}
                        onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#423B33] mb-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                      >
                        <option value="General Inquiry">General Travel Question</option>
                        <option value="Hindek Kitchen Class">Hindek Kitchen Cooking Class</option>
                        <option value="Hindek Coffee Experience">Hindek Grandpa Coffee Ceremony</option>
                        <option value="Custom Tour Request">Custom Tour / Itinerary</option>
                        <option value="Airport Transfer & SIM">Airport Transfer & Local SIM</option>
                        <option value="Business / NGO Travel">Business / NGO Travel Assistance</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#423B33]">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you would like to know or experience..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs sm:text-sm focus:ring-2 focus:ring-[#1E3A2F] focus:outline-none"
                    />
                  </div>

                  {/* Trust & Transparency Note */}
                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center gap-2.5 text-xs text-[#5C5247]">
                    <ShieldCheck className="w-4 h-4 text-[#34A853] flex-shrink-0" />
                    <p className="text-[11px] sm:text-xs text-[#4A4036]">
                      <strong className="text-[#1E3A2F]">Trust & Transparency:</strong> All inquiries are reviewed privately by Hindek to ensure personalized guidance and secure communication.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-[11px] text-[#8C7E6D] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                      <span>Direct review • No spam</span>
                    </div>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4 text-[#D49A3D]" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center mx-auto border-2 border-[#D49A3D]">
                    <CheckCircle className="w-7 h-7 text-[#1E3A2F]" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#52483E] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. Hindek will respond to your email ({formData.email}) shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFormData({ name: '', email: '', phoneOrWhatsApp: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs font-bold text-[#1E3A2F]"
                  >
                    Send Another Note
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
