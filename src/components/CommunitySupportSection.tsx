import React, { useState } from 'react';
import { 
  Heart, 
  School, 
  HeartPulse, 
  Baby, 
  Building2, 
  Landmark, 
  ShieldCheck, 
  CheckCircle, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  HandHeart,
  Globe2,
  Users,
  FileText,
  Truck,
  BookOpen,
  Stethoscope,
  Plane,
  BadgeCheck,
  Compass
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

interface CommunitySupportProps {
  onOpenSupportModal: (topic: 'schools' | 'health' | 'orphanage' | 'government' | 'ngo' | 'general', serviceTitle?: string) => void;
}

export const CommunitySupportSection: React.FC<CommunitySupportProps> = ({
  onOpenSupportModal,
}) => {
  const [activeTab, setActiveTab] = useState<'giving' | 'ngo-gov'>('giving');

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E8E1D5]" id="community-ngo-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
            <HandHeart className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>Community Impact & Institutional Guidance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Support Local Communities & <span className="text-[#B85C38] font-serif italic">NGO / Govt Guidance</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Whether you want to support Ethiopian schools, health centers, or orphanages through Bridge Ethiopia, 
            or need trusted guidance navigating Ethiopian government offices and NGO missions — Hindek offers 
            deep local roots and extensive experience working with international NGOs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs text-xs sm:text-sm font-semibold text-[#5C5247]">
            <button
              onClick={() => setActiveTab('giving')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'giving'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'hover:text-[#1E3A2F]'
              }`}
            >
              <Heart className="w-4 h-4 text-[#E5AC4D]" />
              <span>Give Back: Schools, Health & Orphanages</span>
            </button>
            <button
              onClick={() => setActiveTab('ngo-gov')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'ngo-gov'
                  ? 'bg-[#1E3A2F] text-white shadow-xs'
                  : 'hover:text-[#1E3A2F]'
              }`}
            >
              <Landmark className="w-4 h-4 text-[#D49A3D]" />
              <span>Government Offices & NGO Experience</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SUPPORT THROUGH BRIDGE ETHIOPIA */}
        {activeTab === 'giving' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Core Giving Pillars: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Pillar 1: Schools & Education */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF0E6] border border-[#E8DACB] flex items-center justify-center text-[#B85C38]">
                    <School className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B85C38] block">
                      Education & Students
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">
                      Local Schools & Classrooms
                    </h3>
                  </div>

                  <p className="text-xs text-[#5C5247] leading-relaxed">
                    Help rural and community schools in Oromia, Southern Ethiopia, and regional towns equip children for a brighter future.
                  </p>

                  <div className="space-y-2 pt-1 text-xs text-[#3E362E]">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>School Supplies:</strong> Exercise books, pens, pencils, backpacks, geometry sets.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Library Books:</strong> English, Afaan Oromoo, and Amharic children's readers.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Classroom Desks:</strong> Wood desks and chalkboards for village classrooms.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Solar Lamps:</strong> Clean reading lights for off-grid students doing evening study.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
                  <button
                    onClick={() => onOpenSupportModal('schools', 'Support Local Schools & Education')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Support a School</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <p className="text-[11px] text-center text-[#7A7063]">
                    Option to visit and hand over supplies in person during your tour.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Health Centers & Clinics */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5EF] border border-[#CDE5D6] flex items-center justify-center text-[#1E3A2F]">
                    <HeartPulse className="w-6 h-6 text-[#2D7A54]" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D7A54] block">
                      Community Wellness
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">
                      Rural Health Centers & Posts
                    </h3>
                  </div>

                  <p className="text-xs text-[#5C5247] leading-relaxed">
                    Provide life-saving support for rural clinics and frontline community health extension workers serving mothers, infants, and elders.
                  </p>

                  <div className="space-y-2 pt-1 text-xs text-[#3E362E]">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Essential Medical Packs:</strong> Antiseptics, bandages, gauze, digital thermometers.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Maternal Health Kits:</strong> Clean birth essentials and pediatric multivitamins.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Clean Water Filters:</strong> Gravity-fed ceramic water purifiers for clinics and wards.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Sanitation Supplies:</strong> Soap, disinfectants, and hygiene wash stations.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
                  <button
                    onClick={() => onOpenSupportModal('health', 'Support Rural Health Centers & Clinics')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Support a Health Center</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <p className="text-[11px] text-center text-[#7A7063]">
                    100% direct coordination with local kebele health post directors.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Orphanages & Children Care */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF6E5] border border-[#F3DFC1] flex items-center justify-center text-[#D49A3D]">
                    <Baby className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D49A3D] block">
                      Vulnerable Children
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#1E3A2F]">
                      Orphanages & Children Care
                    </h3>
                  </div>

                  <p className="text-xs text-[#5C5247] leading-relaxed">
                    Sponsor verified community care centers that provide shelter, nutritious meals, and loving care for vulnerable Ethiopian children.
                  </p>

                  <div className="space-y-2 pt-1 text-xs text-[#3E362E]">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Nutritious Food Provisions:</strong> Teff flour, grain, legumes, fresh milk, and cooking oil.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Clothing & Warmth:</strong> Sweaters, shoes, socks, blankets, and children's mattress sets.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Care & Recreation:</strong> Educational games, footballs, art supplies, and hygiene kits.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#34A853] flex-shrink-0 mt-0.5" />
                      <span><strong>Education Sponsorship:</strong> School uniforms, tuition fees, and vocational training.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E1D5] space-y-3">
                  <button
                    onClick={() => onOpenSupportModal('orphanage', 'Support Orphanages & Vulnerable Children')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span>Support an Orphanage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D49A3D]" />
                  </button>
                  <p className="text-[11px] text-center text-[#7A7063]">
                    Ethical child dignity policy with zero exploitative photography.
                  </p>
                </div>
              </div>

            </div>

            {/* Bridge Ethiopia Ethical Impact Guarantee Banner */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#FAF0E6] border border-[#E8DACB] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2 text-left">
                <div className="inline-flex items-center gap-2 text-[#B85C38] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Bridge Ethiopia 100% Direct Impact Promise</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1E3A2F]">
                  Zero Middlemen Overhead • Complete Transparency
                </h4>
                <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
                  Bridge Ethiopia takes <strong>0% cut</strong> from your donations. Every dollar or donated item goes directly to the verified school, health center, or orphanage. Hindek personally oversees the handover and provides photographic proof and signed local receipts to donors.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => onOpenSupportModal('general', 'Community Giving Initiative')}
                  className="px-6 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <HandHeart className="w-4 h-4 text-[#D49A3D]" />
                  <span>Discuss a Giving Project</span>
                </button>
                <a
                  href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                    'Hello Hindek! I would like to support a school, health clinic, or orphanage through Bridge Ethiopia.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-white border border-[#E8DACB] hover:border-[#25D366] text-[#1E3A2F] font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: GOVERNMENT OFFICES SUPPORT & INTERNATIONAL NGO EXPERIENCE */}
        {activeTab === 'ngo-gov' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Hindek's NGO Credibility & Experience Feature Banner */}
            <div className="rounded-3xl p-6 sm:p-10 bg-[#1E3A2F] text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 rounded-full bg-white/5 blur-3xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3D]/20 text-[#D49A3D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/30">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Professional Track Record</span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                    Hindek's Experience with International NGOs & Public Institutions
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E2DDD5] leading-relaxed">
                    Beyond leading cultural journeys, <strong>Hindek has extensive professional experience working directly with international NGOs, humanitarian agencies, diplomatic missions, and research delegations</strong> operating across Ethiopia. She understands institutional protocol, field security, bureaucratic procedures, and community trust.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => onOpenSupportModal('ngo', 'International NGO Field Support & Logistics')}
                    className="px-6 py-3.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B32] text-[#1E3A2F] font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Request Institutional Support</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Professional Credibility Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15 text-left">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#D49A3D] font-bold text-xs">Multi-Agency Experience</div>
                  <div className="text-[11px] text-[#C2BCB3]">Humanitarian, academic & diplomatic partners</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#D49A3D] font-bold text-xs">Trilingual Fluency</div>
                  <div className="text-[11px] text-[#C2BCB3]">Afaan Oromoo, Amharic & professional English</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#D49A3D] font-bold text-xs">4WD Field Logistics</div>
                  <div className="text-[11px] text-[#C2BCB3]">Rugged Land Cruisers & verified local drivers</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[#D49A3D] font-bold text-xs">Local Kebele Access</div>
                  <div className="text-[11px] text-[#C2BCB3]">Elders' blessings & regional administration trust</div>
                </div>
              </div>
            </div>

            {/* Government Offices Navigation Grid */}
            <div className="space-y-4 text-left">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#B85C38] flex items-center gap-1.5">
                  <Landmark className="w-4 h-4" />
                  <span>Public Sector & Administrative Navigation</span>
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#1E3A2F]">
                  Ethiopian Government Offices We Help You Find & Navigate
                </h3>
                <p className="text-xs text-[#6B6155] max-w-3xl">
                  Bureaucratic procedures in Ethiopia can be intricate. Hindek provides clear directions, protocol guidance, local accompaniment, and translation to ensure your official visits are smooth and respectful.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                
                {/* 1. Immigration and Citizenship Service (ICS) */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B85C38]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Immigration & Citizenship Service (ICS)
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Guidance for tourist visa extensions, business visas, work/resident permit paperwork, foreign national registration, and official inquiries in Addis Ababa.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Immigration & Visa Assistance')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request Immigration Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Ministry of Foreign Affairs (MoFA) */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#D49A3D]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Ministry of Foreign Affairs (MoFA)
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Protocol guidance, consular coordination, diplomatic accreditation appointments, and official delegation meetings for visiting foreign missions.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Ministry of Foreign Affairs Guidance')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request MoFA Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Ministry of Tourism & Regional Bureaus */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] flex items-center justify-center text-[#1E3A2F]">
                      <Compass className="w-5 h-5 text-[#2D7A54]" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Ministry of Tourism & Heritage Bureaus
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Assistance obtaining filming/documentary permits, commercial photography clearances, drone permits, and access to UNESCO heritage sites and national parks.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Tourism & Filming Permit Guidance')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request Filming / Drone Permit Help</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. Customs Commission & EFDA (Health/Food/Drug) */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B85C38]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Customs Commission & Cargo Clearance
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Navigational support for clearing donated humanitarian supplies, medical equipment, educational cargo, or specialized scientific research instruments at Bole Airport.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Customs & Donation Cargo Clearance')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request Customs Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 5. Regional Government & Woreda/Kebele Administrations */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] flex items-center justify-center text-[#1E3A2F]">
                      <Users className="w-5 h-5 text-[#B85C38]" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Oromia & Regional Woreda/Kebele Offices
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Grassroots introductions to regional bureaus, woreda administrators, kebele chiefs, and community elders (Gadaa leaders) for field research and community programs.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Regional Bureau & Kebele Liaison')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request Regional Liaison</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 6. Ministry of Health & Education */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] flex items-center justify-center text-[#1E3A2F]">
                      <Stethoscope className="w-5 h-5 text-[#2D7A54]" />
                    </div>
                    <h4 className="text-base font-bold font-serif text-[#1E3A2F]">
                      Ministries of Health & Education
                    </h4>
                    <p className="text-xs text-[#5C5247] leading-relaxed">
                      Institutional visit planning, clinic/school partnership protocols, medical outreach logistics, and academic exchange coordination in Addis Ababa and regions.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenSupportModal('government', 'Health & Education Ministry Protocol')}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1 transition-colors pt-2 border-t border-[#E8E1D5]"
                  >
                    <span>Request Institutional Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Disclaimer & Transparency Note */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#D49A3D]/40 text-xs text-[#5C5247] flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-[#D49A3D] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E3A2F] block font-bold mb-0.5">Important Institutional Note:</strong>
                Bridge Ethiopia is an independent local guidance and logistics consultancy, not a government agency. We provide expert cultural orientation, linguistic bridge (Afaan Oromoo, Amharic, English), field logistics, and directions to official offices. Official administrative determinations remain strictly with the respective Ethiopian ministries.
              </div>
            </div>

          </div>
        )}

        {/* Universal Contact Footer for Community & NGO Support */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#E8E1D5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-lg sm:text-xl font-bold font-serif text-[#1E3A2F]">
              Have questions about giving back or planning an institutional mission?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B6155]">
              Contact Hindek directly. We respond within hours to all community inquiries and institutional requests.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-start sm:justify-end">
            <button
              onClick={() => onOpenSupportModal('general', 'Community & NGO Guidance Inquiry')}
              className="px-5 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs transition-colors shadow-xs"
            >
              Open Inquiry Form
            </button>
            <a
              href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                'Hello Hindek! I would like to learn more about community support (schools/health/orphanages) and NGO / government guidance in Ethiopia.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Hindek</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
