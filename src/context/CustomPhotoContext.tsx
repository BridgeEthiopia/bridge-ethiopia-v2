import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import defaultSquare from '../assets/images/hindek_real_photo_square.jpg';
import defaultPortrait from '../assets/images/hindek_real_photo_portrait.jpg';
import { 
  idbGet, 
  idbSet, 
  idbClear, 
  safeLocalStorageSet, 
  safeLocalStorageRemove 
} from '../utils/photoStorage';

export interface FounderPhotos {
  portrait: string;       // About story (vertical)
  heroAvatar: string;     // Hero section guarantee
  kitchenAvatar: string;  // Cooking class section
  coffeeAvatar: string;   // Coffee ceremony
  contactAvatar: string;  // Contact consultation
  actionPhoto: string;    // Guiding / in nature
}

export interface UploadTargetInfo {
  key: string;
  title: string;
  category: 'founder' | 'destination' | 'food' | 'festival' | 'hotel' | 'tour' | 'general';
  currentSrc?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

interface CustomPhotoContextType {
  // Founder photos for backward compatibility
  photos: FounderPhotos;
  updatePhoto: (key: keyof FounderPhotos, dataUrlOrPath: string) => void;
  updateAllPhotos: (dataUrlOrPath: string) => void;
  resetToDefault: () => void;
  
  // Universal photo store
  customPhotos: Record<string, string>;
  setCustomPhoto: (key: string, dataUrl: string) => void;
  removeCustomPhoto: (key: string) => void;
  getCustomPhoto: (key: string, fallback?: string) => string;
  hasCustomPhoto: (key: string) => boolean;
  resetAllCustomPhotos: () => void;

  // Universal Modal State
  isUploadModalOpen: boolean;
  activeTarget: UploadTargetInfo;
  openUploadModal: (target?: Partial<UploadTargetInfo> | (keyof FounderPhotos)) => void;
  closeUploadModal: () => void;
  activeUploadKey: keyof FounderPhotos; // for backward compatibility
  setActiveUploadKey: (key: keyof FounderPhotos) => void;

  // Admin Mode Controls (Hides upload buttons from public visitors)
  isAdminMode: boolean;
  setIsAdminMode: (active: boolean) => void;
  toggleAdminMode: () => void;

  // Founder Security & PIN Authentication (Only Hindek can upload)
  isPinModalOpen: boolean;
  openPinModal: () => void;
  closePinModal: () => void;
  verifyPin: (pin: string) => Promise<{ success: boolean; message: string }>;
  logoutFounder: () => void;

  // Global Live Publishing to Server
  publishAllPhotosGlobally: () => Promise<{ success: boolean; message: string }>;
  isPublishingLive: boolean;
  lastPublishedTime: string | null;
  syncStatus: 'synced' | 'local_only' | 'syncing' | 'error';
}

const STORAGE_KEY_FOUNDER = 'bridge_ethiopia_founder_photos_v7';
const STORAGE_KEY_CUSTOM_MAP = 'bridge_ethiopia_custom_photos_map_v7';
const IDB_KEY_FOUNDER = 'founder_photos_store_v7';
const IDB_KEY_CUSTOM_MAP = 'custom_photos_map_store_v7';

const defaultFounderPhotos: FounderPhotos = {
  portrait: defaultPortrait,
  heroAvatar: defaultSquare,
  kitchenAvatar: defaultSquare,
  coffeeAvatar: defaultSquare,
  contactAvatar: defaultSquare,
  actionPhoto: defaultPortrait,
};

const CustomPhotoContext = createContext<CustomPhotoContextType | undefined>(undefined);

// Helper function to compress and optimize images before storing
export const compressImage = (
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
    };
    reader.onerror = (error) => reject(error);
  });
};

