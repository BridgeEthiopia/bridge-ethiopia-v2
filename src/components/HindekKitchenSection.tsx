import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  CheckCircle, 
  Coffee, 
  Heart, 
  Users, 
  Calendar, 
  ShieldCheck, 
  MessageCircle,
  Camera,
  Star,
  Flame,
  Award,
  BookOpen,
  Info,
  Clock,
  ArrowRight,
  Smile,
  Image as ImageIcon
} from 'lucide-react';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { AuthenticImage } from './AuthenticImage';
import { DishRatingAndReviews } from './DishRatingAndReviews';
import { useCustomPhotoContext } from '../context/CustomPhotoContext';
import dishInjeraImg from '../assets/images/kitchen-dish-teff-injera.jpg';
import dishDoroWatImg from '../assets/images/kitchen-dish-doro-wat.jpg';
import dishTibsImg from '../assets/images/shekla_tibs_sizzling_1787813805251.jpg';
import dishKitfoImg from '../assets/images/food-kitfo.jpg';
import dishShiroImg from '../assets/images/kitchen-dish-shiro-tegamino.jpg';
import tourKitchenCookingImg from '../assets/images/tour-hindek-kitchen-cooking-experience.jpg';

interface HindekKitchenProps {
  onBookClass: (title: string) => void;
  onOpenPlanTrip: () => void;
}

