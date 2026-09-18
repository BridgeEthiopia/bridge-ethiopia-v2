import React, { useState } from 'react';
import { 
  Coffee, 
  Sparkles, 
  Flame, 
  Heart, 
  Check, 
  MessageCircle, 
  Users, 
  ShieldCheck,
  Camera,
  ShoppingBag,
  Leaf,
  Truck,
  PackageCheck,
  Award,
  ChevronRight,
  Boxes,
  Building2,
  PhoneCall,
  Mail,
  ArrowRight
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { AuthenticImage } from './AuthenticImage';
import { useCustomPhotoContext } from '../context/CustomPhotoContext';
import coffeeCeremonyImg from '../assets/images/ethiopian_coffee_ceremony_1787813852379.jpg';
import { COFFEE_PACKAGES, HINDEK_COFFEE_TAGLINE, CUSTOM_ORDERS_INFO } from '../data/coffeePackagesData';
import { CoffeePackage } from '../types';
import { CoffeeOrderModal } from './CoffeeOrderModal';

interface HindekCoffeeProps {
  onBookCeremony: (title: string) => void;
}

export const HindekCoffeeSection: React.FC<HindekCoffeeProps> = ({
  onBookCeremony,
}) => {
  const { openUploadModal, isAdminMode } = useCustomPhotoContext();
  const [selectedPackage, setSelectedPackage] = useState<CoffeePackage | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'retail' | 'commercial' | 'wholesale'>('all');

  const steps = [
    {
      step: '01',
      title: 'Green Beans & Origins',
      description: 'Sort raw green Arabica beans while discovering single-origin profiles from Yirgacheffe, Sidama, Harar, and ancient Kafa rainforests.'
    },
    {
      step: '02',
      title: 'Charcoal Pan Roasting',
      description: 'Roast beans over charcoal embers. Guests waft the rich aromatic smoke towards themselves to receive the aromatic blessing.'
    },
    {
      step: '03',
      title: 'Mortar & Pestle Grinding',
      description: 'Pound the warm freshly roasted beans by hand using the traditional wooden Mukecha mortar and Zenezena pestle.'
    },
    {
      step: '04',
      title: 'Clay Jebena Brewing',
      description: 'Slow-brew the grounds in the black clay Jebena pot with pure water over charcoal until the fragrant steam rises.'
    },
    {
      step: '05',
      title: 'The Three Sacred Rounds',
      description: 'Drink the three traditional rounds: Abol (the first and strongest), Tona (the second, reflective brew), and Baraka (the blessing).'
    },
    {
      step: '06',
      title: 'Popcorn & Kolo Pairing',
      description: 'Enjoy freshly popped corn (fendisha) and roasted barley with peanuts (kolo) served over fresh green ceremonial grass.'
    }
  ];

  const handleOpenOrder = (pkg: CoffeePackage) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#1E3A2F] text-white relative overflow-hidden" id="hindek-coffee-section">
      {/* Background Subtle Ambience */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D49A3D]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#B85C38]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D49A3D]/20 text-[#E5AC4D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/40">
            <Coffee className="w-3.5 h-3.5" />
            <span>Signature Sacred Coffee Tradition</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white">
            Hindek Grandpa Coffee Experience
          </h2>

          <p className="text-lg sm:text-xl text-[#F4BE5E] italic font-serif">
            Abol • Tona • Baraka — The Soul of Ethiopian Hospitality
          </p>

          <p className="text-sm sm:text-base text-[#D9D0C1] leading-relaxed">
            Ethiopia is the birthplace of Arabica coffee (Buna). The traditional coffee ceremony 
            is an unhurried sacred ritual of connection, gratitude, and blessing passed down across generations.
          </p>
        </div>

        {/* Visual Hero & Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D49A3D]/40 aspect-4/5 group img-zoom-parent bg-slate-900">
              <AuthenticImage
                src={coffeeCeremonyImg}
                alt="Traditional Ethiopian Coffee Ceremony in Jebena"
                subjectName="Hindek Grandpa Coffee Experience: 3-Stage Ceremony"
                photoKey="tour-hindek-grandpa-coffee-ceremony"
                photoCategory="tour"
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => openUploadModal({
                    key: 'tour-hindek-grandpa-coffee-ceremony',
                    title: 'Hindek Grandpa Coffee Experience: 3-Stage Ceremony',
                    category: 'tour',
                    currentSrc: coffeeCeremonyImg,
                    aspectRatio: 'landscape'
                  })}
                  className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs border border-white/20 transition-all cursor-pointer shadow-md"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Upload Ceremony Photo</span>
                </button>
              )}

              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[11px] font-bold text-[#E5AC4D] uppercase tracking-wider">
                  The Sacred Jebena
                </span>
                <p className="text-sm font-semibold">
                  Handmade black clay pot pouring pure Ethiopian Arabica into delicate Cini cups without disturbing settled grounds.
                </p>
              </div>
            </div>

            {/* Frankincense Aromatic Blessing Badge */}
            <div className="absolute -top-4 -left-4 bg-[#12241D] text-white p-3 rounded-2xl border border-[#D49A3D] shadow-xl flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-[#D49A3D]" />
              <span className="text-xs font-bold">Frankincense & Myrrh Aroma</span>
            </div>
          </div>

          {/* Right Column: Narrative & Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Warm + Personal + Traditional + Authentic
              </h3>
              <p className="text-xs sm:text-sm text-[#D9D0C1] leading-relaxed">
                Named in honor of Ethiopian elders and family traditions, the Hindek Grandpa Coffee Experience 
                invites you to slow down, witness the transformation from raw green bean to aromatic cup, 
                and take part in an ancient ritual that unites communities across Ethiopia.
              </p>
            </div>

            {/* 6-Step Ceremonial Flow Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {steps.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#D49A3D]">{item.step}</span>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#C4B5A5] leading-relaxed pl-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#E8E1D5]">
              <div className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-[#D49A3D]" />
                <span>Unhurried Sacred Ritual</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <Users className="w-4 h-4 text-[#E5AC4D]" />
                <span>1 - 10 Guests (Personalized)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-semibold">
                <Coffee className="w-4 h-4 text-[#D49A3D]" />
                <span>Fresh Popcorn & Kolo Included</span>
              </div>
            </div>

            {/* Booking Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onBookCeremony('Hindek Grandpa Coffee Experience')}
                className="px-6 py-3.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                id="book-grandpa-coffee-btn"
              >
                <Coffee className="w-4 h-4" />
                <span>Book Coffee Ceremony</span>
              </button>

              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                  'Hello Hindek! I would like to join the Hindek Grandpa Coffee Experience.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* NEW SECTION: HINDEK COFFEE PACKAGES STORE                                */}
        {/* ========================================================================= */}
        <div className="pt-12 border-t border-white/15 space-y-12" id="coffee-packages-section">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D49A3D]/20 text-[#E5AC4D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/30">
                <ShoppingBag className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Hindek Coffee Store</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
                Hindek Coffee
              </h3>

              <div className="space-y-1">
                <p className="text-lg sm:text-xl font-medium text-[#F4BE5E]">
                  Freshly Roasted Ethiopian Coffee
                </p>
                <p className="text-xs sm:text-sm text-[#D4C8B8] italic font-serif">
                  {HINDEK_COFFEE_TAGLINE}
                </p>
              </div>

              <p className="text-sm font-semibold text-white/90 pt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D49A3D] animate-pulse" />
                <span>Choose the size that fits you:</span>
              </p>
            </div>

            {/* Currency Selector & Quick Order CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-1 rounded-xl bg-black/40 border border-white/20 flex items-center text-xs">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    currency === 'USD' ? 'bg-[#D49A3D] text-[#1E3A2F]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('ETB')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    currency === 'ETB' ? 'bg-[#D49A3D] text-[#1E3A2F]' : 'text-white/70 hover:text-white'
                  }`}
                >
                  ETB (Birr)
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleOpenOrder(COFFEE_PACKAGES[0])}
                className="px-4 py-2.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>
            </div>
          </div>

          {/* Sizing Guide Quick Pill Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-[#E5AC4D] uppercase tracking-wider">
                Full Size Range (Retail to Wholesale)
              </span>
              <span className="text-[11px] text-[#A89A88]">
                Small artisan batches roasted in Addis Ababa
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">200g</span>
                <span className="text-[11px] text-[#D9D0C1]">Perfect for personal use</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">250g</span>
                <span className="text-[11px] text-[#D9D0C1]">Great for everyday coffee</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">500g</span>
                <span className="text-[11px] text-[#D9D0C1]">Ideal for coffee lovers & families</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">1 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">Great value for regular drinkers</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">2 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">Homes, offices & small businesses</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">5 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">For cafés, restaurants & businesses</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">10 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">Bulk order</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">25 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">Wholesale</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                <span className="font-black text-[#F4BE5E] text-sm">50 kg</span>
                <span className="text-[11px] text-[#D9D0C1]">Large wholesale orders</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#D49A3D]/10 border border-[#D49A3D]/30 flex flex-col justify-center">
                <span className="font-bold text-[#E5AC4D] text-xs">Custom Orders</span>
                <span className="text-[11px] text-[#C4B5A5]">Wholesale & Private-Label</span>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-[#D49A3D] text-[#1E3A2F] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                All Sizes ({COFFEE_PACKAGES.length})
              </button>

              <button
                type="button"
                onClick={() => setCategoryFilter('retail')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'retail'
                    ? 'bg-[#D49A3D] text-[#1E3A2F] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                Personal & Family (200g – 1kg)
              </button>

              <button
                type="button"
                onClick={() => setCategoryFilter('commercial')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'commercial'
                    ? 'bg-[#D49A3D] text-[#1E3A2F] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                Offices & Cafés (2kg, 5kg, 10kg)
              </button>

              <button
                type="button"
                onClick={() => setCategoryFilter('wholesale')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'wholesale'
                    ? 'bg-[#D49A3D] text-[#1E3A2F] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                Wholesale & Export (25kg, 50kg)
              </button>
            </div>

            <div className="text-xs text-[#C4B5A5] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Available in Whole Bean or Custom Grind</span>
            </div>
          </div>

          {/* 4 Quality Pillars (Matching Brand Identity) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">100% Natural</span>
                <span className="text-[11px] text-[#C4B5A5]">High-Altitude Heirloom</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Rich Aroma</span>
                <span className="text-[11px] text-[#C4B5A5]">Honey & Jasmine Floral</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Smooth Taste</span>
                <span className="text-[11px] text-[#C4B5A5]">Velvety Crema & Clean Cup</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Roasted with Care</span>
                <span className="text-[11px] text-[#C4B5A5]">Small Artisan Batches</span>
              </div>
            </div>
          </div>

          {/* Coffee Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {COFFEE_PACKAGES.filter((item) => {
              if (categoryFilter === 'all') return true;
              return item.tier === categoryFilter;
            }).map((item) => (
              <div
                key={item.id}
                className="bg-[#12241D] rounded-3xl border-2 border-[#D49A3D]/30 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D49A3D] transition-all relative text-left"
              >
                {/* Image Showcase */}
                <div className="relative aspect-4/3 overflow-hidden bg-black/50">
                  <AuthenticImage
                    src={item.imageUrl}
                    alt={item.title}
                    subjectName={item.title}
                    photoKey={item.photoKey}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12241D] via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Weight tag */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20 text-xs font-bold text-white">
                    {item.weight}
                  </div>

                  {/* Admin Photo Upload Button */}
                  {isAdminMode && (
                    <button
                      type="button"
                      onClick={() => openUploadModal({
                        key: item.photoKey,
                        title: item.title,
                        category: 'food',
                        aspectRatio: 'square'
                      })}
                      className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black/90 text-white text-[11px] font-bold flex items-center gap-1 backdrop-blur-xs border border-white/20 cursor-pointer"
                    >
                      <Camera className="w-3 h-3 text-[#D49A3D]" />
                      <span>Update Photo</span>
                    </button>
                  )}
                </div>

                {/* Package Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Size & Purpose Header */}
                    {item.purpose && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D49A3D]/15 border border-[#D49A3D]/30 text-[#F4BE5E] text-xs font-semibold">
                        <span>{item.weight}</span>
                        <span>—</span>
                        <span>{item.purpose}</span>
                      </div>
                    )}

                    <h4 className="text-lg font-bold font-serif text-white group-hover:text-[#F4BE5E] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <div className="text-xs font-semibold text-[#D49A3D] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Roast: {item.roastType}</span>
                    </div>

                    <p className="text-xs text-[#D9D0C1] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      {item.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#C4B5A5]">
                          <Check className="w-3.5 h-3.5 text-[#D49A3D] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Order CTAs */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-[#8C7E6D] uppercase block font-semibold">
                          {item.isWholesale ? 'Wholesale Rate' : 'Direct Roastery Price'}
                        </span>
                        <span className="text-2xl font-black text-[#F4BE5E]">
                          {currency === 'USD' ? `$${item.priceUSD} USD` : `${item.priceETB} ETB`}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/60">
                        {item.id.includes('green') ? 'Raw Beans' : 'Whole or Ground'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenOrder(item)}
                        className="py-2.5 px-3 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </button>

                      <a
                        href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                          `Hello Hindek! I would like to order: ${item.title} (${item.weight}) — ${item.purpose}. Please let me know how to arrange delivery.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* CUSTOM ORDERS & PRIVATE-LABEL SECTION                                     */}
          {/* ========================================================================= */}
          <div className="rounded-3xl bg-gradient-to-br from-[#162C22] via-[#12241D] to-[#0D1B15] border-2 border-[#D49A3D]/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D49A3D]/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D49A3D]/20 text-[#E5AC4D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/30">
                    <Boxes className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Custom Orders & Wholesale Supply</span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                    Need a different quantity or custom packaging for your business?
                  </h4>

                  <p className="text-sm sm:text-base text-[#D4C8B8] leading-relaxed">
                    Contact us for wholesale and private-label orders. Whether you operate a specialty café, boutique hotel, diplomatic mission, corporate office, or overseas retail brand, we handcraft custom packaging and batch-roast to your exact taste profile.
                  </p>

                  <p className="text-base sm:text-lg font-serif italic text-[#F4BE5E] pt-1">
                    Hindek Coffee — Ethiopian Coffee, Roasted with Care.
                  </p>
                </div>

                {/* Direct Action Box */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/15 flex flex-col gap-3 shrink-0 lg:w-80">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Direct Founder Coordination
                  </span>
                  
                  <a
                    href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                      'Hello Hindek! I would like to inquire about Custom Orders, Wholesale Supply, and Private-Label packaging for Hindek Coffee for my business.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp for Wholesale</span>
                  </a>

                  <a
                    href={`tel:${FOUNDER_INFO.phone}`}
                    className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/10"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Call: {FOUNDER_INFO.phone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenOrder(COFFEE_PACKAGES.find(p => p.id === 'pkg-25kg-wholesale') || COFFEE_PACKAGES[0])}
                    className="py-2.5 px-4 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Inquire Custom Size</span>
                  </button>
                </div>
              </div>

              {/* 4 Wholesale & Private Label Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Private-Label Packaging</span>
                  <p className="text-[#C4B5A5] leading-relaxed">
                    Custom bags printed with your brand logo, event labels, or bespoke company hampers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Tailored Roast Profiles</span>
                  <p className="text-[#C4B5A5] leading-relaxed">
                    From light floral Scandinavian roasts to full-bodied Italian espresso and traditional Jebena.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Weekly Addis Delivery</span>
                  <p className="text-[#C4B5A5] leading-relaxed">
                    Scheduled fresh coffee drops to restaurants, embassies, and hotels across Addis Ababa.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">Export & Cargo Support</span>
                  <p className="text-[#C4B5A5] leading-relaxed">
                    Certified flight-safe vacuum sacks, phytosanitary advice, and international cargo dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Delivery Highlight Banner */}
          <div className="p-6 rounded-3xl bg-[#12241D] border border-[#D49A3D]/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Hotel & Airport Delivery</h5>
                <p className="text-xs text-[#C4B5A5]">
                  Free delivery to central Addis Ababa hotels or airport handoff before your flight.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 md:border-l md:border-white/10 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <PackageCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Flight-Safe Packaging</h5>
                <p className="text-xs text-[#C4B5A5]">
                  Aroma-sealed valve bags approved for carry-on and international luggage customs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 md:border-l md:border-white/10 md:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D49A3D]/20 text-[#D49A3D] flex items-center justify-center shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Custom Roast On Demand</h5>
                <p className="text-xs text-[#C4B5A5]">
                  Need whole beans or custom grind for your espresso machine or Jebena? Handcrafted for you.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Coffee Order Modal */}
      <CoffeeOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  );
};
