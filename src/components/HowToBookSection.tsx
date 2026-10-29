import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  PlaneTakeoff,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface HowToBookProps {
  onPlanTripClick: () => void;
  onExploreToursClick: () => void;
}

export const HowToBookSection: React.FC<HowToBookProps> = ({
  onPlanTripClick,
  onExploreToursClick,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Submit Booking Request',
      description: 'Select your tour, culinary event, or service and click "Book Now" or "Request Booking" with your dates, guest count, and preferences.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Direct Admin Review',
      description: 'Your request is delivered directly to the Bridge Ethiopia admin inbox for personal review by founder Hindek.',
      icon: Send,
    },
    {
      step: '03',
      title: 'Private Discussion & Pricing',
      description: 'Hindek will contact you privately by email or WhatsApp to discuss availability, tailored schedule, and transparent custom pricing.',
      icon: MessageSquare,
    },
    {
      step: '04',
      title: 'Confirmed Booking & Welcome',
      description: 'Once details are agreed upon, your spot is reserved. We meet you at Bole Airport and guide you with authentic Ethiopian hospitality.',
      icon: PlaneTakeoff,
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EE]" id="how-to-book-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B85C38]/10 text-[#B85C38] text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Simple, Direct & Transparent</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            How to Book with <span className="text-[#B85C38] font-serif italic">Bridge Ethiopia</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Booking an authentic journey in Ethiopia is personal and immediate. 
            You can book directly via <strong>WhatsApp</strong>, <strong>Email</strong>, or a <strong>Direct Phone Call</strong> with founder Hindek.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DACB] shadow-xs flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-serif text-[#D49A3D]">{st.step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF0E6] flex items-center justify-center text-[#B85C38]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[#1E3A2F]">{st.title}</h3>
                  <p className="text-xs text-[#6B6155] leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Booking Channels Banner (WhatsApp, Calling, Email) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DACB] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-left max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D49A3D] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#34A853]" />
              <span>Direct Booking Options</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">
              Ready to Book or Discuss Your Dates Right Now?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
              Reach out directly through any of our official channels for immediate confirmation and customized quotes:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                'Hello Hindek! I would like to inquire about booking a tour with Bridge Ethiopia.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${FOUNDER_INFO.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D49A3D]" />
              <span>Call {FOUNDER_INFO.phone}</span>
            </a>

            <a
              href={`mailto:${FOUNDER_INFO.email}?subject=${encodeURIComponent('Booking Inquiry - Bridge Ethiopia')}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6EE] hover:bg-[#F3ECE0] border border-[#D49A3D]/40 text-[#1E3A2F] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#B85C38]" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onPlanTripClick}
            className="px-8 py-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D49A3D]" />
            <span>Plan My Custom Trip Now</span>
          </button>

          <button
            onClick={onExploreToursClick}
            className="px-8 py-4 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#1E3A2F] border border-[#1E3A2F]/30 font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4 text-[#B85C38]" />
          </button>
        </div>

      </div>
    </section>
  );
};
