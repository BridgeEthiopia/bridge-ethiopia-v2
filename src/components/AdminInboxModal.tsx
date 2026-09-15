import React, { useState } from 'react';
import { 
  X, 
  Inbox, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  Users, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Settings, 
  Save, 
  Copy, 
  Check, 
  Bell, 
  ExternalLink,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useInquiries, BookingInquiry } from '../context/InquiriesContext';

export const AdminInboxModal: React.FC = () => {
  const {
    inquiries,
    unreadCount,
    updateInquiryStatus,
    deleteInquiry,
    clearAllInquiries,
    markAllAsRead,
    isInboxOpen,
    closeInbox,
    adminEmail,
    adminPhone,
    adminWhatsapp,
    updateAdminContact,
    triggerSampleInquiry,
  } = useInquiries();

  const [activeTab, setActiveTab] = useState<'inbox' | 'settings'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Settings inputs
  const [emailVal, setEmailVal] = useState(adminEmail);
  const [phoneVal, setPhoneVal] = useState(adminPhone);
  const [whatsappVal, setWhatsappVal] = useState(adminWhatsapp);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isInboxOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminContact(emailVal.trim(), phoneVal.trim(), whatsappVal.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const copyDetails = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredInquiries = inquiries.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.fullName.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.serviceOrEvent.toLowerCase().includes(term) ||
      (item.destination && item.destination.toLowerCase().includes(term)) ||
      (item.specialRequests && item.specialRequests.toLowerCase().includes(term));

    const matchesStatus = filterStatus === 'all' ? true : item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-[#2E2822]"
      id="admin-inbox-overlay"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#E8E1D5] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1E3A2F] text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D49A3D] text-[#1E3A2F] flex items-center justify-center font-bold shadow-md">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif">
                  Hindek Inquiries & Bookings Inbox
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#B85C38] text-white text-xs font-bold animate-pulse">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-xs text-[#FAF8F5]/75">
                Incoming booking requests and direct customer contact messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex bg-white/10 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('inbox')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === 'inbox' ? 'bg-[#D49A3D] text-[#1E3A2F]' : 'text-white/80 hover:text-white'
                }`}
              >
                Inbox ({inquiries.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'settings' ? 'bg-[#D49A3D] text-[#1E3A2F]' : 'text-white/80 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Contact Details</span>
              </button>
            </div>

            <button
              type="button"
              onClick={closeInbox}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close inbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF8F5]">
          {activeTab === 'settings' ? (
            /* Admin Contact Credentials Setting */
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-6 text-left">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1E3A2F]">
                  Admin Contact Credentials
                </h3>
                <p className="text-xs text-[#6B6155] mt-1 leading-relaxed">
                  These contact details will receive booking emails, WhatsApp redirects, and direct phone calls from website visitors.
                </p>
              </div>

              {saveSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Contact credentials updated successfully across all booking links!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Email Address (Receives booking emails)
                  </label>
                  <input
                    type="email"
                    required
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    placeholder="Hindeku25@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneVal}
                    onChange={(e) => setPhoneVal(e.target.value)}
                    placeholder="+251 91 100 0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3A2F] mb-1">
                    WhatsApp Number (International format with country code)
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsappVal}
                    onChange={(e) => setWhatsappVal(e.target.value)}
                    placeholder="+251 91 100 0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152B23] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#D49A3D]" />
                  <span>Save Contact Credentials</span>
                </button>
              </form>
            </div>
          ) : (
            /* Inquiries List View */
            <div className="space-y-4 text-left">
              
              {/* Search & Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8E1D5] shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#8C7E6D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search guests, tours, notes..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#E8E1D5] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1E3A2F]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={triggerSampleInquiry}
                    className="px-3 py-1.5 bg-[#FAF6EE] border border-[#D49A3D]/40 rounded-xl text-xs font-bold text-[#B85C38] hover:bg-[#D49A3D]/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Simulate incoming customer booking with audio alert"
                  >
                    <Bell className="w-3.5 h-3.5 animate-bounce" />
                    <span>Test Notification Chime</span>
                  </button>

                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-xs font-semibold text-[#423B33] hover:bg-[#E8E1D5] transition-colors"
                  >
                    Mark All Read
                  </button>

                  {inquiries.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllInquiries}
                      className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Inquiries Stream */}
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl border border-[#E8E1D5] p-8 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-[#D49A3D]/15 text-[#B85C38] flex items-center justify-center mx-auto">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1E3A2F]">
                    No Booking Inquiries Yet
                  </h3>
                  <p className="text-xs text-[#6B6155] max-w-sm mx-auto leading-relaxed">
                    Whenever a traveler clicks "Book Your Experience", "Plan My Trip", or submits a contact message, their full booking details and contact info will appear here immediately with an instant alert!
                  </p>
                  <button
                    type="button"
                    onClick={triggerSampleInquiry}
                    className="mt-2 px-4 py-2 bg-[#1E3A2F] text-white rounded-xl text-xs font-bold hover:bg-[#152B23] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D49A3D]" />
                    <span>Create a Test Booking</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3.5">
                  {filteredInquiries.map((inq) => {
                    const cleanPhone = (inq.phone || adminWhatsapp).replace(/[^0-9]/g, '');
                    const waReply = encodeURIComponent(
                      `Hello ${inq.fullName}! Thank you for inquiring about "${inq.serviceOrEvent}" with Bridge Ethiopia. Hindek here!`
                    );

                    return (
                      <div
                        key={inq.id}
                        className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                          inq.status === 'new'
                            ? 'border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                            : 'border-[#E8E1D5] shadow-xs'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E1D5] pb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                                inq.status === 'new'
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-[#1E3A2F]/10 text-[#1E3A2F]'
                              }`}
                            >
                              {inq.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-[#1E3A2F]">{inq.fullName}</h4>
                                {inq.status === 'new' && (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#8C7E6D] flex items-center gap-2">
                                <span>{new Date(inq.createdAt).toLocaleString()}</span>
                                <span>•</span>
                                <span className="capitalize">{inq.type.replace('-', ' ')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Status Toggle */}
                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                updateInquiryStatus(inq.id, e.target.value as BookingInquiry['status'])
                              }
                              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E8E1D5] bg-[#FAF8F5] focus:outline-none"
                            >
                              <option value="new">Status: New</option>
                              <option value="contacted">Status: Contacted</option>
                              <option value="confirmed">Status: Confirmed</option>
                              <option value="archived">Status: Archived</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Inquiry Details Body */}
                        <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#423B33]">
                          <div>
                            <div className="text-[#8C7E6D] font-medium">Service / Experience:</div>
                            <div className="font-bold text-[#1E3A2F] mt-0.5">{inq.serviceOrEvent}</div>
                          </div>

                          {inq.destination && (
                            <div>
                              <div className="text-[#8C7E6D] font-medium">Destination / Route:</div>
                              <div className="font-semibold text-[#1E3A2F] mt-0.5">{inq.destination}</div>
                            </div>
                          )}

                          <div>
                            <div className="text-[#8C7E6D] font-medium">Target Date & Party Size:</div>
                            <div className="font-semibold mt-0.5">
                              {inq.date || 'Flexible'} ({inq.numberOfGuests || 1} Guests)
                            </div>
                          </div>

                          <div>
                            <div className="text-[#8C7E6D] font-medium">Contact Details:</div>
                            <div className="font-semibold mt-0.5 flex flex-wrap items-center gap-2">
                              <span>{inq.email}</span>
                              {inq.phone && <span>| {inq.phone}</span>}
                            </div>
                          </div>
                        </div>

                        {inq.specialRequests && (
                          <div className="mt-3 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5] text-xs text-[#52483E]">
                            <span className="font-bold text-[#1E3A2F]">Notes / Requests:</span>{' '}
                            {inq.specialRequests}
                          </div>
                        )}

                        {/* Reply Action Buttons */}
                        <div className="mt-3.5 pt-3 border-t border-[#E8E1D5] flex flex-wrap items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              copyDetails(
                                `Booking Inquiry:\nName: ${inq.fullName}\nEmail: ${inq.email}\nPhone: ${inq.phone || 'N/A'}\nService: ${inq.serviceOrEvent}\nDate: ${inq.date || 'Flexible'}\nGuests: ${inq.numberOfGuests || 1}\nNotes: ${inq.specialRequests || 'None'}`,
                                inq.id
                              )
                            }
                            className="px-3 py-1.5 rounded-lg border border-[#E8E1D5] bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[11px] font-semibold text-[#423B33] flex items-center gap-1.5 transition-colors"
                          >
                            {copiedId === inq.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-[#8C7E6D]" />
                                <span>Copy Details</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-2">
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(`Regarding your Bridge Ethiopia inquiry: ${inq.serviceOrEvent}`)}`}
                                className="px-3 py-1.5 rounded-lg bg-[#1E3A2F] text-white hover:bg-[#152B23] text-xs font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5 text-[#D49A3D]" />
                                <span>Email Guest</span>
                              </a>
                            )}

                            {inq.phone && (
                              <a
                                href={`https://wa.me/${cleanPhone}?text=${waReply}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] text-xs font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Guest</span>
                              </a>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
