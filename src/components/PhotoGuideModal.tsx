import React from 'react';
import { 
  X, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  HelpCircle, 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  Maximize2, 
  Image as ImageIcon,
  ArrowRight,
  SunMedium
} from 'lucide-react';

interface PhotoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUploadModal?: () => void;
}

export const PhotoGuideModal: React.FC<PhotoGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenUploadModal,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-guide-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 text-[#2E2822]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#1E3A2F] text-white flex items-center justify-between border-b border-[#2E5445] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D49A3D]/20 border border-[#D49A3D]/40 flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#D49A3D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="photo-guide-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  How to Upload Real Photos
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D49A3D] text-[#1E3A2F] text-[10px] font-extrabold uppercase">
                  Authenticity Guide
                </span>
              </div>
              <p className="text-xs text-[#E5AC4D]">
                Guidelines on formats, dimensions, naming, and keeping Bridge Ethiopia 100% authentic.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto text-xs sm:text-sm leading-relaxed">
          
          {/* Section 1: The Core Mission */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-2">
            <div className="flex items-center gap-2 text-[#1E3A2F] font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-[#D49A3D]" />
              <span>Why Real, Authentic Photos Matter</span>
            </div>
            <p className="text-[#5C5247] leading-relaxed">
              Bridge Ethiopia is built on genuine cultural connections and true local hospitality. We celebrate real moments — from Hindek&apos;s home cooking sessions and traditional coffee ceremonies to vibrant regional festivals and untamed landscapes. High-quality real photos build trust with international travelers.
            </p>
          </div>

          {/* Section 2: Step-by-Step How to Upload */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center text-xs">1</span>
              <span>4 Simple Steps to Upload</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1 shadow-2xs">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#D49A3D] font-extrabold">Step 1:</span> Choose the Target
                </div>
                <p className="text-[#6B6155] text-xs">
                  Open the Photo Manager and pick the section: <strong>Hindek Profile, Destinations, Traditional Foods, Festivals, Tours</strong>, or <strong>Lodges</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1 shadow-2xs">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#D49A3D] font-extrabold">Step 2:</span> Select Your File
                </div>
                <p className="text-[#6B6155] text-xs">
                  Click <strong>&ldquo;Browse Image File&rdquo;</strong> to pick from your phone camera roll or computer, drag &amp; drop an image, or paste an image URL.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1 shadow-2xs">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#D49A3D] font-extrabold">Step 3:</span> Auto-Optimization
                </div>
                <p className="text-[#6B6155] text-xs">
                  Our system automatically balances high sharpness with web compression so the website stays lightning fast on mobile and desktop.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1 shadow-2xs">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#D49A3D] font-extrabold">Step 4:</span> Instant Auto-Save
                </div>
                <p className="text-[#6B6155] text-xs">
                  Your photo is safely saved to persistent browser storage. It displays across the entire site immediately and stays saved across reloads.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Formats & Image Specifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center text-xs">2</span>
              <span>Format &amp; Size Specifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3A2F] text-xs">
                  <FileCheck className="w-4 h-4 text-[#34A853]" />
                  <span>Accepted Formats</span>
                </div>
                <p className="text-xs text-[#5C5247]">
                  <strong>JPEG (.jpg, .jpeg)</strong>, <strong>PNG (.png)</strong>, and <strong>WebP (.webp)</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3A2F] text-xs">
                  <Maximize2 className="w-4 h-4 text-[#D49A3D]" />
                  <span>Recommended Sizes</span>
                </div>
                <p className="text-xs text-[#5C5247]">
                  <strong>Landscape (Destinations / Banners)</strong>: 1200×800px or larger (16:9 / 3:2).<br />
                  <strong>Portraits (Founder / People)</strong>: 800×1000px (3:4).<br />
                  <strong>Dishes &amp; Avatars</strong>: 600×600px (1:1).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1E3A2F] text-xs">
                  <Smartphone className="w-4 h-4 text-[#B85C38]" />
                  <span>File Weight</span>
                </div>
                <p className="text-xs text-[#5C5247]">
                  Up to <strong>15 MB</strong> per file. The uploader optimizes the image automatically upon upload.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Recommended Naming Conventions */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center text-xs">3</span>
              <span>Photo Naming Best Practices</span>
            </h3>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] space-y-3">
              <p className="text-xs text-[#5C5247]">
                When saving photos on your device before uploading, use clear, descriptive lowercase names with underscores or hyphens. This makes it effortless to manage:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#34A853]">✓</span>
                  <span>hindek_founder_portrait.jpg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#34A853]">✓</span>
                  <span>lalibela_bet_giyorgis_sunset.jpg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#34A853]">✓</span>
                  <span>doro_wat_traditional_feast.jpg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-[#1E3A2F] flex items-center gap-2">
                  <span className="text-[#34A853]">✓</span>
                  <span>irreecha_festival_hora_arsadi.jpg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Photography & Cultural Tips */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1E3A2F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center text-xs">4</span>
              <span>Authenticity &amp; Photography Tips</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-1.5">
                  <SunMedium className="w-4 h-4 text-[#D49A3D]" />
                  <span>Natural Warm Lighting</span>
                </div>
                <p className="text-[#6B6155]">
                  Ethiopian sunlight and morning golden hours highlight the rich clay of Jebena pots, golden berbere spices, and the dramatic rift valley cliffs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E1D5] space-y-1.5">
                <div className="font-bold text-[#1E3A2F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                  <span>Respectful Community Representation</span>
                </div>
                <p className="text-[#6B6155]">
                  Ensure cultural events, elders, and community artisans are captured respectfully with dignity and pride.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E8E1D5] flex items-center justify-between flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C5247] hover:text-[#1E3A2F] hover:bg-[#EAE4D9] transition-colors cursor-pointer"
          >
            Close Guide
          </button>

          {onOpenUploadModal && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenUploadModal();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-xs shadow-md inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-[#D49A3D]" />
              <span>Open Photo Uploader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
