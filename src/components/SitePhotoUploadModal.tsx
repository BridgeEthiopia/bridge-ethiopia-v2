import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  Sparkles, 
  User, 
  Camera, 
  Utensils, 
  Calendar, 
  Building2, 
  MapPin, 
  Search,
  Info,
  CheckCircle2,
  Trash2,
  UploadCloud,
  Compass,
  BookOpen,
  HelpCircle,
  Copy,
  Download,
  ShieldCheck,
  Eye,
  Globe,
  Lock
} from 'lucide-react';
import { useCustomPhotoContext, compressImage, UploadTargetInfo } from '../context/CustomPhotoContext';
import { PhotoGuideModal } from './PhotoGuideModal';
import { 
  DESTINATIONS_DATA, 
  FESTIVALS_DATA, 
  FOOD_DISHES, 
  ACCOMMODATIONS_DATA, 
  TOURS_DATA, 
  FOUNDER_INFO 
} from '../data/ethiopiaData';
import heroMountainShowcaseImg from '../assets/images/bale_harenna_forest_moss_1788010330829.jpg';
import dishInjeraImg from '../assets/images/kitchen-dish-teff-injera.jpg';
import dishDoroWatImg from '../assets/images/kitchen-dish-doro-wat.jpg';
import dishTibsImg from '../assets/images/shekla_tibs_sizzling_1787813805251.jpg';
import dishKitfoImg from '../assets/images/food-kitfo.jpg';
import dishShiroImg from '../assets/images/kitchen-dish-shiro-tegamino.jpg';

