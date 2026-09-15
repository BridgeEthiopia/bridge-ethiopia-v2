import React, { useState } from 'react';
import { FOOD_DISHES_DATA, FOUNDER_INFO } from '../data/ethiopiaData';
import { FoodDish } from '../types';
import { AuthenticImage } from './AuthenticImage';
import { DishRatingAndReviews } from './DishRatingAndReviews';
import { useCustomPhotoContext } from '../context/CustomPhotoContext';
import { 
  Utensils, 
  Flame, 
  Leaf, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Heart, 
  Info,
  Filter,
  Compass,
  Coffee,
  Camera
} from 'lucide-react';

interface FoodGalleryProps {
  onBookFoodTour: (dishName: string) => void;
}

export const FoodGallerySection: React.FC<FoodGalleryProps> = ({
  onBookFoodTour,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDish, setActiveDish] = useState<FoodDish | null>(null);
  const { openUploadModal, isAdminMode } = useCustomPhotoContext();

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'meat', label: 'Celebration Meat' },
    { id: 'fasting-vegan', label: 'Vegan / Fasting (Tsom)' },
    { id: 'oromo', label: 'Oromo Specialties' },
    { id: 'bread-grains', label: 'Teff & Breads' },
  ];

  const kitchenPractices = [
    {
      title: 'Dhadhaa (Spiced Clarified Butter)',
      description: 'Crafted from pure cow milk churned in large gourds and clarified over gentle embers with sacred herbs like Kosseret and Korarima.'
    },
    {
      title: 'Wooden Mukecha & Serving Vessels',
      description: 'Hand-carved hardwood bowls and spoons used for serving dense, warming Marqaa and sharing Buna Qalaa blessings.'
    },
    {
      title: 'Buna Qalaa Sacred Ritual',
      description: 'Whole green coffee beans gently fried in pure Dhadhaa butter, eaten with fresh milk as an elder prayer for community peace (Nagaa).'
    },
    {
      title: 'Traditional Clay Oven & Mitad',
      description: 'Open hearth cooking using cured local clay griddles to bake savory flatbreads and tender spiced meat stews.'
    }
  ];

  const filteredDishes = FOOD_DISHES_DATA.filter((dish) => {
    if (selectedCategory === 'all') return true;
    return dish.category === selectedCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]" id="ethiopian-food-gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B85C38]/10 text-[#B85C38] text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Authentic Ethiopian & Oromo Cuisine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A2F] tracking-tight">
            Ethiopian & Oromo <span className="text-[#B85C38] font-serif italic">Food Gallery</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C5247] leading-relaxed">
            Every dish in Ethiopia tells a story of spice routes, highland grain cultivation, 
            pastoralist traditions, and celebratory feasts. Each authentic dish below features genuine 
            photographs, key ingredients, and deep cultural roots.
          </p>
        </div>

        {/* Category Filters & Quick Upload */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E1D5] pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E3A2F] text-white shadow-sm'
                    : 'bg-white text-[#52483E] hover:bg-[#E8E1D5] border border-[#E8E1D5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isAdminMode && (
            <button
              type="button"
              onClick={() => openUploadModal({
                key: 'food-doro-wat',
                title: 'Authentic Food Gallery Photos',
                category: 'food',
              })}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DACB] hover:border-[#1E3A2F] text-xs font-bold text-[#1E3A2F] flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto"
            >
              <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Upload Dish Photos</span>
            </button>
          )}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group img-zoom-parent"
              id={`food-card-${dish.id}`}
            >
              {/* Individual Real Photo */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <AuthenticImage
                  src={dish.image}
                  alt={dish.name}
                  subjectName={dish.name}
                  photoKey={`food-${dish.id}`}
                  photoCategory="food"
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Native Name Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#1E3A2F] text-xs font-bold">
                    {dish.nativeName}
                  </span>
                  {dish.oromoRegion && (
                    <span className="px-2.5 py-1 rounded-full bg-[#1E3A2F]/90 backdrop-blur-xs text-[#D49A3D] text-[11px] font-bold">
                      {dish.oromoRegion}
                    </span>
                  )}
                </div>

                {/* Direct Upload Button & Vegetarian / Vegan Badge */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
                  {isAdminMode && (
                    <button
                      type="button"
                      onClick={() => openUploadModal({
                        key: `food-${dish.id}`,
                        title: dish.name,
                        category: 'food',
                        currentSrc: dish.image,
                      })}
                      className="px-2 py-1 rounded-lg bg-black/65 hover:bg-black/85 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs transition-all cursor-pointer"
                    >
                      <Camera className="w-3 h-3 text-[#D49A3D]" />
                      <span>Upload</span>
                    </button>
                  )}

                  {dish.isVegetarian && (
                    <div className="bg-[#1E3A2F]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 font-semibold">
                      <Leaf className="w-3 h-3 text-[#34A853]" />
                      <span>Vegan</span>
                    </div>
                  )}
                </div>

                {/* Title & Spice Level */}
                <div className="absolute bottom-3.5 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif group-hover:text-[#F4BE5E] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] text-[#E8DACB]">
                      Spice Profile: {dish.spiceLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dish Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-[#52483E] leading-relaxed line-clamp-3">
                  {dish.description}
                </p>

                {/* Main Ingredients */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-[#8C7E6D] block tracking-wider">
                    Key Ingredients
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dish.mainIngredients.slice(0, 4).map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] text-[#423B33]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cultural Context Box */}
                <div className="p-3 rounded-xl bg-[#FAF0E6]/60 border border-[#E8DACB] text-[11px] text-[#6B6155] leading-relaxed">
                  <strong className="text-[#B85C38] block font-semibold mb-0.5">Cultural Tradition:</strong>
                  {dish.culturalBackground}
                </div>

                {/* Star Rating & Quick Review */}
                <DishRatingAndReviews
                  dishId={dish.id}
                  dishName={dish.name}
                  compact={true}
                />

                {/* Card Action */}
                <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C7E6D] italic">
                    Served with {dish.servedWith.split(',')[0]}
                  </span>
                  <button
                    onClick={() => onBookFoodTour(`Taste & Cook ${dish.name}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Oromo Traditional Kitchen Craft & Hospitality Feature */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#FAF0E6] to-[#F3EDE2] border border-[#E8DACB] space-y-8 mt-12">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#B85C38] tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#D49A3D]" />
              <span>Authentic Traditional Kitchens</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A2F] font-serif">
              Oromo Kitchen Craft & Hearth Hospitality
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5247] leading-relaxed">
              Traditional Oromo kitchens prioritize natural earthenware, respect for dairy and cattle stewardship, 
              and the warm gathering of family members around the hearth for storytelling and blessing prayers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kitchenPractices.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8DACB] space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#1E3A2F]/10 flex items-center justify-center text-[#1E3A2F]">
                  <Flame className="w-4 h-4 text-[#B85C38]" />
                </div>
                <h4 className="text-sm font-bold text-[#1E3A2F]">{item.title}</h4>
                <p className="text-xs text-[#6B6155] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
