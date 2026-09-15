import React, { useState, useEffect } from 'react';
import { 
  X, 
  Coffee, 
  ShoppingBag, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Send, 
  Truck,
  Plus,
  Minus
} from 'lucide-react';
import { CoffeePackage } from '../types';
import { COFFEE_PACKAGES } from '../data/coffeePackagesData';
import { FOUNDER_INFO } from '../data/ethiopiaData';
import { useInquiries } from '../context/InquiriesContext';
import { AuthenticImage } from './AuthenticImage';

interface CoffeeOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: CoffeePackage | null;
}

export const CoffeeOrderModal: React.FC<CoffeeOrderModalProps> = ({
  isOpen,
  onClose,
  selectedPackage: initialPackage,
}) => {
  const { addInquiry } = useInquiries();
  const [pkg, setPkg] = useState<CoffeePackage>(initialPackage || COFFEE_PACKAGES[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedGrind, setSelectedGrind] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<string>('hotel');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');
  const [modalFilter, setModalFilter] = useState<'all' | 'retail' | 'commercial' | 'wholesale'>('all');

  useEffect(() => {
    if (initialPackage) {
      setPkg(initialPackage);
      setSelectedGrind(initialPackage.grindOptions[0] || 'Whole Bean');
    } else {
      setPkg(COFFEE_PACKAGES[0]);
      setSelectedGrind(COFFEE_PACKAGES[0].grindOptions[0] || 'Whole Bean');
    }
    setQuantity(1);
    setSubmitted(false);
  }, [initialPackage, isOpen]);

  if (!isOpen) return null;

  const totalUSD = pkg.priceUSD * quantity;
  const totalETB = pkg.priceETB * quantity;

  const handlePackageChange = (id: string) => {
    const found = COFFEE_PACKAGES.find((p) => p.id === id);
    if (found) {
      setPkg(found);
      setSelectedGrind(found.grindOptions[0] || 'Whole Bean');
    }
  };

  const deliveryOptionLabels: Record<string, string> = {
    hotel: 'Delivery to my hotel in Addis Ababa',
    residence: 'Delivery to home / office in Addis Ababa',
    airport: 'Airport handoff before departure flight',
    pickup: 'In-person pickup at Hindek Kitchen & Coffee Studio',
    international: 'International shipment inquiry'
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `Hello Hindek! I would like to order Hindek Coffee Packages:`,
      `• Package: ${pkg.title} (${pkg.weight})`,
      `• Quantity: ${quantity} pack(s)`,
      `• Grind Preference: ${selectedGrind}`,
      `• Total Amount: $${totalUSD} USD / ${totalETB} ETB`,
      `• Delivery Option: ${deliveryOptionLabels[deliveryOption] || deliveryOption}`,
      deliveryAddress ? `• Delivery Location / Details: ${deliveryAddress}` : '',
      customerName ? `• Customer Name: ${customerName}` : '',
      customerPhone ? `• WhatsApp / Phone: ${customerPhone}` : '',
      specialNotes ? `• Special Requests: ${specialNotes}` : ''
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    // Save to Inquiries store
    addInquiry({
      fullName: customerName,
      email: customerEmail || 'visitor@bridgeethiopia.com',
      phone: customerPhone,
      serviceOrEvent: `Coffee Order: ${quantity}x ${pkg.title} (${selectedGrind})`,
      destination: deliveryOptionLabels[deliveryOption] || 'Addis Ababa',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      numberOfGuests: quantity,
      specialRequests: `Delivery: ${deliveryOptionLabels[deliveryOption]}. Address/Notes: ${deliveryAddress}. Notes: ${specialNotes}. Total: $${totalUSD} USD / ${totalETB} ETB`,
      type: 'booking'
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8DACB] overflow-hidden my-auto text-[#1E3A2F]">
        
        {/* Header */}
        <div className="relative bg-[#1E3A2F] text-white p-6 sm:p-8 flex items-start justify-between">
          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D49A3D]/20 text-[#E5AC4D] text-xs font-bold uppercase tracking-wider border border-[#D49A3D]/30">
              <Coffee className="w-3.5 h-3.5" />
              <span>Direct Farm & Roastery Order</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Order Hindek Coffee Packages
            </h3>
            <p className="text-xs sm:text-sm text-[#D9D0C1]">
              100% Arabica • Fresh Roasted or Raw Green Beans • Handcrafted in Addis Ababa
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#1E3A2F] text-[#D49A3D] mx-auto flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold font-serif text-[#1E3A2F]">
                Coffee Order Received!
              </h4>
              <p className="text-sm text-[#5C5247] max-w-md mx-auto">
                Thank you, <span className="font-bold">{customerName}</span>. Your order for{' '}
                <span className="font-bold">{quantity}x {pkg.title}</span> has been routed directly to Hindek.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8DACB] text-left max-w-md mx-auto text-xs space-y-2 text-[#423B33]">
              <div className="flex justify-between border-b border-[#E8DACB] pb-2 font-bold text-[#1E3A2F]">
                <span>Item</span>
                <span>{quantity}x {pkg.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7E6D]">Roast & Grind:</span>
                <span className="font-semibold">{pkg.roastType} • {selectedGrind}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7E6D]">Delivery:</span>
                <span className="font-semibold">{deliveryOptionLabels[deliveryOption]}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8DACB] pt-2 font-bold text-sm text-[#1E3A2F]">
                <span>Total Amount:</span>
                <span className="text-[#B85C38]">${totalUSD} USD / {totalETB} ETB</span>
              </div>
            </div>

            {/* WhatsApp Direct Confirmation Button */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Confirm Order via WhatsApp Instantly</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#8C7E6D] hover:text-[#1E3A2F] font-semibold underline cursor-pointer"
              >
                Done & Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Package Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B5E51] block">
                  Select Coffee Size & Variety
                </label>
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setModalFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      modalFilter === 'all'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#EFE8DE] text-[#6B5E51] hover:bg-[#E2D8CC]'
                    }`}
                  >
                    All ({COFFEE_PACKAGES.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalFilter('retail')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      modalFilter === 'retail'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#EFE8DE] text-[#6B5E51] hover:bg-[#E2D8CC]'
                    }`}
                  >
                    Personal (200g-1kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalFilter('commercial')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      modalFilter === 'commercial'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#EFE8DE] text-[#6B5E51] hover:bg-[#E2D8CC]'
                    }`}
                  >
                    Cafés & Offices (2kg-10kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalFilter('wholesale')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      modalFilter === 'wholesale'
                        ? 'bg-[#1E3A2F] text-white'
                        : 'bg-[#EFE8DE] text-[#6B5E51] hover:bg-[#E2D8CC]'
                    }`}
                  >
                    Wholesale (25kg-50kg)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {COFFEE_PACKAGES.filter((item) => {
                  if (modalFilter === 'all') return true;
                  return item.tier === modalFilter;
                }).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePackageChange(item.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      pkg.id === item.id
                        ? 'bg-white border-[#1E3A2F] ring-2 ring-[#1E3A2F]/20 shadow-xs'
                        : 'bg-white/60 hover:bg-white border-[#E8DACB]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-xs text-[#1E3A2F] line-clamp-1">{item.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D49A3D]/20 text-[#9E6E1F] shrink-0">
                        {item.weight}
                      </span>
                    </div>
                    {item.purpose && (
                      <p className="text-[11px] text-[#B85C38] font-medium line-clamp-1 mb-1">
                        {item.purpose}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[11px] text-[#8C7E6D]">
                      <span>{item.roastType}</span>
                      <span className="font-extrabold text-[#B85C38]">
                        ${item.priceUSD} USD / {item.priceETB} ETB
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Package Details Preview Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8DACB] flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E8DACB] bg-slate-100">
                <AuthenticImage
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  subjectName={pkg.title}
                  photoKey={pkg.photoKey}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-bold text-sm text-[#1E3A2F]">{pkg.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E3A2F]/10 text-[#1E3A2F] font-bold">
                    {pkg.weight}
                  </span>
                </div>
                <p className="text-xs text-[#6B5E51] line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                  <span className="font-extrabold text-[#B85C38] text-base">
                    ${pkg.priceUSD} USD
                  </span>
                  <span className="text-[#8C7E6D]">({pkg.priceETB} ETB)</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 border border-[#E8DACB] rounded-xl p-1 bg-[#FAF8F5]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#E8DACB] text-[#1E3A2F] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-extrabold text-sm text-[#1E3A2F]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#E8DACB] text-[#1E3A2F] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Grind Preference & Delivery Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Grind Preference */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B5E51] block">
                  Grind / Bean Format
                </label>
                <select
                  value={selectedGrind}
                  onChange={(e) => setSelectedGrind(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs font-semibold text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                >
                  {pkg.grindOptions.map((grind, idx) => (
                    <option key={idx} value={grind}>
                      {grind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery / Collection Option */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B5E51] block">
                  Delivery / Collection
                </label>
                <select
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8DACB] text-xs font-semibold text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                >
                  <option value="hotel">Hotel Delivery in Addis Ababa</option>
                  <option value="residence">Home / Office in Addis Ababa</option>
                  <option value="airport">Airport Handoff Before Flight</option>
                  <option value="pickup">Pick Up at Hindek Kitchen & Studio</option>
                  <option value="international">International Shipping Inquiry</option>
                </select>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3 pt-2 border-t border-[#E8DACB]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#6B5E51] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sarah Jenkins"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#6B5E51] block mb-1">
                    WhatsApp or Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 123 4567 or +251 91..."
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#6B5E51] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#6B5E51] block mb-1">
                    Hotel Name, Address, or Flight Departure
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Skylight Hotel, Room 304 / ET flight"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E8DACB] text-xs text-[#1E3A2F] focus:ring-2 focus:ring-[#1E3A2F] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Total Price Bar & Submit CTAs */}
            <div className="p-4 rounded-2xl bg-[#1E3A2F] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#D9D0C1] uppercase tracking-wider block font-bold">
                  Order Total ({quantity} pack{quantity > 1 ? 's' : ''})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#F4BE5E]">
                    ${totalUSD} USD
                  </span>
                  <span className="text-xs text-white/70">
                    / {totalETB} ETB
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${FOUNDER_INFO.whatsapp}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  title="Order via WhatsApp directly"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </a>

                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#D49A3D] hover:bg-[#C28B30] text-[#1E3A2F] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Order Request</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#8C7E6D]">
              🌿 Freshly packed upon order. Free handoff in central Addis Ababa hotels. International shipping available upon request.
            </p>

          </form>
        )}

      </div>
    </div>
  );
};
