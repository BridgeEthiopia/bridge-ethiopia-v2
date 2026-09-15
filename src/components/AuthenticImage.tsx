import React, { useState } from 'react';
import { Camera, ImageOff, ShieldCheck, Check, UploadCloud } from 'lucide-react';
import { useCustomPhotoContext, UploadTargetInfo } from '../context/CustomPhotoContext';

interface AuthenticImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  subjectName?: string;
  isPlaceholder?: boolean;
  photoKey?: string;
  photoCategory?: 'founder' | 'destination' | 'food' | 'festival' | 'hotel' | 'tour' | 'general';
  allowUpload?: boolean;
}

export const AuthenticImage: React.FC<AuthenticImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full relative group/img',
  subjectName,
  isPlaceholder = false,
  photoKey,
  photoCategory = 'general',
  allowUpload = true,
}) => {
  const { getCustomPhoto, hasCustomPhoto, openUploadModal, isAdminMode } = useCustomPhotoContext();
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const displaySrc = photoKey ? getCustomPhoto(photoKey, src) : src;
  const isCustom = photoKey ? hasCustomPhoto(photoKey) : false;
  const showPlaceholder = isPlaceholder || !displaySrc || hasError;
  const canUpload = allowUpload && isAdminMode;

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (photoKey) {
      openUploadModal({
        key: photoKey,
        title: subjectName || alt || 'Photo Slot',
        category: photoCategory as UploadTargetInfo['category'],
        currentSrc: displaySrc,
      });
    } else {
      openUploadModal({
        key: `custom_${alt.replace(/\s+/g, '_').toLowerCase()}`,
        title: subjectName || alt || 'Photo Slot',
        category: photoCategory as UploadTargetInfo['category'],
        currentSrc: displaySrc,
      });
    }
  };

  if (showPlaceholder) {
    return (
      <div
        className={`w-full h-full min-h-[160px] bg-gradient-to-br from-[#2E2822] to-[#1E1B18] flex flex-col items-center justify-center p-4 text-center select-none ${containerClassName}`}
      >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 border border-white/15">
          <Camera className="w-5 h-5 text-[#D49A3D]" />
        </div>
        <span className="text-xs font-bold text-white tracking-wide line-clamp-1 mb-0.5">
          {subjectName || alt || 'Photo Slot'}
        </span>
        <span className="text-[10px] text-[#D49A3D] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#D49A3D]/10 border border-[#D49A3D]/30 inline-block mb-1.5">
          {isCustom ? 'Authentic Photo' : 'Scenic Ethiopian Heritage'}
        </span>
        {canUpload && (
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-1 px-3 py-1 rounded-lg bg-[#D49A3D] hover:bg-[#b8822d] text-[#1E3A2F] font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Real Photo</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group/img ${containerClassName}`}>
      <img
        src={displaySrc}
        alt={alt}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#2E2822]/40 animate-pulse flex items-center justify-center">
          <Camera className="w-5 h-5 text-white/40" />
        </div>
      )}

      {/* Upload button overlay (visible only in Founder Admin Mode) */}
      {canUpload && (
        <div className="absolute top-3 right-3 z-20 opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleUploadClick}
            title="Upload your own real photo for this item (Admin Only)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 hover:bg-[#1E3A2F] text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-lg transition-all active:scale-95 hover:border-[#D49A3D]"
          >
            <Camera className="w-3.5 h-3.5 text-[#D49A3D]" />
            <span>{isCustom ? 'Change Photo' : 'Upload Photo'}</span>
          </button>
        </div>
      )}

      {/* Badge when custom real photo is active */}
      {isCustom && (
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E3A2F]/90 backdrop-blur-sm text-[#D49A3D] text-[10px] font-bold border border-[#D49A3D]/40 shadow-sm">
            <Check className="w-3 h-3 text-[#34A853]" />
            <span>Real Photo</span>
          </span>
        </div>
      )}
    </div>
  );
};
