import React from 'react';
import { 
  Car, 
  Smartphone, 
  Languages, 
  Coins, 
  ShieldCheck, 
  Building, 
  Plane, 
  Headphones,
  CheckCircle,
  MessageCircle,
  Landmark,
  HandHeart,
  ArrowRight
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface AssistantProps {
  onContactSupport: (serviceName: string) => void;
  onOpenCommunityNgo?: () => void;
}

export const TravelAssistantSection: React.FC<AssistantProps> = ({
  onContactSupport,
  onOpenCommunityNgo,
}) => {
  const services = [
    {
      icon: Plane,
      title: 'Bole Airport Meet & Greet',
      description: 'Personal greeting right outside international arrivals at Addis Ababa Bole Airport with private transfer to your hotel.'
    },
    {
      icon: Landmark,
      title: 'Government Offices & Permit Liaison',
      description: 'Guidance finding and navigating Ethiopian government offices (Immigration, Foreign Affairs, Tourism, Customs, Kebele administrations) backed by Hindek\'s international NGO experience.'
    },
    {
      icon: HandHeart,
      title: 'School, Health & Orphanage Support',
      description: 'Transparent facilitation for visitors wishing to donate books, medical supplies, or support local orphanages and village schools in person.'
    },
    {
      icon: Smartphone,
      title: 'Local SIM & 4G Connectivity',
      description: 'Assistance getting an Ethio Telecom / Safaricom eSIM or physical SIM registered with reliable 4G data for your entire stay.'
    },
    {
      icon: Car,
      title: 'Private 4WD & City Transport',
      description: 'Reliable Toyota Land Cruisers with licensed, safety-trained drivers for rugged highland routes, NGO field trips, and smooth city trips.'
    },
    {
      icon: Languages,
      title: 'Multilingual Local Translation',
      description: 'Seamless communication support in Amharic, Afaan Oromoo, Tigrinya, and local languages for markets and rural areas.'
    },
    {
      icon: Coins,
      title: 'Currency & Banking Guidance',
      description: 'Official exchange advice, safe ATM locations, and navigating local cash payment customs and digital Telebirr options.'
    },
    {
      icon: Building,
      title: 'Verified Lodging Reservations',
      description: 'Direct booking assistance at trusted eco-lodges, historic guesthouses, and luxury stays with verified standards.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="travel-assistance-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>On-The-Ground Care</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Local <span className="text-[#B85C38] font-serif italic">Travel Assistance</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Travel with complete peace of mind. Bridge Ethiopia handles the logistics so you can focus 
            on taking in the magic, tastes, and landscapes of Ethiopia.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center justify-center text-[#1E3A2F]">
                    <Icon className="w-6 h-6 text-[#B85C38]" />
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#1E3A2F]">{svc.title}</h3>
                  <p className="text-xs text-[#6B6155] leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <button
                  onClick={() => onContactSupport(`Local Travel Service: ${svc.title}`)}
                  className="pt-3 border-t border-[#E8E1D5] text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center justify-between gap-1.5 transition-colors"
                >
                  <span>Request Booking / Service</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#34A853]" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Community Giving & Government / NGO Guidance Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#FAF0E6] border border-[#E8DACB] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-[11px] font-bold uppercase tracking-wider">
              <HandHeart className="w-3.5 h-3.5 text-[#B85C38]" />
              <span>Giving Back & NGO Guidance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1E3A2F]">
              Support Schools, Health Centers, Orphanages or Need NGO & Government Liaison?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed max-w-3xl">
              Hindek has direct experience working with international NGOs and helps travelers facilitate verified, 100% direct donations to village schools, rural health clinics, and children's shelters, as well as navigating Ethiopian government ministries and administrative offices.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {onOpenCommunityNgo ? (
              <button
                onClick={onOpenCommunityNgo}
                className="px-5 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>View Support & NGO Guide</span>
                <ArrowRight className="w-4 h-4 text-[#D49A3D]" />
              </button>
            ) : (
              <a
                href="#community-ngo-section"
                className="px-5 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>View Support & NGO Guide</span>
                <ArrowRight className="w-4 h-4 text-[#D49A3D]" />
              </a>
            )}
          </div>
        </div>

        {/* 24/7 WhatsApp Assistance Strip */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#1E3A2F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-serif text-white">
              Need immediate advice or have questions while in Ethiopia?
            </h3>
            <p className="text-xs text-[#D9D0C1]">
              Reach out directly to Hindek and our on-ground team on WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
              'Hello Hindek! I need local travel assistance in Ethiopia.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors whitespace-nowrap shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({FOUNDER_INFO.whatsappDisplay})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
