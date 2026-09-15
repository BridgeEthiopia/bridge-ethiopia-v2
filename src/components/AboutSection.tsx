import React, { useState } from 'react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useFounderPhoto } from '../context/FounderPhotoContext';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Compass, 
  MapPin, 
  Coffee, 
  CheckCircle,
  Eye,
  GraduationCap,
  HeartHandshake,
  Activity,
  Building2,
  BookOpen,
  Globe2,
  Phone,
  Mail,
  MessageCircle,
  Send,
  ArrowRight,
  Camera,
  Upload
} from 'lucide-react';

interface AboutSectionProps {
  onOpenPlanTrip?: () => void;
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenPlanTrip,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<'founder' | 'ngo' | 'mission'>('founder');
  const { photos, openUploadModal, isAdminMode } = useFounderPhoto();

  const ngoFocusAreas = [
    {
      title: 'Education',
      desc: 'Supporting educational access, student programs, and learning initiatives.',
      icon: GraduationCap,
    },
    {
      title: 'Health',
      desc: 'Assisting community health outreach, wellness drives, and medical missions.',
      icon: Activity,
    },
    {
      title: 'Community Development',
      desc: 'Empowering grassroots livelihoods, youth development, and sustainable progress.',
      icon: Building2,
    },
    {
      title: 'Schools & Educational Programs',
      desc: 'Connecting international institutions with local schools, teachers, and exchange projects.',
      icon: BookOpen,
    },
    {
      title: 'Social Support',
      desc: 'Facilitating targeted assistance for vulnerable families, women, and community groups.',
      icon: HeartHandshake,
    },
    {
      title: 'Local Communities',
      desc: 'Fostering respectful, direct engagement with urban and rural Ethiopian communities.',
      icon: Users,
    },
    {
      title: 'Community-Based Projects',
      desc: 'Field coordination and monitoring for locally led non-profit and research projects.',
      icon: Globe2,
    },
  ];

  const ngoServices = [
    {
      title: 'Local Guidance & Cultural Orientation',
      desc: 'Providing in-depth cultural context, local customs, and institutional orientation to international delegations and field teams.',
    },
    {
      title: 'Ground Coordination & Field Logistics',
      desc: 'Organizing dependable 4WD transportation, vetted regional lodging, field scheduling, and safe in-country movement.',
    },
    {
      title: 'Connecting with Local Institutions & Contacts',
      desc: 'Facilitating respectful introductions to relevant local authorities, community elders, elderships, and partner organizations.',
    },
    {
      title: 'Translation & Community Dialogue',
      desc: 'On-the-ground communication bridge in Amharic, Afaan Oromoo, and English to ensure smooth, transparent collaboration.',
    },
  ];