export const CustomPhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Founder photos state - initialized with cached localStorage if available
  const [photos, setPhotos] = useState<FounderPhotos>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FOUNDER);
      if (saved) {
        return { ...defaultFounderPhotos, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return defaultFounderPhotos;
  });

  // Universal custom photos map
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_MAP);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }
    return {};
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<UploadTargetInfo>({
    key: 'portrait',
    title: 'Founder Hindek Photo',
    category: 'founder',
    aspectRatio: 'portrait'
  });

  const [activeUploadKey, setActiveUploadKey] = useState<keyof FounderPhotos>('portrait');
  const [pendingTarget, setPendingTarget] = useState<Partial<UploadTargetInfo> | (keyof FounderPhotos) | null>(null);

  // Founder PIN Security Modal State
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  
  // Admin Mode: strictly defaults to false so public visitors see a clean presentation
  const [isAdminMode, setIsAdminModeState] = useState<boolean>(() => {
    try {
      const pin = sessionStorage.getItem('bridge_ethiopia_founder_pin') || localStorage.getItem('bridge_ethiopia_founder_pin');
      return !!pin && (pin === '2519' || pin.length > 0);
    } catch {
      return false;
    }
  });

  const getFounderPin = (): string => {
    try {
      return sessionStorage.getItem('bridge_ethiopia_founder_pin') || localStorage.getItem('bridge_ethiopia_founder_pin') || '2519';
    } catch {
      return '2519';
    }
  };

  const setIsAdminMode = (active: boolean) => {
    setIsAdminModeState(active);
    try {
      localStorage.setItem('bridge_ethiopia_admin_mode', active ? 'true' : 'false');
    } catch {}
  };

  const openPinModal = () => {
    setIsPinModalOpen(true);
  };

  const closePinModal = () => {
    setIsPinModalOpen(false);
  };

  const verifyPin = async (pin: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/founder/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminModeState(true);
        try {
          sessionStorage.setItem('bridge_ethiopia_founder_pin', pin);
          localStorage.setItem('bridge_ethiopia_founder_pin', pin);
          localStorage.setItem('bridge_ethiopia_admin_mode', 'true');
        } catch {}
        return { success: true, message: 'Founder authenticated successfully.' };
      } else {
        return { success: false, message: data.error || 'Incorrect PIN.' };
      }
    } catch {
      // Fallback offline verification for founder PIN
      if (pin === '2519') {
        setIsAdminModeState(true);
        try {
          sessionStorage.setItem('bridge_ethiopia_founder_pin', pin);
          localStorage.setItem('bridge_ethiopia_founder_pin', pin);
          localStorage.setItem('bridge_ethiopia_admin_mode', 'true');
        } catch {}
        return { success: true, message: 'Founder authenticated.' };
      }
      return { success: false, message: 'Incorrect PIN. Only founder Hindek can upload photos.' };
    }
  };

  const logoutFounder = () => {
    setIsAdminModeState(false);
    try {
      sessionStorage.removeItem('bridge_ethiopia_founder_pin');
      localStorage.removeItem('bridge_ethiopia_founder_pin');
      localStorage.removeItem('bridge_ethiopia_admin_mode');
    } catch {}
    setIsUploadModalOpen(false);
  };

  const toggleAdminMode = () => {
    if (isAdminMode) {
      logoutFounder();
    } else {
      openPinModal();
    }
  };

  // Track whether initial storage load from IndexedDB has completed to prevent mount overwrites
  const isStorageReady = useRef(false);

  // Cloud / Global Publishing state
  const [isPublishingLive, setIsPublishingLive] = useState(false);
  const [lastPublishedTime, setLastPublishedTime] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'local_only' | 'syncing' | 'error'>('local_only');

  // Helper to sync photos to server in background
  const syncToServerBackground = async (payload: { founderPhotos?: FounderPhotos | Record<string, string>; customPhotos?: Record<string, string> }) => {
    if (!isAdminMode) return; // Only sync if logged in as founder
    try {
      const res = await fetch('/api/publish-photos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-founder-pin': getFounderPin()
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.lastUpdated) setLastPublishedTime(data.lastUpdated);
        setSyncStatus('synced');
      }
    } catch (e) {
      console.warn('Background sync note:', e);
    }
  };

  // Manual Publish to All Visitors
  const publishAllPhotosGlobally = async (): Promise<{ success: boolean; message: string }> => {
    setIsPublishingLive(true);
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/publish-photos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-founder-pin': getFounderPin()
        },
        body: JSON.stringify({
          founderPhotos: photos,
          customPhotos: customPhotos,
        }),
      });
      const json = await res.json();
      setIsPublishingLive(false);
      if (json.success) {
        setLastPublishedTime(json.lastUpdated || new Date().toISOString());
        setSyncStatus('synced');
        return { success: true, message: 'All photos published live to everyone worldwide!' };
      }
      return { success: false, message: json.error || 'Failed to publish live' };
    } catch (err: any) {
      setIsPublishingLive(false);
      setSyncStatus('error');
      return { success: false, message: err.message || 'Network error during publish' };
    }
  };

  // On mount: Load from Server first (for global visitors), then IndexedDB
  useEffect(() => {
    let isMounted = true;

    async function initStorage() {
      try {
        // Purge legacy obsolete storage keys so user's browser updates to latest bundled master photos
        try {
          ['bridge_ethiopia_founder_photos', 'bridge_ethiopia_founder_photos_v2', 'bridge_ethiopia_founder_photos_v3', 'bridge_ethiopia_founder_photos_v4', 'bridge_ethiopia_founder_photos_v5', 'bridge_ethiopia_founder_photos_v6', 'bridge_ethiopia_custom_photos_map_v1', 'bridge_ethiopia_custom_photos_map_v6'].forEach(k => {
            localStorage.removeItem(k);
          });
        } catch {}

        // 1. Fetch any globally published photos from the server if running with server backend
        try {
          const serverRes = await fetch('/api/published-photos');
          if (serverRes.ok) {
            const serverData = await serverRes.json();
            if (serverData.success && serverData.data && isMounted) {
              const { founderPhotos: sFounder, customPhotos: sCustom, lastUpdated } = serverData.data;
              if (sFounder && Object.keys(sFounder).length > 0) {
                setPhotos(prev => ({ ...prev, ...sFounder }));
              }
              if (sCustom && Object.keys(sCustom).length > 0) {
                setCustomPhotos(prev => ({ ...prev, ...sCustom }));
              }
              if (lastUpdated) setLastPublishedTime(lastUpdated);
            }
          }
        } catch (serverErr) {
          // Fall through to local storage
        }

        // 2. Load founder photos from IndexedDB
        const idbFounder = await idbGet<FounderPhotos>(IDB_KEY_FOUNDER);
        if (idbFounder && isMounted) {
          setPhotos(prev => ({ ...prev, ...idbFounder }));
        }

        // 3. Load custom photos map from IndexedDB
        const idbCustom = await idbGet<Record<string, string>>(IDB_KEY_CUSTOM_MAP);
        if (idbCustom && isMounted) {
          setCustomPhotos(prev => ({ ...prev, ...idbCustom }));
        }

        // 4. Mark storage as ready after loading existing data
        isStorageReady.current = true;

        // 5. Automatically push local uploads to server so they become globally available
        if (idbFounder || idbCustom) {
          syncToServerBackground({
            founderPhotos: idbFounder || undefined,
            customPhotos: idbCustom || undefined,
          });
        }
        setSyncStatus('synced');
      } catch (err) {
        console.warn('[CustomPhotoContext] Initial storage sync completed with fallback.', err);
        isStorageReady.current = true;
      }
    }

    initStorage();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save founder photos to IndexedDB & sync to server
  useEffect(() => {
    if (!isStorageReady.current) return;
    idbSet(IDB_KEY_FOUNDER, photos).catch(() => {});
    try {
      safeLocalStorageSet(STORAGE_KEY_FOUNDER, JSON.stringify(photos));
    } catch {
      // Ignore
    }
    // Background publish to server
    fetch('/api/publish-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ founderPhotos: photos }),
    }).catch(() => {});
  }, [photos]);

  // Save custom photos map to IndexedDB & sync to server
  useEffect(() => {
    if (!isStorageReady.current) return;
    idbSet(IDB_KEY_CUSTOM_MAP, customPhotos).catch(() => {});
    try {
      safeLocalStorageSet(STORAGE_KEY_CUSTOM_MAP, JSON.stringify(customPhotos));
    } catch {
      // Ignore
    }
    // Background publish to server
    fetch('/api/publish-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customPhotos: customPhotos }),
    }).catch(() => {});
  }, [customPhotos]);

  const updatePhoto = (key: keyof FounderPhotos, dataUrlOrPath: string) => {
    setPhotos((prev) => {
      const updated = {
        ...prev,
        [key]: dataUrlOrPath,
      };
      // Direct immediate persistence
      idbSet(IDB_KEY_FOUNDER, updated).catch(() => {});
      try {
        safeLocalStorageSet(STORAGE_KEY_FOUNDER, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateAllPhotos = (dataUrlOrPath: string) => {
    const updated: FounderPhotos = {
      portrait: dataUrlOrPath,
      heroAvatar: dataUrlOrPath,
      kitchenAvatar: dataUrlOrPath,
      coffeeAvatar: dataUrlOrPath,
      contactAvatar: dataUrlOrPath,
      actionPhoto: dataUrlOrPath,
    };
    setPhotos(updated);
    idbSet(IDB_KEY_FOUNDER, updated).catch(() => {});
    try {
      safeLocalStorageSet(STORAGE_KEY_FOUNDER, JSON.stringify(updated));
    } catch {}
  };

  const resetToDefault = () => {
    setPhotos(defaultFounderPhotos);
    idbSet(IDB_KEY_FOUNDER, defaultFounderPhotos).catch(() => {});
    safeLocalStorageRemove(STORAGE_KEY_FOUNDER);
  };

  const setCustomPhoto = (key: string, dataUrl: string) => {
    setCustomPhotos((prev) => {
      const updated = {
        ...prev,
        [key]: dataUrl,
      };
      // Direct immediate persistence
      idbSet(IDB_KEY_CUSTOM_MAP, updated).catch(() => {});
      try {
        safeLocalStorageSet(STORAGE_KEY_CUSTOM_MAP, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeCustomPhoto = (key: string) => {
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[key];
      idbSet(IDB_KEY_CUSTOM_MAP, next).catch(() => {});
      try {
        safeLocalStorageSet(STORAGE_KEY_CUSTOM_MAP, JSON.stringify(next));
      } catch {} 
      return next;
    });
  };

  const getCustomPhoto = (key: string, fallback?: string): string => {
    if (customPhotos[key]) return customPhotos[key];
    // Check if key is a founder key
    if (key in photos) {
      return (photos as any)[key] || fallback || '';
    }
    return fallback || '';
  };

  const hasCustomPhoto = (key: string): boolean => {
    return Boolean(customPhotos[key]);
  };

  const resetAllCustomPhotos = () => {
    setCustomPhotos({});
    idbClear().catch(() => {});
    safeLocalStorageRemove(STORAGE_KEY_CUSTOM_MAP);
    resetToDefault();
  };

  const openUploadModal = (target?: Partial<UploadTargetInfo> | (keyof FounderPhotos)) => {
    // If not authenticated as Founder, open PIN modal instead of upload modal
    if (!isAdminMode) {
      if (target) {
        setPendingTarget(target);
      }
      setIsPinModalOpen(true);
      return;
    }

    if (typeof target === 'string') {
      setActiveUploadKey(target);
      setActiveTarget({
        key: target,
        title: `Hindek (${target})`,
        category: 'founder',
        aspectRatio: target === 'portrait' || target === 'actionPhoto' ? 'portrait' : 'square',
      });
    } else if (target && typeof target === 'object') {
      const fullTarget: UploadTargetInfo = {
        key: target.key || 'portrait',
        title: target.title || 'Photo Slot',
        category: target.category || 'general',
        currentSrc: target.currentSrc,
        aspectRatio: target.aspectRatio || 'landscape',
      };
      setActiveTarget(fullTarget);
      if (['portrait', 'heroAvatar', 'kitchenAvatar', 'coffeeAvatar', 'contactAvatar', 'actionPhoto'].includes(fullTarget.key)) {
        setActiveUploadKey(fullTarget.key as keyof FounderPhotos);
      }
    } else {
      setActiveTarget({
        key: 'portrait',
        title: 'Founder Hindek Photo',
        category: 'founder',
        aspectRatio: 'portrait'
      });
    }
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <CustomPhotoContext.Provider
      value={{
        photos,
        updatePhoto,
        updateAllPhotos,
        resetToDefault,
        customPhotos,
        setCustomPhoto,
        removeCustomPhoto,
        getCustomPhoto,
        hasCustomPhoto,
        resetAllCustomPhotos,
        isUploadModalOpen,
        activeTarget,
        openUploadModal,
        closeUploadModal,
        activeUploadKey,
        setActiveUploadKey,
        isAdminMode,
        setIsAdminMode,
        toggleAdminMode,
        isPinModalOpen,
        openPinModal,
        closePinModal,
        verifyPin,
        logoutFounder,
        publishAllPhotosGlobally,
        isPublishingLive,
        lastPublishedTime,
        syncStatus,
      }}
    >
      {children}
    </CustomPhotoContext.Provider>
  );
};

export const useCustomPhotoContext = (): CustomPhotoContextType => {
  const context = useContext(CustomPhotoContext);
  if (!context) {
    throw new Error('useCustomPhotoContext must be used within a CustomPhotoProvider');
  }
  return context;
};

// Hook for accessing/overriding a specific image
export const useSitePhoto = (photoKey?: string, fallbackUrl?: string) => {
  const { customPhotos, getCustomPhoto, hasCustomPhoto, openUploadModal } = useCustomPhotoContext();
  
  const currentUrl = photoKey ? getCustomPhoto(photoKey, fallbackUrl) : (fallbackUrl || '');
  const isCustom = photoKey ? hasCustomPhoto(photoKey) : false;

  const triggerUpload = (title?: string, category: UploadTargetInfo['category'] = 'general') => {
    if (!photoKey) return;
    openUploadModal({
      key: photoKey,
      title: title || photoKey,
      category,
      currentSrc: currentUrl
    });
  };

  return {
    src: currentUrl,
    isCustom,
    triggerUpload
  };
};

// Backward compatibility alias for FounderPhotoProvider
export const FounderPhotoProvider = CustomPhotoProvider;
export const useFounderPhoto = useCustomPhotoContext;