export const SitePhotoUploadModal: React.FC = () => {
  const {
    photos,
    updatePhoto,
    updateAllPhotos,
    customPhotos,
    setCustomPhoto,
    removeCustomPhoto,
    getCustomPhoto,
    hasCustomPhoto,
    resetAllCustomPhotos,
    isUploadModalOpen,
    closeUploadModal,
    activeTarget,
  } = useCustomPhotoContext();

  const [activeCategory, setActiveCategory] = useState<'founder' | 'destination' | 'food' | 'festival' | 'hotel' | 'tour' | 'export'>('founder');
  const [selectedKey, setSelectedKey] = useState<string>(activeTarget?.key || 'portrait');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isExportCopied, setIsExportCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    isAdminMode, 
    setIsAdminMode, 
    toggleAdminMode,
    publishAllPhotosGlobally,
    isPublishingLive,
    lastPublishedTime
  } = useCustomPhotoContext();

  // Sync category with activeTarget when modal opens or target changes
  useEffect(() => {
    if (activeTarget && activeTarget.key) {
      setSelectedKey(activeTarget.key);
      if (['founder', 'destination', 'food', 'festival', 'hotel', 'tour'].includes(activeTarget.category)) {
        setActiveCategory(activeTarget.category as any);
      } else if (activeTarget.key in photos || activeTarget.key.includes('founder') || activeTarget.key.includes('Avatar') || activeTarget.key === 'portrait') {
        setActiveCategory('founder');
      } else if (activeTarget.key.startsWith('dest-') || activeTarget.key.includes('destination') || activeTarget.key.includes('omo') || activeTarget.key.includes('konso')) {
        setActiveCategory('destination');
      } else if (activeTarget.key.startsWith('food-') || activeTarget.key.startsWith('kitchen-dish-')) {
        setActiveCategory('food');
      } else if (activeTarget.key.startsWith('fest-')) {
        setActiveCategory('festival');
      } else if (activeTarget.key.startsWith('hotel-')) {
        setActiveCategory('hotel');
      } else if (activeTarget.key.startsWith('tour-')) {
        setActiveCategory('tour');
      }
    }
  }, [activeTarget, isUploadModalOpen]);

  if (!isUploadModalOpen) return null;

  // Build target items list for each category
  const founderItems = [
    { key: 'portrait', title: 'Hindek Story & Biography (Main Portrait)', subtitle: 'Narrative biography photo in About section', current: photos.portrait },
    { key: 'heroAvatar', title: 'Hindek Hero Welcome Avatar', subtitle: 'Square profile shown in top hero banner', current: photos.heroAvatar },
    { key: 'kitchenAvatar', title: 'Hindek Kitchen Host Photo', subtitle: 'Shown in cooking classes & culinary experiences', current: photos.kitchenAvatar },
    { key: 'coffeeAvatar', title: 'Coffee Ceremony Host & Ceremony Avatar', subtitle: 'Shown in Grandpa Coffee ritual section', current: photos.coffeeAvatar },
    { key: 'contactAvatar', title: 'WhatsApp & Direct Consultation', subtitle: 'Shown on direct booking & phone contact card', current: photos.contactAvatar },
    { key: 'actionPhoto', title: 'Field Guide & Nature Tour Photo', subtitle: 'Shown on personalized itineraries', current: photos.actionPhoto },
  ];

  const destinationItems = [
    {
      key: 'hero_featured_destination',
      title: '🌟 First Page Hero Showcase Photo',
      subtitle: 'Main showcase banner image on the front hero section (From Mountain Peaks to Living Heritage)',
      current: getCustomPhoto('hero_featured_destination', heroMountainShowcaseImg),
      defaultSrc: heroMountainShowcaseImg,
    },
    ...DESTINATIONS_DATA.map(d => ({
      key: `dest-${d.id}`,
      title: d.name,
      subtitle: d.regionLabel || d.tagline,
      current: getCustomPhoto(`dest-${d.id}`, d.heroImage),
      defaultSrc: d.heroImage,
    }))
  ];

  const kitchenCookingDishes = [
    {
      key: 'kitchen-dish-teff-injera',
      title: 'Hindek Kitchen: 100% Teff Injera Baking',
      subtitle: 'Cooking class hands-on sourdough fermentation',
      current: getCustomPhoto('kitchen-dish-teff-injera', dishInjeraImg),
      defaultSrc: dishInjeraImg,
    },
    {
      key: 'kitchen-dish-doro-wat',
      title: 'Hindek Kitchen: Classic Doro Wat Holiday Stew',
      subtitle: 'Cooking class onion caramelization & Berbere spice',
      current: getCustomPhoto('kitchen-dish-doro-wat', dishDoroWatImg),
      defaultSrc: dishDoroWatImg,
    },
    {
      key: 'kitchen-dish-sizzling-tibs',
      title: 'Hindek Kitchen: Sizzling Shekla Pan Tibs',
      subtitle: 'Cooking class high-heat skillet searing & herbs',
      current: getCustomPhoto('kitchen-dish-sizzling-tibs', dishTibsImg),
      defaultSrc: dishTibsImg,
    },
    {
      key: 'kitchen-dish-kitfo',
      title: 'Hindek Kitchen: Gurage Traditional Kitfo',
      subtitle: 'Cooking class Mitmita spice & herbal Niter Kibbeh',
      current: getCustomPhoto('kitchen-dish-kitfo', dishKitfoImg),
      defaultSrc: dishKitfoImg,
    },
    {
      key: 'kitchen-dish-shiro-tegamino',
      title: 'Hindek Kitchen: Clay Pot Shiro Tegamino',
      subtitle: 'Cooking class chickpea flour slow simmer',
      current: getCustomPhoto('kitchen-dish-shiro-tegamino', dishShiroImg),
      defaultSrc: dishShiroImg,
    }
  ];

  const foodItems = [
    ...kitchenCookingDishes,
    ...FOOD_DISHES.map(f => ({
      key: `food-${f.id}`,
      title: `${f.name} (${f.nativeName || f.category})`,
      subtitle: `${f.category.toUpperCase()} • ${f.spiceLevel} Spice`,
      current: getCustomPhoto(`food-${f.id}`, f.image),
      defaultSrc: f.image,
    }))
  ];

  const festivalItems = FESTIVALS_DATA.map(fest => ({
    key: `fest-${fest.id}`,
    title: fest.name,
    subtitle: `${fest.culture} • ${fest.dateOrSeason}`,
    current: getCustomPhoto(`fest-${fest.id}`, fest.image),
    defaultSrc: fest.image,
  }));

  const hotelItems = ACCOMMODATIONS_DATA.map(h => ({
    key: `hotel-${h.id}`,
    title: h.name,
    subtitle: `${h.type} • ${h.location}`,
    current: getCustomPhoto(`hotel-${h.id}`, h.image),
    defaultSrc: h.image,
  }));

  const tourItems = TOURS_DATA.map(t => ({
    key: `tour-${t.id}`,
    title: t.title,
    subtitle: `${t.category} • ${t.region}`,
    current: getCustomPhoto(`tour-${t.id}`, t.image),
    defaultSrc: t.image,
  }));

  let currentItemsList = founderItems;
  if (activeCategory === 'destination') currentItemsList = destinationItems;
  if (activeCategory === 'food') currentItemsList = foodItems;
  if (activeCategory === 'festival') currentItemsList = festivalItems;
  if (activeCategory === 'hotel') currentItemsList = hotelItems;
  if (activeCategory === 'tour') currentItemsList = tourItems;

  const filteredItems = currentItemsList.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  const currentSelectedItem = currentItemsList.find(i => i.key === selectedKey) || filteredItems[0] || currentItemsList[0];

  const handleProcessFile = async (file: File) => {
    try {
      setIsProcessing(true);
      setErrorMessage('');
      
      // Compress to optimal web dimensions for fast rendering & smooth IndexedDB persistence
      const compressedDataUrl = await compressImage(file, 1400, 1400, 0.82);

      const targetKey = selectedKey || currentSelectedItem?.key || 'portrait';

      if (activeCategory === 'founder' && targetKey in photos) {
        updatePhoto(targetKey as any, compressedDataUrl);
      } else {
        setCustomPhoto(targetKey, compressedDataUrl);
      }

      setSuccessMessage(`Saved! Photo for "${currentSelectedItem?.title || targetKey}" is now active.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      setErrorMessage('Failed to process image file. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleProcessFile(file);
    // Reset file input value so user can re-upload same file if desired
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleProcessFile(files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;

    const targetKey = selectedKey || currentSelectedItem?.key || 'portrait';

    if (activeCategory === 'founder' && targetKey in photos) {
      updatePhoto(targetKey as any, imageUrlInput.trim());
    } else {
      setCustomPhoto(targetKey, imageUrlInput.trim());
    }

    setSuccessMessage(`Image link applied to "${currentSelectedItem?.title || targetKey}"!`);
    setImageUrlInput('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleResetCurrent = () => {
    const targetKey = selectedKey || currentSelectedItem?.key || 'portrait';
    if (activeCategory === 'founder' && targetKey in photos) {
      const defaultFounder = founderItems.find(i => i.key === targetKey);
      if (defaultFounder) {
        updatePhoto(targetKey as any, defaultFounder.current);
      }
    } else {
      removeCustomPhoto(targetKey);
    }
    setSuccessMessage('Reset photo back to default image.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleApplyFounderToAll = () => {
    const currentPhoto = photos[selectedKey as keyof typeof photos] || photos.portrait;
    updateAllPhotos(currentPhoto);
    setSuccessMessage('Applied your photo across all Hindek profiles and badges!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleExportJson = () => {
    const exportPayload = {
      project: 'Bridge Ethiopia',
      exportedAt: new Date().toISOString(),
      founderName: FOUNDER_INFO.name,
      founderPhotos: photos,
      customPhotosMap: customPhotos,
    };
    const jsonString = JSON.stringify(exportPayload, null, 2);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsonString);
      setIsExportCopied(true);
      setTimeout(() => setIsExportCopied(false), 3500);
    }
  };

  const handleDownloadBackup = () => {
    const exportPayload = {
      project: 'Bridge Ethiopia',
      exportedAt: new Date().toISOString(),
      founderName: FOUNDER_INFO.name,
      founderPhotos: photos,
      customPhotosMap: customPhotos,
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bridge-ethiopia-photos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isCurrentCustom = activeCategory === 'founder' 
    ? (photos[selectedKey as keyof typeof photos] && photos[selectedKey as keyof typeof photos] !== (founderItems.find(i => i.key === selectedKey) as any)?.defaultSrc)
    : hasCustomPhoto(selectedKey);

  const previewSource = activeCategory === 'founder'
    ? photos[selectedKey as keyof typeof photos] || photos.portrait
    : getCustomPhoto(selectedKey, (currentSelectedItem as any)?.defaultSrc);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 sm:py-5 bg-[#1E3A2F] text-white flex items-center justify-between border-b border-[#2E5445] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D49A3D]/20 border border-[#D49A3D]/40 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#D49A3D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Photo Manager & Uploader
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[10px] font-extrabold uppercase">
                  Saved Automatically
                </span>
              </div>
              <p className="text-xs text-[#E5AC4D]">
                Upload your photos for Hindek, destinations, traditional dishes, festivals, lodges & tours.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D49A3D] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#D49A3D]/40"
              title="View format, naming and authenticity guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">How to Upload &amp; Photo Guide</span>
              <span className="sm:hidden">Guide</span>
            </button>

            <button
              onClick={closeUploadModal}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close photo uploader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-3 bg-[#FAF8F5] border-b border-[#E8E1D5] overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'founder', label: '👤 Hindek Profile' },
            { id: 'destination', label: '🏞️ Destinations (Omo, Konso, etc.)' },
            { id: 'food', label: '🍲 Traditional Foods' },
            { id: 'festival', label: '🎉 Festivals' },
            { id: 'tour', label: '🧭 Tours & Treks' },
            { id: 'hotel', label: '🏡 Lodges & Stays' },
            { id: 'export', label: '💾 Permanent Sync & Export' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setSearchQuery('');
                  if (tab.id === 'founder') setSelectedKey('portrait');
                  if (tab.id === 'destination') setSelectedKey(`dest-${DESTINATIONS_DATA[0].id}`);
                  if (tab.id === 'food') setSelectedKey(`food-${FOOD_DISHES[0].id}`);
                  if (tab.id === 'festival') setSelectedKey(`fest-${FESTIVALS_DATA[0].id}`);
                  if (tab.id === 'tour') setSelectedKey(`tour-${TOURS_DATA[0].id}`);
                  if (tab.id === 'hotel') setSelectedKey(`hotel-${ACCOMMODATIONS_DATA[0].id}`);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? tab.id === 'export' ? 'bg-[#D49A3D] text-[#1E3A2F] font-extrabold shadow-sm' : 'bg-[#1E3A2F] text-white shadow-sm'
                    : tab.id === 'export' ? 'bg-[#D49A3D]/20 text-[#1E3A2F] border border-[#D49A3D]/50 hover:bg-[#D49A3D]/30' : 'bg-white text-[#5C5247] hover:bg-[#EAE4D9] border border-[#E8E1D5]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Success/Error Alerts */}
        {successMessage && (
          <div className="mx-6 mt-3 p-3 bg-[#34A853]/15 border border-[#34A853]/40 rounded-xl text-[#1E3A2F] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#34A853] flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Main Body */}
        {activeCategory === 'export' ? (
          /* Dedicated Permanent Sync & Export Screen */
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[500px]">
            <div className="p-5 rounded-2xl bg-[#1E3A2F] text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#D49A3D] font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#D49A3D]" />
                  <span>Founder Admin &amp; Photo Persistence Center</span>
                </div>
                <button
                  type="button"
                  onClick={toggleAdminMode}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isAdminMode
                      ? 'bg-[#D49A3D] text-[#1E3A2F]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isAdminMode ? 'Founder Mode: ON (Edit visible)' : 'Founder Mode: OFF (Clean visitor view)'}</span>
                </button>
              </div>
              <p className="text-xs text-[#EAE4D9] leading-relaxed">
                When <strong>Founder Mode</strong> is active in your browser, you will see quick camera badges and photo upload buttons across all cards on the site. When turned off, the website displays in 100% public traveler mode.
              </p>
            </div>

            {/* Live Server Publishing Feature */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#FAF8F5] border-2 border-[#D49A3D]/60 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D49A3D] text-[#1E3A2F] flex items-center justify-center font-bold">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E3A2F]">
                      Publish to Live Server (Visible to All Public Visitors)
                    </h4>
                    <p className="text-xs text-[#5C5247]">
                      Syncs your custom photos directly to the web server so every visitor across the globe sees your real photos.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const result = await publishAllPhotosGlobally();
                    if (result.success) {
                      setSuccessMessage(result.message);
                    } else {
                      setErrorMessage(result.message);
                    }
                    setTimeout(() => {
                      setSuccessMessage('');
                      setErrorMessage('');
                    }, 5000);
                  }}
                  disabled={isPublishingLive}
                  className="px-5 py-3 rounded-xl bg-[#D49A3D] hover:bg-[#B85C38] text-[#1E3A2F] hover:text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isPublishingLive ? 'Publishing Live to Server...' : 'Publish All Photos Now'}</span>
                </button>
              </div>

              {lastPublishedTime && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#2E5445] font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Last successfully published live: {new Date(lastPublishedTime).toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Permanent Storage Explanation & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Export Photo Bundle */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center gap-2 text-[#1E3A2F] font-bold text-sm">
                  <Copy className="w-4 h-4 text-[#D49A3D]" />
                  <span>Export Uploaded Photos Bundle</span>
                </div>
                <p className="text-xs text-[#6B6155] leading-relaxed">
                  Export all your current uploaded pictures (Hindek portrait, Lower Omo Valley, Konso, foods, etc.) in a portable JSON file.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="px-4 py-2.5 bg-[#1E3A2F] hover:bg-[#152B23] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {isExportCopied ? <CheckCircle2 className="w-4 h-4 text-[#34A853]" /> : <Copy className="w-4 h-4 text-[#D49A3D]" />}
                    <span>{isExportCopied ? 'Copied to Clipboard!' : 'Copy Photos JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-[#EAE4D9] border border-[#D5CCC0] text-[#1E3A2F] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#B85C38]" />
                    <span>Download Backup File</span>
                  </button>
                </div>
              </div>

              {/* Box 2: How Permanent Publishing Works */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center gap-2 text-[#1E3A2F] font-bold text-sm">
                  <Globe className="w-4 h-4 text-[#B85C38]" />
                  <span>Why do public visitors see defaults?</span>
                </div>
                <div className="text-xs text-[#6B6155] space-y-1.5 leading-relaxed">
                  <p>
                    <strong>1. Browser Privacy:</strong> Direct uploads from your phone are stored securely inside your browser's private offline database.
                  </p>
                  <p>
                    <strong>2. Cloud / Live Sync:</strong> To show custom photos permanently to every worldwide traveler, paste permanent public image links (e.g. from Cloudinary, Imgur, or your hosting server) using the <em>"Paste Image Link"</em> field.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary of currently saved custom photos */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] space-y-2">
              <div className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider">
                Active Custom Photos in Your Browser: {Object.keys(customPhotos).length + Object.keys(photos).filter(k => photos[k as keyof typeof photos]).length}
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#5C5247]">
                {Object.keys(photos).map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E8E1D5]">
                    👤 Hindek: {k}
                  </span>
                ))}
                {Object.keys(customPhotos).map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-md bg-[#D49A3D]/15 text-[#1E3A2F] border border-[#D49A3D]/30 font-semibold">
                    📸 {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto">
            
            {/* Left Column: List of items in this category */}
            <div className="md:col-span-5 space-y-2 max-h-[360px] md:max-h-[440px] overflow-y-auto pr-1">
              <div className="text-xs font-bold text-[#1E3A2F] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Select Item to Change</span>
                <span className="text-[10px] text-[#8C7E6D] font-normal">{filteredItems.length} items</span>
              </div>

              {/* Quick Destination Shortcut Pills (for quick jump to Omo, Konso, Lalibela, etc.) */}
              {activeCategory === 'destination' && (
                <div className="space-y-1.5 pb-2">
                  <span className="text-[10px] font-bold text-[#D49A3D] uppercase tracking-wider">Quick Direct Selection:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { key: 'dest-omo-valley', label: '📍 Lower Omo Valley' },
                      { key: 'dest-konso-cultural-landscape', label: '📍 Konso Terraces (UNESCO)' },
                      { key: 'dest-lalibela', label: '📍 Lalibela' },
                      { key: 'dest-simien-mountains', label: '📍 Simien Mts' },
                      { key: 'dest-arba-minch-dorze', label: '📍 Arba Minch & Dorze' },
                      { key: 'dest-bale-mountains', label: '📍 Bale Mts' },
                      { key: 'dest-danakil-depression', label: '📍 Danakil' },
                      { key: 'dest-addis-ababa', label: '📍 Addis Ababa' },
                    ].map((dest) => (
                      <button
                        key={dest.key}
                        type="button"
                        onClick={() => {
                          setSelectedKey(dest.key);
                          setSearchQuery('');
                        }}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                          selectedKey === dest.key
                            ? 'bg-[#1E3A2F] text-[#D49A3D] border-[#1E3A2F] shadow-sm'
                            : 'bg-white text-[#4A3E31] border-[#E8E1D5] hover:border-[#1E3A2F]'
                        }`}
                      >
                        {dest.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Search inside Category */}
              {activeCategory !== 'founder' && (
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder={`Search ${activeCategory}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#D5CCC0] focus:outline-none focus:ring-1 focus:ring-[#1E3A2F]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#8C7E6D] absolute left-2.5 top-2" />
                </div>
              )}

              {filteredItems.map((item) => {
                const isSelected = selectedKey === item.key;
                const hasCustom = hasCustomPhoto(item.key);
                return (
                  <button
                    key={item.key}
                    onClick={() => setSelectedKey(item.key)}
                    className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E3A2F] text-white border-[#1E3A2F] shadow-md'
                        : 'bg-[#FAF8F5] text-[#2E2822] hover:bg-[#F3EFEA] border-[#E8E1D5]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/10 flex-shrink-0 border border-white/20 relative">
                      <img
                        src={(item as any).current || (item as any).defaultSrc}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {hasCustom && (
                        <div className="absolute top-0 right-0 bg-[#34A853] text-white p-0.5 rounded-bl">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#1E3A2F]'}`}>
                        {item.title}
                      </div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-[#E5AC4D]' : 'text-[#7A7063]'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Upload controls & Live Preview */}
            <div className="md:col-span-7 flex flex-col space-y-4">
              
              {/* Live Preview Card */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] flex items-center gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black/10 border-2 border-[#1E3A2F]/20 shadow-inner flex-shrink-0 relative">
                  <img
                    src={previewSource}
                    alt={currentSelectedItem?.title || 'Preview'}
                    className="w-full h-full object-cover"
                  />
                  {isCurrentCustom && (
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#1E3A2F] text-[#D49A3D] text-[9px] font-bold">
                      Active
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D49A3D] px-2 py-0.5 rounded-md bg-[#D49A3D]/10 inline-block">
                    Selected Target
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#1E3A2F] leading-tight">
                    {currentSelectedItem?.title}
                  </h4>
                  <p className="text-xs text-[#6B6155] line-clamp-2">
                    {currentSelectedItem?.subtitle}
                  </p>
                  {hasCustomPhoto(selectedKey) && (
                    <button
                      onClick={handleResetCurrent}
                      className="mt-1 text-[11px] text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Reset this photo to default</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Zone 1: File from Phone / Computer with Drag & Drop */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 ${
                  isDragging 
                    ? 'border-[#1E3A2F] bg-[#1E3A2F]/10 scale-102' 
                    : 'border-[#D49A3D]/60 hover:border-[#1E3A2F] bg-white'
                }`}
              >
                <input
                  ref={fileInputRef}
                  id="photo-modal-file-input"
                  type="file"
                  accept="image/*,.heic,.heif,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-12 h-12 mx-auto rounded-full bg-[#1E3A2F]/10 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 text-[#1E3A2F]" />
                </div>

                <div className="space-y-1">
                  <h5 className="text-xs sm:text-sm font-bold text-[#1E3A2F]">
                    {isDragging ? 'Drop photo here to upload' : 'Upload from your Device or Drag & Drop'}
                  </h5>
                  <p className="text-[11px] text-[#7A7063]">
                    Select any photo from your phone camera roll or computer files.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="photo-modal-file-input"
                    className="px-6 py-3 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-95 disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-[#D49A3D]" />
                    <span>{isProcessing ? 'Saving Photo...' : 'Browse Image File'}</span>
                  </label>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsGuideOpen(true)}
                    className="text-[11px] text-[#B85C38] hover:text-[#8E4426] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How to upload? Formats &amp; authenticity requirements</span>
                  </button>
                </div>
              </div>

              {/* Upload Zone 2: Direct Image URL */}
              <form onSubmit={handleUrlSubmit} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A2F]">
                  <ImageIcon className="w-3.5 h-3.5 text-[#B85C38]" />
                  <span>Or Paste Image Link (URL)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/my-photo.jpg"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F] bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D49A3D] hover:bg-[#b8822d] text-[#1E3A2F] font-bold text-xs rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Save URL
                  </button>
                </div>
              </form>

              {/* Founder Bulk Actions */}
              {activeCategory === 'founder' && (
                <div className="pt-2 border-t border-[#E8E1D5] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleApplyFounderToAll}
                    className="text-xs font-bold text-[#1E3A2F] hover:text-[#B85C38] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Apply this photo to ALL Hindek profiles</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E8E1D5] flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all custom uploaded photos back to original defaults?')) {
                resetAllCustomPhotos();
                setSuccessMessage('Reset all photos to default.');
                setTimeout(() => setSuccessMessage(''), 3000);
              }
            }}
            className="text-xs text-[#8C7E6D] hover:text-red-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>

          <button
            type="button"
            onClick={closeUploadModal}
            className="px-6 py-2.5 rounded-xl bg-[#1E3A2F] text-white font-bold text-xs shadow hover:bg-[#152B23] transition-all cursor-pointer"
          >
            Done & Close
          </button>
        </div>

      </div>

      {/* Embedded Photo Guide & Authenticity Modal */}
      <PhotoGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onOpenUploadModal={() => setIsGuideOpen(false)}
      />
    </div>
  );
};
