import React from 'react';
import { 
  Bell, 
  X, 
  Inbox, 
  MessageCircle, 
  Mail, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { useInquiries } from '../context/InquiriesContext';

export const RealtimeNotificationToast: React.FC = () => {
  const { activeToasts, dismissToast, openInbox, adminWhatsapp } = useInquiries();

  if (activeToasts.length === 0) return null;

  return (
    <div 
      className="fixed top-20 right-4 sm:right-6 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none"
      aria-label="Real-time notifications"
    >
      {activeToasts.map((toast) => {
        const cleanPhone = (toast.inquiry.phone || adminWhatsapp).replace(/[^0-9]/g, '');
        const waText = encodeURIComponent(
          `Hello ${toast.inquiry.fullName}! Thank you for your inquiry on Bridge Ethiopia regarding "${toast.inquiry.serviceOrEvent}". Hindek here! How can I assist you?`
        );

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-[#D49A3D]/50 flex flex-col gap-2.5 transition-all animate-in slide-in-from-top-4 duration-300 hover:shadow-3xl text-[#2E2822]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1E3A2F] text-[#D49A3D] flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85C38] bg-[#B85C38]/10 px-2 py-0.5 rounded-md">
                      New Booking Alert
                    </span>
                    <span className="text-[10px] text-[#8C7E6D] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Just now
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E3A2F] leading-tight mt-0.5">
                    {toast.title}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="w-6 h-6 rounded-lg text-[#8C7E6D] hover:text-[#1E3A2F] hover:bg-[#F2EFE9] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Dismiss alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Details Snippet */}
            <p className="text-xs text-[#52483E] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E1D5] line-clamp-2">
              {toast.message}
            </p>

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E8E1D5]">
              <button
                type="button"
                onClick={() => {
                  openInbox();
                  dismissToast(toast.id);
                }}
                className="px-3 py-1.5 bg-[#1E3A2F] hover:bg-[#152B23] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Inbox className="w-3.5 h-3.5 text-[#D49A3D]" />
                <span>Open Admin Inbox</span>
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#1E3A2F] rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Reply WhatsApp</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