export const HindekKitchenSection: React.FC<HindekKitchenProps> = ({
  onBookClass,
  onOpenPlanTrip,
}) => {
  const [activeDishTab, setActiveDishTab] = useState<'all' | 'signature' | 'vegan'>('all');
  const { photos, openUploadModal, isAdminMode } = useCustomPhotoContext();

  // Core Pillars of the Hands-On Experience
  const experiencePillars = [
    {
      title: 'Learn & Practice Cooking',
      description: 'Step-by-step hands-on guidance from Hindek. Practice traditional techniques yourself—not just watching.',
      icon: Utensils
    },
    {
      title: 'Local Spices & Ingredients',
      description: 'Discover authentic Berbere, Korarima cardamom, Niter Kibbeh herbal butter, and 100% Highland Teff.',
      icon: Flame
    },
    {
      title: 'Traditional Kitchen & Tools',
      description: 'Experience cooking with authentic tools: circular Mitad clay griddles, earthenware pots, and wooden mortars.',
      icon: Sparkles
    },
    {
      title: 'Eat What You Prepare',
      description: 'Sit around the handwoven Mesob basket, share your dishes family-style, and experience the warm custom of Gursha.',
      icon: Heart
    },
    {
      title: 'Ethiopian Hospitality & Coffee',
      description: 'Conclude your meal with a traditional 3-round Ethiopian coffee ceremony with frankincense smoke and fresh popcorn.',
      icon: Coffee
    },
    {
      title: 'Photos & Lifelong Memories',
      description: 'Take vibrant photos in authentic kitchen attire, receive recipe cards, and create unforgettable cultural memories.',
      icon: Camera
    }
  ];

  // Dishes visitors can learn & practice making
  const traditionalDishes = [
    {
      id: 'teff-injera',
      name: 'Highland Teff Injera Baking',
      nativeName: 'እንጀራ መጋገር',
      category: 'vegan',
      learningFocus: 'Fermentation & Mitad Pouring',
      image: dishInjeraImg,
      practiceActivity: 'Learn the 3-day Ersho natural fermentation process, pour batter on the circular clay Mitad griddle, and watch the signature honeycomb "eyes" (Ayn) form.',
      description: 'The soul of Ethiopian dining. A naturally gluten-free, mineral-dense sourdough flatbread that serves as plate, utensil, and nourishment.',
      cultureNote: 'Baking Injera is a revered domestic art passed down through generations in Ethiopia.'
    },
    {
      id: 'doro-wat',
      name: 'Authentic Doro Wat (Holiday Chicken Stew)',
      nativeName: 'የዶሮ ወጥ',
      category: 'signature',
      learningFocus: 'Onion Caramelization & Berbere',
      image: dishDoroWatImg,
      practiceActivity: 'Master the slow-cooking technique of caramelizing finely minced onions without water or oil, infusing rich Berbere spice, and scoring boiled eggs.',
      description: 'Ethiopia’s celebrated national holiday dish. Rich, deeply spiced, and prepared using Hindek’s family heritage recipe.',
      cultureNote: 'Traditionally prepared for festive gatherings, Ethiopian New Year (Enkutatash), and holiday feasts.'
    },
    {
      id: 'sizzling-tibs',
      name: 'Sizzling Shekla & Pan Tibs',
      nativeName: 'የሸክላ ጥብስ',
      category: 'signature',
      learningFocus: 'High-Heat Searing & Fresh Herbs',
      image: dishTibsImg,
      practiceActivity: 'Sauté prime beef or lamb over high heat with fresh rosemary sprigs, red onions, garlic cloves, and crisp green peppers in a seasoned skillet or clay burner.',
      description: 'A succulent, sizzling dish bursting with savory aroma and mild green chili brightness. Quick, celebratory, and universally loved.',
      cultureNote: 'Often served in a clay pot with live embers underneath to keep every bite piping hot.'
    },
    {
      id: 'kitfo',
      name: 'Traditional Kitfo & Spiced Herbal Butter',
      nativeName: 'ክትፎ',
      category: 'signature',
      learningFocus: 'Mitmita Spice & Niter Kibbeh',
      image: dishKitfoImg,
      practiceActivity: 'Gently warm minced lean beef infused with fiery Mitmita chili powder and fragrant clarified herbal butter (Niter Kibbeh), served with fresh Ayib cheese and minced greens.',
      description: 'A culinary treasure from the Gurage highlands, celebrated for its melt-in-the-mouth texture and warming spice bouquet.',
      cultureNote: 'Can be prepared according to your preference (Leb-Leb gently warmed or fully cooked).'
    },
    {
      id: 'shiro-tegamino',
      name: 'Clay Pot Shiro Tegamino',
      nativeName: 'ሽሮ ተጋሚኖ',
      category: 'vegan',
      learningFocus: 'Chickpea Flour & Clay Pot Simmer',
      image: dishShiroImg,
      practiceActivity: 'Whisk roasted chickpea flour (Shiro powder) with garlic, ginger, and diced tomatoes, then slow-simmer in an authentic clay pot until velvety and bubbling.',
      description: 'The ultimate Ethiopian comfort stew. 100% plant-based, nutritious, rich, and deeply satisfying.',
      cultureNote: 'A staple of Ethiopian fasting seasons (Tsom), loved by vegetarians and meat-lovers alike.'
    }
  ];

  const filteredDishes = traditionalDishes.filter((dish) => {
    if (activeDishTab === 'all') return true;
    if (activeDishTab === 'vegan') return dish.category === 'vegan';
    if (activeDishTab === 'signature') return dish.category === 'signature';
    return true;
  });

  const authenticKitchenTools = [
    { name: 'Clay Mitad Griddle', amharic: 'ምጣድ', desc: 'Circular earthenware plate for even Teff Injera baking' },
    { name: 'Woven Mesob Basket', amharic: 'መሶብ', desc: 'Handcrafted straw table for communal shared dining' },
    { name: 'Clay Jebena Pot', amharic: 'ጀበና', desc: 'Long-necked earthenware pot for slow coffee brewing' },
    { name: 'Mukecha & Zenezena', amharic: 'ሙቀጫ', desc: 'Traditional wooden mortar and pestle for spices and coffee' },
    { name: 'Shekla Clay Skillet', amharic: 'የሸክላ ድስት', desc: 'Clay cooking vessel retaining natural heat and aroma' },
    { name: 'Girgira Burner', amharic: 'ግርግራም / ዕጣን', desc: 'Charcoal incense holder for fragrant frankincense blessings' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EE] text-[#2E2822]" id="hindek-kitchen-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with Clear Identity Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B85C38]/10 text-[#B85C38] text-xs font-bold uppercase tracking-wider border border-[#B85C38]/20">
            <Utensils className="w-3.5 h-3.5" />
            <span>Interactive Cultural Cooking Class & Workshop</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Hindek Kitchen
          </h2>

          <p className="text-lg sm:text-2xl font-serif text-[#B85C38] font-bold italic">
            “Cook, Learn, Taste, and Experience Ethiopian Culture.”
          </p>

          {/* CRITICAL CLARIFICATION BANNER: NOT A RESTAURANT */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#D49A3D]/40 shadow-sm text-left max-w-2xl mx-auto flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center flex-shrink-0 text-[#B85C38] mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-[#52483E]">
              <p className="font-bold text-[#1E3A2F] text-sm">
                Cultural Cooking Class & Hands-On Experience — Not a Restaurant
              </p>
              <p className="leading-relaxed text-[#6B6155]">
                Hindek Kitchen is a private cultural cooking experience where travelers and visitors participate directly in preparing authentic Ethiopian food with local guidance, eat the meals they helped cook, and immerse themselves in genuine Ethiopian hospitality.
              </p>
            </div>
          </div>
        </div>

        {/* Core Hands-On Pillars (6-grid) */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase font-bold text-[#8C7E6D] tracking-wider">What You Will Experience</span>
            <h3 className="text-2xl font-bold font-serif text-[#1E3A2F]">A Complete Cultural & Culinary Journey</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {experiencePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-white border border-[#E8DACB] shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#B85C38]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1E3A2F]">{pillar.title}</h4>
                    <p className="text-xs text-[#6B6155] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D49A3D]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Hands-On Participation</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Host & Authentic Kitchen Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DACB] shadow-sm">
          
          {/* Photo Showcase & Photo Upload */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-md border-2 border-white bg-[#1E3A2F] group">
              <AuthenticImage
                src={tourKitchenCookingImg}
                alt="Hindek Kitchen cooking class experience"
                subjectName="Hindek Kitchen Cooking Experience"
                photoKey="tour-hindek-kitchen-cooking-experience"
                photoCategory="tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A3D] block">
                  Authentic Addis Ababa Space
                </span>
                <p className="text-sm font-bold font-serif">
                  Traditional Cooking & Hospitality with Hindek
                </p>
              </div>

              {/* Photo Upload Prompt Button (Founder Admin Only) */}
              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => openUploadModal({
                    key: 'tour-hindek-kitchen-cooking-experience',
                    title: 'Hindek Kitchen: Traditional Cooking & Market Class',
                    category: 'tour',
                    currentSrc: tourKitchenCookingImg,
                    aspectRatio: 'landscape'
                  })}
                  className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/20 shadow-md cursor-pointer transition-all"
                  title="Update or upload Hindek Kitchen photos"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Upload Kitchen Photo</span>
                </button>
              )}
            </div>

            {/* Note on Authenticity */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8DACB] flex items-center justify-between text-xs text-[#6B6155]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>Authentic cultural space • No fake AI imagery</span>
              </span>
              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => openUploadModal('kitchenAvatar')}
                  className="text-[11px] font-bold text-[#B85C38] hover:underline cursor-pointer"
                >
                  Manage Photos
                </button>
              )}
            </div>
          </div>

          {/* Narrative & Booking Details */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C7E6D]">
                  Private & Small Group Sessions
                </span>
                <span className="text-xs text-[#D49A3D]">•</span>
                <span className="text-xs font-semibold text-[#1E3A2F]">Hosted by {FOUNDER_INFO.name}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A2F] font-serif leading-snug">
                Step Inside a Traditional Ethiopian Kitchen
              </h3>
              
              <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed">
                Rather than eating at a conventional restaurant where you simply order from a menu, Hindek Kitchen invites you into an interactive home kitchen environment. You will touch, smell, chop, whisk, simmer, and bake under friendly local guidance.
              </p>
            </div>

            {/* Session Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#423B33]">
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#1E3A2F] flex-shrink-0" />
                <span>Small, private sessions (Solo, Couples, Families, Groups)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B85C38] flex-shrink-0" />
                <span>100% customized to dietary needs (Vegan / GF options)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#D49A3D] flex-shrink-0" />
                <span>Full traditional coffee ceremony included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] flex items-center gap-2">
                <Smile className="w-4 h-4 text-[#34A853] flex-shrink-0" />
                <span>Eat together around the Mesob in festive warmth</span>
              </div>
            </div>

            {/* Clear Pricing & Booking Note */}
            <div className="p-4 rounded-xl bg-[#FAF0E6] border border-[#E8DACB] text-xs text-[#52483E] space-y-1">
              <p className="font-bold text-[#1E3A2F] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B85C38]" />
                <span>Private Booking & Scheduling</span>
              </p>
              <p className="text-[#6B6155] leading-relaxed">
                Hindek Kitchen does not have fixed restaurant menu prices. Experiences are scheduled privately based on your date, group size, and favorite dishes. All details and pricing are provided upon submitting your booking request.
              </p>
            </div>

            {/* Booking CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onBookClass('Hindek Kitchen Cultural Cooking Experience')}
                className="px-6 py-3.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer"
                id="book-hindek-kitchen-main-btn"
              >
                <Utensils className="w-4 h-4 text-[#D49A3D]" />
                <span>Book Hindek Kitchen Experience</span>
              </button>

              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${encodeURIComponent(
                  'Hello Hindek! I would like to book a private cultural cooking experience at Hindek Kitchen.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Request</span>
              </a>
            </div>

          </div>
        </div>

        {/* Traditional Ethiopian Kitchen Tools Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DACB] shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold text-[#B85C38] tracking-wider">
              Heritage Utensils & Living Traditions
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A2F] font-serif">
              Authentic Ethiopian Kitchen Tools You Will Use
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6155]">
              Practice cooking with traditional artisanal clayware, handwoven baskets, and hand-carved tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {authenticKitchenTools.map((tool, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DACB]/70 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1E3A2F]">{tool.name}</h4>
                  <span className="text-[11px] font-bold text-[#B85C38] bg-white px-2 py-0.5 rounded-md border border-[#E8DACB]">
                    {tool.amharic}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B6155] leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Dishes You Can Learn & Practice Making */}
        <div className="space-y-8" id="hindek-kitchen-dishes-learning">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Hands-On Culinary Curriculum</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A2F] font-serif">
                Traditional Dishes You Can Learn & Practice
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5247] max-w-2xl">
                Choose the dishes you would like to prepare during your private cooking session. Each recipe is taught hands-on from scratch.
              </p>
            </div>

            {/* Filter Tabs & Upload Button */}
            <div className="flex flex-wrap items-center gap-2">
              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => openUploadModal({
                    key: 'kitchen-dish-teff-injera',
                    title: 'Hindek Kitchen Cooking Photos',
                    category: 'food',
                  })}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E8DACB] hover:border-[#1E3A2F] text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
                  <span>Upload Dish Photos</span>
                </button>
              )}

              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E8DACB]">
                <button
                  type="button"
                  onClick={() => setActiveDishTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeDishTab === 'all'
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'text-[#6B6155] hover:text-[#1E3A2F]'
                  }`}
                >
                  All Dishes ({traditionalDishes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDishTab('signature')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeDishTab === 'signature'
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'text-[#6B6155] hover:text-[#1E3A2F]'
                  }`}
                >
                  Meat & Celebration
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDishTab('vegan')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    activeDishTab === 'vegan'
                      ? 'bg-[#1E3A2F] text-white shadow-xs'
                      : 'text-[#6B6155] hover:text-[#1E3A2F]'
                  }`}
                >
                  Vegan / Gluten-Free
                </button>
              </div>
            </div>
          </div>

          {/* Dishes Learning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DACB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                id={`kitchen-dish-card-${dish.id}`}
              >
                <div>
                  {/* Dish Visual Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <AuthenticImage
                      src={dish.image}
                      alt={`Learn to cook ${dish.name} at Hindek Kitchen`}
                      subjectName={dish.name}
                      photoKey={`kitchen-dish-${dish.id}`}
                      photoCategory="food"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#1E3A2F] text-xs font-bold shadow-xs">
                        {dish.nativeName}
                      </span>
                    </div>

                    {isAdminMode && (
                      <button
                        type="button"
                        onClick={() => openUploadModal({
                          key: `kitchen-dish-${dish.id}`,
                          title: dish.name,
                          category: 'food',
                          currentSrc: dish.image,
                        })}
                        className="absolute top-3.5 right-3.5 z-10 px-2 py-1 rounded-lg bg-black/65 hover:bg-black/85 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs transition-all cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-[#D49A3D]" />
                        <span>Upload</span>
                      </button>
                    )}

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <span className="text-[10px] font-bold text-[#E5AC4D] uppercase tracking-wider block">
                        Focus: {dish.learningFocus}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold font-serif leading-tight">
                        {dish.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#52483E] leading-relaxed">
                      {dish.description}
                    </p>

                    {/* What You Practice */}
                    <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DACB] text-[11px] text-[#5C5247] space-y-1">
                      <div className="flex items-center gap-1 text-[#1E3A2F] font-bold">
                        <Utensils className="w-3.5 h-3.5 text-[#B85C38]" />
                        <span>What You Practice Cooking:</span>
                      </div>
                      <p className="text-[#6B6155] leading-relaxed">{dish.practiceActivity}</p>
                    </div>

                    {/* Cultural Context Note */}
                    <p className="text-[11px] text-[#8C7E6D] italic">
                      ✦ {dish.cultureNote}
                    </p>

                    {/* Guest Feedback & Reviews on this Recipe */}
                    <div className="pt-1">
                      <DishRatingAndReviews
                        dishId={dish.id}
                        dishName={dish.name}
                        compact={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Card CTA: Request this dish in your class */}
                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onBookClass(`Hindek Kitchen Experience (Focus: ${dish.name})`)}
                    className="w-full py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Request to Learn This Dish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Booking & Hospitality Invitation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1E3A2F] to-[#12241D] text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D49A3D]/20 text-[#D49A3D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Memories That Last a Lifetime</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-serif">
              Ready to Cook, Learn, and Taste?
            </h3>

            <p className="text-xs sm:text-sm text-[#D9D0C1] leading-relaxed">
              Whether you are a solo traveler, a couple, a family with children, or a group of friends visiting Ethiopia, Hindek Kitchen welcomes you as a honored guest. Send a booking request with your preferred date to arrange your private session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onBookClass('Hindek Kitchen Cultural Cooking Experience')}
                className="px-8 py-3.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B32] text-[#1E3A2F] font-bold text-sm tracking-wide shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Book Hindek Kitchen Experience</span>
              </button>

              <button
                type="button"
                onClick={onOpenPlanTrip}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <span>Include in Custom Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
