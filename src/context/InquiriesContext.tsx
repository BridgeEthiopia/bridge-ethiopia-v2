import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FOUNDER_INFO } from '../data/ethiopiaData';

export interface BookingInquiry {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceOrEvent: string;
  destination?: string;
  date?: string;
  numberOfGuests?: number;
  specialRequests?: string;
  type: 'booking' | 'custom-trip' | 'inquiry' | 'community-support' | 'ngo-guidance';
  status: 'new' | 'contacted' | 'confirmed' | 'archived';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  inquiry: BookingInquiry;
}

interface InquiriesContextType {
  inquiries: BookingInquiry[];
  unreadCount: number;
  addInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => BookingInquiry;
  updateInquiryStatus: (id: string, status: BookingInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;
  markAllAsRead: () => void;
  
  // Real-time Active Toast Notifications
  activeToasts: AppNotification[];
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  
  // Inbox Modal State
  isInboxOpen: boolean;
  openInbox: () => void;
  closeInbox: () => void;
  
  // Admin Contact Credentials Configuration
  adminEmail: string;
  adminPhone: string;
  adminWhatsapp: string;
  updateAdminContact: (email: string, phone: string, whatsapp: string) => void;
  
  // Demo simulation
  triggerSampleInquiry: () => void;
}

const STORAGE_KEY_INQUIRIES = 'bridge_ethiopia_inquiries_store_v1';
const STORAGE_KEY_ADMIN_CONTACT = 'bridge_ethiopia_admin_contact_v1';
const BROADCAST_CHANNEL_NAME = 'bridge_ethiopia_realtime_channel';

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

// Web Audio API Chime generator
function playNotificationChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // First tone (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second chime tone (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0.22, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.7);
  } catch {
    // Autoplay policy or unsupported audio environment
  }
}

export const InquiriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CONTACT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) return parsed.email;
      }
    } catch {}
    return FOUNDER_INFO.email;
  });

  const [adminPhone, setAdminPhone] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CONTACT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phone) return parsed.phone;
      }
    } catch {}
    return FOUNDER_INFO.phone;
  });

  const [adminWhatsapp, setAdminWhatsapp] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_CONTACT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.whatsapp) return parsed.whatsapp;
      }
    } catch {}
    return FOUNDER_INFO.whatsapp;
  });

  const [activeToasts, setActiveToasts] = useState<AppNotification[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  // Sync admin contact credentials
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_ADMIN_CONTACT,
        JSON.stringify({ email: adminEmail, phone: adminPhone, whatsapp: adminWhatsapp })
      );
    } catch {}
  }, [adminEmail, adminPhone, adminWhatsapp]);

  // Real-time cross-tab listener via BroadcastChannel
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data?.type === 'NEW_INQUIRY') {
            const incomingInq: BookingInquiry = event.data.inquiry;
            setInquiries((prev) => {
              if (prev.some((i) => i.id === incomingInq.id)) return prev;
              return [incomingInq, ...prev];
            });

            // Trigger real-time toast alert & sound on this tab
            const toastObj: AppNotification = {
              id: 'toast-' + Date.now(),
              title: `New Inquiry from ${incomingInq.fullName}`,
              message: `${incomingInq.serviceOrEvent} (${incomingInq.numberOfGuests || 1} guests)`,
              timestamp: new Date().toISOString(),
              inquiry: incomingInq,
            };
            setActiveToasts((prev) => [toastObj, ...prev.slice(0, 3)]);
            playNotificationChimeSound();
          }
        };
      }
    } catch {}

    return () => {
      if (channel) channel.close();
    };
  }, []);

  const addInquiry = useCallback(
    (inquiryData: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
      const newInquiry: BookingInquiry = {
        ...inquiryData,
        id: 'inq-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      setInquiries((prev) => [newInquiry, ...prev]);

      // Broadcast to other open browser tabs
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
          channel.postMessage({ type: 'NEW_INQUIRY', inquiry: newInquiry });
          channel.close();
        }
      } catch {}

      // Trigger immediate on-screen notification & chime
      const toastObj: AppNotification = {
        id: 'toast-' + Date.now(),
        title: `Confirmed: Request from ${newInquiry.fullName}`,
        message: `${newInquiry.serviceOrEvent} • Added to Admin Inbox`,
        timestamp: new Date().toISOString(),
        inquiry: newInquiry,
      };
      setActiveToasts((prev) => [toastObj, ...prev.slice(0, 3)]);
      playNotificationChimeSound();

      return newInquiry;
    },
    []
  );

  const dismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAllToasts = () => {
    setActiveToasts([]);
  };

  const updateInquiryStatus = (id: string, status: BookingInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllInquiries = () => {
    setInquiries([]);
  };

  const markAllAsRead = () => {
    setInquiries((prev) =>
      prev.map((item) => ({ ...item, status: 'contacted' as const }))
    );
  };

  const updateAdminContact = (email: string, phone: string, whatsapp: string) => {
    setAdminEmail(email);
    setAdminPhone(phone);
    setAdminWhatsapp(whatsapp);
  };

  const triggerSampleInquiry = () => {
    addInquiry({
      fullName: 'Sarah & David Jenkins',
      email: 'sarah.jenkins@traveler.com',
      phone: '+44 7700 900123',
      serviceOrEvent: 'Hindek Kitchen: Traditional Ethiopian Cooking Class & Feast',
      destination: 'Addis Ababa (Hindek Private Home Kitchen)',
      date: 'Next Saturday (3:00 PM)',
      numberOfGuests: 2,
      specialRequests: 'Would love to learn authentic Shiro and fresh Teff Injera baking!',
      type: 'booking',
    });
  };

  const unreadCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <InquiriesContext.Provider
      value={{
        inquiries,
        unreadCount,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        clearAllInquiries,
        markAllAsRead,
        activeToasts,
        dismissToast,
        clearAllToasts,
        isInboxOpen,
        openInbox: () => setIsInboxOpen(true),
        closeInbox: () => setIsInboxOpen(false),
        adminEmail,
        adminPhone,
        adminWhatsapp,
        updateAdminContact,
        triggerSampleInquiry,
      }}
    >
      {children}
    </InquiriesContext.Provider>
  );
};

export const useInquiries = (): InquiriesContextType => {
  const context = useContext(InquiriesContext);
  if (!context) {
    throw new Error('useInquiries must be used within an InquiriesProvider');
  }
  return context;
};