  const travelPillars = [
    {
      title: 'Authentic Cultural Immersion',
      desc: 'Connecting visitors directly with authentic Ethiopian culture, traditional kitchens, food, history, nature, and living heritage.',
      icon: Heart,
    },
    {
      title: '100% Real Verified Photography',
      desc: 'Every image is genuine. We strictly reject AI-generated or misleading visuals in favor of authentic Ethiopian reality.',
      icon: Eye,
    },
    {
      title: 'Deep Local Ethiopian Knowledge',
      desc: 'Native guidance rooted in regional traditions, unwritten cultural etiquette, and warm Ethiopian hospitality.',
      icon: Compass,
    },
    {
      title: 'Safety, Care & Ethical Tourism',
      desc: 'Ensuring your visit is secure, seamless, and delivers fair economic support directly to local hosts and artisans.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Founder & Mission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            About <span className="text-[#B85C38] font-serif italic">Hindek</span> & Bridge Ethiopia
          </h2>

          <p className="text-base sm:text-lg text-[#B85C38] font-serif font-semibold italic">
            Local Guide & Cultural Experience Host in Ethiopia
          </p>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Hindek is a local guide and cultural experience host in Ethiopia. Through Bridge Ethiopia, she helps tourists and visitors discover Ethiopia with local knowledge, guidance, and authentic experiences.
          </p>
        </div>

        {/* Tab Switcher for Deep Dive */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] text-xs sm:text-sm font-semibold text-[#5C5247]">
            <button
              onClick={() => setActiveTab('founder')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'founder'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'hover:text-[#1E3A2F]'
              }`}
            >
              About Hindek & Services
            </button>
            <button
              onClick={() => setActiveTab('ngo')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'ngo'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'hover:text-[#1E3A2F]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>International Visitor & NGO Support</span>
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'mission'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'hover:text-[#1E3A2F]'
              }`}
            >
              Vision & Values
            </button>
          </div>
        </div>

        {/* TAB 1: ABOUT HINDEK */}
        {activeTab === 'founder' && (
          <div className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-[#FAF8F5] border border-[#E8E1D5] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#1E3A2F] flex flex-col justify-end group">
                <img
                  src={photos.portrait}
                  alt="Hindek - Founder of Bridge Ethiopia"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12241D]/90 via-[#12241D]/20 to-transparent pointer-events-none" />
                
                {/* Floating Quick Upload Photo Button */}
                {isAdminMode && (
                  <button
                    type="button"
                    onClick={() => openUploadModal('portrait')}
                    className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer transition-all hover:scale-105"
                    title="Upload / Change photo"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Update Photo</span>
                  </button>
                )}

                <div className="relative z-10 p-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3D]/25 text-[#D49A3D] text-[11px] font-bold tracking-wider uppercase border border-[#D49A3D]/40 backdrop-blur-md">
                    <Sparkles className="w-3 h-3" />
                    <span>Founder & General Manager</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {FOUNDER_INFO.name}
                  </h3>
                  <p className="text-xs text-[#E5AC4D] font-medium">
                    Founder, General Manager & Lead Host • Bridge Ethiopia
                  </p>
                  <p className="text-[11px] text-[#E8E1D5] leading-relaxed pt-1">
                    Addis Ababa • Tour Leadership, NGO Logistics & Authentic Cultural Experiences
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-3 -right-3 bg-[#1E3A2F] text-white py-2 px-3.5 rounded-2xl border-2 border-[#D49A3D] shadow-xl text-xs font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>Founder & Tour Director</span>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#B85C38]">
                    Founder, General Manager & Cultural Experience Host
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1E3A2F]">
                    Meet Hindek
                  </h3>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border-2 border-[#D49A3D]/40 text-[#1E3A2F] text-xs sm:text-sm leading-relaxed font-serif italic">
                  “I am the Founder and General Manager of Bridge Ethiopia. Bridge Ethiopia is my platform for helping tourists, visitors, and international partners explore Ethiopia with authentic local knowledge, reliable organization, and heartfelt hospitality. I also founded Hindek Kitchen, our hands-on cultural cooking immersion.”
                </div>

                <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
                  Through <strong>Bridge Ethiopia</strong>, Hindek helps tourists and visitors discover real Ethiopia through local knowledge, guidance, culture, food, coffee, destinations, and unforgettable authentic journeys.
                </p>

                {/* Comprehensive List of Services Offered by Hindek */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#8C7E6D] block">
                    Services Provided by Hindek & Bridge Ethiopia:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2E2822]">
                    {[
                      'Local tour guiding',
                      'Helping visitors explore Ethiopia',
                      'Personalized travel assistance',
                      'Cultural guidance & orientation',
                      'Planning local experiences',
                      'Helping visitors discover real destinations',
                      'Food and cultural experiences',
                      'Ethiopian cooking experiences through Hindek Kitchen',
                      'Traditional coffee experiences',
                      'Travel and local assistance',
                      'Connecting visitors with trusted local services',
                      'Small group & private custom itineraries'
                    ].map((serviceItem, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#34A853] flex-shrink-0" />
                        <span className="font-medium text-[#423B33]">{serviceItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenPlanTrip}
                  className="px-6 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                >
                  <span>Plan a Trip with Hindek</span>
                  <ArrowRight className="w-4 h-4 text-[#D49A3D]" />
                </button>

                <a
                  href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                    'Hello Hindek! I would love to connect and learn more about visiting Ethiopia.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#25D366] text-[#1E3A2F] font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: INTERNATIONAL VISITOR & NGO SUPPORT */}
        {activeTab === 'ngo' && (
          <div className="space-y-8 animate-in fade-in duration-300" id="ngo-section">
            
            {/* Overview Card */}
            <div className="rounded-3xl p-6 sm:p-10 bg-[#FAF8F5] border border-[#E8E1D5] text-left space-y-6">
              
              {/* Header */}
              <div className="space-y-3 max-w-3xl">
                <span className="text-xs uppercase font-bold tracking-wider text-[#B85C38] flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Bridging International Initiatives with Local Communities</span>
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1E3A2F]">
                  International NGO Support, Community Giving & Government Liaison
                </h3>
                
                <p className="text-xs sm:text-sm text-[#423B33] leading-relaxed font-medium">
                  Hindek has extensive hands-on experience working directly with international NGOs, humanitarian agencies, and visiting research delegations in Ethiopia. Through Bridge Ethiopia, she also helps visitors give back directly to local schools, health centers, and orphanages, while guiding organizations and travelers through Ethiopian government offices and administrative workflows.
                </p>
              </div>

              {/* Official Quote Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#1E3A2F] text-white space-y-3 relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 text-[#D49A3D] text-xs font-bold uppercase tracking-wider">
                  <Globe2 className="w-4 h-4 text-[#D49A3D]" />
                  <span>Hindek's Professional NGO & Community Leadership</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-[#EAE4DC] leading-relaxed italic font-serif">
                  “I have significant experience working directly with international NGOs, bilateral organizations, and visiting delegations in Ethiopia. For travelers who wish to give back, Bridge Ethiopia facilitates direct, transparent support for local schools, rural health centers, and verified orphanages — ensuring 100% of your gifts reach the children and communities. For foreign organizations, researchers, and visitors needing official liaison, I provide local guidance to find and navigate Ethiopian government offices (including the Immigration and Citizenship Service, Ministry of Foreign Affairs, Ministry of Tourism, Customs, and regional woreda/kebele administrations). Bridge Ethiopia operates with independent professionalism, cultural integrity, and deep local trust.”
                </blockquote>
                <div className="text-[11px] text-[#D49A3D] font-semibold">
                  — Hindek, Founder & General Manager, Bridge Ethiopia
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  Services & Community Support Areas:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Giving back to local schools (exercise books, stationery, desks & solar lamps)',
                    'Supporting rural health centers & clinics (medical kits, maternal packs & water filters)',
                    'Assisting verified orphanages & children shelters (food provisions, warm clothing & schooling)',
                    'Navigating Ethiopian government offices (Immigration ICS, Ministry of Foreign Affairs, Tourism & Customs)',
                    'International NGO field mission logistics & 4WD vehicle fleet with safety drivers',
                    'High-level bilingual translation & dialogue (Amharic, Afaan Oromoo & English)',
                    'Community entry protocol, kebele administration liaison & Gadaa elder meetings',
                    'Meeting coordination, itinerary scheduling & in-country cultural orientation'
                  ].map((svc, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E8E1D5] flex items-center gap-2.5 text-xs text-[#2E2822] shadow-2xs">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0" />
                      <span className="font-medium">{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsible Community Support & Volunteering Connection Box */}
              <div className="p-5 rounded-2xl bg-[#FAF0E6] border border-[#E8DACB] space-y-2 text-xs sm:text-sm text-[#423B33]">
                <div className="flex items-center gap-2 font-bold text-[#B85C38]">
                  <Heart className="w-4 h-4 text-[#B85C38]" />
                  <span>Ethical Community Support, Schools, Clinics & Orphanages</span>
                </div>
                <p className="text-xs text-[#52483E] leading-relaxed">
                  Bridge Ethiopia connects travelers and donors with real, verified community needs. Whether bringing a suitcase of school supplies, donating toward clinic water filters, or sponsoring meals for vulnerable children at a local shelter, Hindek guarantees 100% direct handover with photographic confirmation and zero middleman fee.
                </p>
              </div>

              {/* Important Disclaimer */}
              <div className="p-4 rounded-xl bg-white border-2 border-[#D49A3D]/40 text-xs text-[#52483E] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D49A3D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E3A2F] block mb-0.5">Important Clarification:</strong>
                  <p className="text-[#6B6155] leading-relaxed">
                    Bridge Ethiopia does not replace government services or claim official authority. It provides independent local guidance, coordination, and assistance.
                  </p>
                </div>
              </div>

              {/* Activity Focus Areas Tags Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  Focus Areas & Community Sectors:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {ngoFocusAreas.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1 shadow-2xs hover:border-[#1E3A2F]/40 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#B85C38]">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-[#1E3A2F] font-serif">{item.title}</h4>
                        <p className="text-[10px] text-[#6B6155] leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct NGO & Visitor Coordination Contact CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8E1D5]">
                <div className="text-xs text-[#6B6155]">
                  Need in-country assistance for your team, delegation, or research initiative?
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${FOUNDER_INFO.email}?subject=${encodeURIComponent(
                      'International Visitor & NGO Local Assistance - Bridge Ethiopia'
                    )}&body=${encodeURIComponent(
                      'Hello Hindek,\n\nWe are an international organization / delegation / research partner planning activities in Ethiopia. We would like to discuss local guidance, logistics coordination, and community orientation.'
                    )}`}
                    className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4 text-[#D49A3D]" />
                    <span>Inquire for NGO / Field Support</span>
                  </a>
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      'Hello Hindek! I am an international visitor/organization seeking local guidance and support in Ethiopia.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: VISION & VALUES */}
        {activeTab === 'mission' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Quote Card */}
            <div className="rounded-3xl p-8 sm:p-12 bg-[#1E3A2F] text-white text-center space-y-6 relative overflow-hidden border border-[#2D5A47] shadow-xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 rounded-full bg-[#D49A3D]/10 blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#D49A3D] text-xs font-bold uppercase tracking-wider mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hindek's Vision</span>
              </div>

              <blockquote className="max-w-3xl mx-auto">
                <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white leading-relaxed font-bold">
                  “My goal is to connect Ethiopia with the world—through tourism, culture, community support, and meaningful partnerships.”
                </p>
              </blockquote>

              <div className="space-y-1 pt-2">
                <div className="font-serif font-bold text-lg text-[#D49A3D]">
                  {FOUNDER_INFO.name}
                </div>
                <div className="text-xs text-[#D9D0C1] tracking-wider uppercase font-medium">
                  Founder, Bridge Ethiopia • Your Trusted Local Guide
                </div>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {travelPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3 hover:border-[#1E3A2F]/40 transition-colors shadow-2xs text-left"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#E8E1D5] flex items-center justify-center text-[#1E3A2F] shadow-2xs">
                      <Icon className="w-5 h-5 text-[#B85C38]" />
                    </div>
                    <h4 className="text-base font-bold text-[#1E3A2F] font-serif">{p.title}</h4>
                    <p className="text-xs text-[#6B6155] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* Global Vision Banner Quote (Always Visible at bottom of Section) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6EE] border border-[#E8DFC8] flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#B85C38] block">
              Founder Vision & Ethical Commitment
            </span>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#1E3A2F] italic">
              “Building a bridge not only between Ethiopia and tourists, but also between communities, organizations, and opportunities.”
            </p>
            <p className="text-xs text-[#6B6155]">
              — Hindek, Founder, Bridge Ethiopia
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onOpenPlanTrip}
              className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs transition-colors shadow-sm"
            >
              Plan Your Journey
            </button>
            <a
              href={`mailto:${FOUNDER_INFO.email}`}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#1E3A2F] text-[#1E3A2F] font-bold text-xs transition-colors"
            >
              Email Hindek
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
