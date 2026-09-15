import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, KeyRound, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCustomPhotoContext } from '../context/CustomPhotoContext';

export const FounderPinModal: React.FC = () => {
  const { isPinModalOpen, closePinModal, verifyPin, isAdminMode, logoutFounder, openUploadModal } = useCustomPhotoContext();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isPinModalOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin.trim()) {
      setError('Please enter your 4-digit Founder PIN.');
      return;
    }

    setIsVerifying(true);
    setError(null);

    const result = await verifyPin(pin.trim());
    setIsVerifying(false);

    if (result.success) {
      setSuccessMsg('Welcome, Hindek! Photo manager unlocked.');
      setTimeout(() => {
        setSuccessMsg(null);
        setPin('');
        closePinModal();
        openUploadModal();
      }, 700);
    } else {
      setError(result.message || 'Incorrect PIN. Only founder Hindek can upload photos.');
    }
  };

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(null);
      if (nextPin.length === 4) {
        // Auto-verify on 4 digits
        setTimeout(() => {
          verifyPin(nextPin).then(res => {
            if (res.success) {
              setSuccessMsg('Welcome, Hindek! Photo manager unlocked.');
              setTimeout(() => {
                setSuccessMsg(null);
                setPin('');
                closePinModal();
                openUploadModal();
              }, 600);
            } else {
              setError(res.message);
            }
          });
        }, 150);
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(null);
  };

  const handleClear = () => {
    setPin('');
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      id="founder-pin-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-[#E8DACB] overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1E3A2F] text-white p-6 text-center relative">
          <button
            type="button"
            onClick={closePinModal}
            className="absolute top-4 right-4 p-2 rounded-full text-[#D9D0C1] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D49A3D]/20 border border-[#D49A3D]/40 flex items-center justify-center mb-3 text-[#D49A3D] shadow-inner">
            {isAdminMode ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
          </div>

          <h2 className="text-xl font-bold font-serif text-white">
            {isAdminMode ? 'Founder Mode Active' : 'Founder Sign-in'}
          </h2>
          <p className="text-xs text-[#E8E1D5] mt-1">
            Restricted to Hindek • Founder & General Manager
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border border-white/10 text-[11px] text-[#D49A3D] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
            <span>Hindeku25@gmail.com</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isAdminMode ? (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs space-y-1">
                <div className="font-bold flex items-center justify-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  <span>You are authenticated</span>
                </div>
                <p>Photo upload and editing buttons are now enabled for your session.</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closePinModal();
                    openUploadModal();
                  }}
                  className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152B23] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Open Photo Manager
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logoutFounder();
                    closePinModal();
                  }}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-xl border border-red-200 transition-colors cursor-pointer"
                >
                  Log Out (Lock Photo Editing)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center space-y-1">
                <label htmlFor="founder-pin-input" className="text-xs font-semibold text-[#52483E]">
                  Enter Secret Founder PIN
                </label>
                <div className="flex justify-center items-center gap-2 pt-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-11 h-13 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                        pin.length === idx
                          ? 'border-[#1E3A2F] bg-[#FAF8F5] ring-2 ring-[#D49A3D]/40'
                          : pin.length > idx
                          ? 'border-[#1E3A2F] bg-[#1E3A2F] text-white shadow-xs'
                          : 'border-[#E8DACB] bg-white text-transparent'
                      }`}
                    >
                      {pin[idx] ? '●' : ''}
                    </div>
                  ))}
                </div>
                <input
                  id="founder-pin-input"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setPin(val);
                    setError(null);
                  }}
                  className="sr-only"
                  autoFocus
                />
              </div>

              {/* Status alerts */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Number Keypad */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeyPress(digit)}
                    className="h-12 rounded-xl bg-[#FAF8F5] hover:bg-[#E8DACB]/50 active:bg-[#1E3A2F] active:text-white text-[#1E3A2F] font-bold text-lg border border-[#E8DACB] transition-colors cursor-pointer"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClear}
                  className="h-12 rounded-xl bg-white hover:bg-red-50 text-red-600 text-xs font-bold border border-[#E8DACB] transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => handleKeyPress('0')}
                  className="h-12 rounded-xl bg-[#FAF8F5] hover:bg-[#E8DACB]/50 active:bg-[#1E3A2F] active:text-white text-[#1E3A2F] font-bold text-lg border border-[#E8DACB] transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  className="h-12 rounded-xl bg-white hover:bg-slate-100 text-[#52483E] text-xs font-bold border border-[#E8DACB] transition-colors cursor-pointer flex items-center justify-center"
                >
                  ⌫ Del
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={isVerifying || pin.length === 0}
                  className="w-full py-3 bg-[#1E3A2F] hover:bg-[#152B23] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#D49A3D]" />
                  <span>{isVerifying ? 'Verifying PIN...' : 'Unlock Photo Manager'}</span>
                </button>
              </div>

              {/* Helpful Hint for Founder */}
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8DACB] text-[11px] text-[#6B6155] text-center">
                <span className="font-semibold text-[#1E3A2F]">Founder Hint:</span> Default PIN is <span className="font-mono font-bold text-[#B85C38]">2519</span>
              </div>
            </form>
          )}

          {/* Privacy promise */}
          <p className="text-[10px] text-[#8C7E6D] text-center leading-relaxed">
            🔒 Public visitors cannot see upload buttons or change photos. Only authenticated founder Hindek has access.
          </p>
        </div>

      </div>
    </div>
  );
};
