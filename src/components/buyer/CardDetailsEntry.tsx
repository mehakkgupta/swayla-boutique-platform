import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, Sparkles, Check, Info } from 'lucide-react';

export interface CardDetailsState {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

interface CardDetailsEntryProps {
  cardDetails: CardDetailsState;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetailsState>>;
  isCompact?: boolean;
}

export const getCardBrand = (number: string): 'visa' | 'mastercard' | 'rupay' | 'amex' | 'generic' => {
  const clean = number.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
  if (/^(60|65|81|82)/.test(clean)) return 'rupay';
  if (/^3[47]/.test(clean)) return 'amex';
  return 'generic';
};

export const formatCardNumber = (value: string): string => {
  const clean = value.replace(/\D/g, '').substring(0, 16);
  const parts = [];
  for (let i = 0; i < clean.length; i += 4) {
    parts.push(clean.substring(i, i + 4));
  }
  return parts.join(' ');
};

export const formatExpiry = (value: string): string => {
  const clean = value.replace(/\D/g, '').substring(0, 4);
  if (clean.length >= 3) {
    return `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
  }
  return clean;
};

export const CardDetailsEntry: React.FC<CardDetailsEntryProps> = ({
  cardDetails,
  setCardDetails,
  isCompact = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const brand = getCardBrand(cardDetails.cardNumber);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardDetails(prev => ({ ...prev, expiryDate: formatted }));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCardDetails(prev => ({ ...prev, cvv: clean }));
  };

  const handlePrefillTestCard = (brandType: 'visa' | 'mastercard') => {
    if (brandType === 'visa') {
      setCardDetails({
        cardNumber: '4532 8901 2345 8921',
        cardholderName: 'MEHAK SHARMA',
        expiryDate: '08/28',
        cvv: '842',
        saveCard: true
      });
    } else {
      setCardDetails({
        cardNumber: '5241 6789 3412 4022',
        cardholderName: 'MEHAK SHARMA',
        expiryDate: '11/29',
        cvv: '519',
        saveCard: true
      });
    }
  };

  // Card theme styling based on detected brand
  const getCardTheme = () => {
    switch (brand) {
      case 'visa':
        return 'from-slate-900 via-indigo-950 to-blue-900 border-indigo-500/30 text-white';
      case 'mastercard':
        return 'from-stone-900 via-zinc-900 to-rose-950 border-rose-500/30 text-white';
      case 'rupay':
        return 'from-emerald-950 via-teal-950 to-stone-900 border-emerald-500/30 text-white';
      case 'amex':
        return 'from-amber-950 via-stone-900 to-amber-900 border-amber-500/30 text-white';
      default:
        return 'from-stone-900 via-rose-950 to-pink-950 border-pink-500/30 text-white';
    }
  };

  return (
    <div className="space-y-3.5">
      {/* 3D Realistic Card Preview */}
      <div 
        className={`w-full rounded-2xl p-4 bg-gradient-to-tr ${getCardTheme()} border shadow-xl relative overflow-hidden transition-all duration-300 ${
          isCompact ? 'h-40' : 'h-44'
        }`}
      >
        {/* Subtle decorative background circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/5 blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-pink-500/10 blur-xl pointer-events-none" />

        {/* Top Card Row: EMV Chip + Contactless + Brand */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            {/* Metallic Gold EMV Chip */}
            <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 p-0.5 shadow-inner border border-yellow-200/50 flex flex-col justify-between">
              <div className="h-[1px] bg-amber-600/60 w-full mt-1" />
              <div className="h-[1px] bg-amber-600/60 w-3/4 mx-auto" />
              <div className="h-[1px] bg-amber-600/60 w-full mb-1" />
            </div>
            {/* Contactless waves icon */}
            <span className="text-[10px] text-white/70 font-mono tracking-tighter rotate-90">
              ))))
            </span>
          </div>

          {/* Dynamic Card Brand Badge */}
          <div className="text-right">
            {brand === 'visa' && (
              <span className="font-sans font-black italic tracking-wider text-base text-white drop-shadow">
                VISA
              </span>
            )}
            {brand === 'mastercard' && (
              <div className="flex -space-x-2 items-center">
                <div className="w-5 h-5 rounded-full bg-rose-500 opacity-90" />
                <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90" />
              </div>
            )}
            {brand === 'rupay' && (
              <span className="font-extrabold text-xs tracking-wider text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-400/40">
                RuPay 💳
              </span>
            )}
            {brand === 'amex' && (
              <span className="font-bold text-xs tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-400/40">
                AMEX
              </span>
            )}
            {brand === 'generic' && (
              <span className="text-[10px] uppercase font-bold text-pink-300 tracking-wider">
                Boutique Pay
              </span>
            )}
          </div>
        </div>

        {/* Middle: Card Number with 4-digit blocks */}
        <div className="mt-4 relative z-10">
          <div className="font-mono text-sm sm:text-base font-extrabold tracking-widest text-white/95 drop-shadow-sm select-all">
            {cardDetails.cardNumber.trim() || '••••  ••••  ••••  ••••'}
          </div>
        </div>

        {/* Bottom Card Row: Cardholder Name + Expiry + Security Hologram */}
        <div className="mt-3 flex items-end justify-between relative z-10 text-[10px] text-white/80">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-white/50 block font-semibold">
              Cardholder Name
            </span>
            <span className="font-bold uppercase tracking-wide text-white truncate max-w-[170px] block">
              {cardDetails.cardholderName.trim() || 'YOUR NAME'}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[8px] uppercase tracking-wider text-white/50 block font-semibold">
              Expires
            </span>
            <span className="font-mono font-bold text-white tracking-wider">
              {cardDetails.expiryDate.trim() || 'MM/YY'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[8px] uppercase tracking-wider text-white/50 block font-semibold">
              CVV
            </span>
            <span className="font-mono font-bold text-white tracking-widest">
              {cardDetails.cvv ? '•••' : '•••'}
            </span>
          </div>
        </div>
      </div>

      {/* 1-Click Fast Fill Test Helper */}
      <div className="flex items-center justify-between text-[11px] bg-pink-50/70 p-2 rounded-xl border border-pink-100">
        <span className="text-pink-900 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Quick Demo Card:</span>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handlePrefillTestCard('visa')}
            className="px-2 py-0.5 bg-white text-pink-700 hover:bg-pink-100 rounded-lg text-[10px] font-bold border border-pink-200 transition-colors shadow-2xs"
          >
            + Test Visa
          </button>
          <button
            type="button"
            onClick={() => handlePrefillTestCard('mastercard')}
            className="px-2 py-0.5 bg-white text-stone-700 hover:bg-stone-100 rounded-lg text-[10px] font-bold border border-stone-200 transition-colors shadow-2xs"
          >
            + Test Master
          </button>
        </div>
      </div>

      {/* Card Input Form Fields */}
      <div className="space-y-2.5 text-xs">
        {/* Card Number Input */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={handleNumberChange}
              placeholder="4532  0000  0000  0000"
              maxLength={19}
              className="w-full pl-9 pr-12 py-2.5 rounded-xl border border-stone-200 text-xs font-mono font-bold tracking-wider focus:outline-none focus:border-pink-500 focus:bg-white bg-stone-50 transition-colors"
              required
            />
            <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <span className="absolute right-3 top-2.5 text-[10px] font-bold uppercase text-stone-500">
              {brand !== 'generic' ? brand.toUpperCase() : ''}
            </span>
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">
            Name on Card
          </label>
          <input
            type="text"
            value={cardDetails.cardholderName}
            onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value.toUpperCase() }))}
            placeholder="e.g. MEHAK SHARMA"
            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs uppercase font-semibold focus:outline-none focus:border-pink-500 focus:bg-white bg-stone-50 transition-colors"
            required
          />
        </div>

        {/* Expiry Date and CVV Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              value={cardDetails.expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs font-mono font-bold text-center focus:outline-none focus:border-pink-500 focus:bg-white bg-stone-50 transition-colors"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-stone-700">
                Security Code (CVV)
              </label>
              <span className="text-[10px] text-stone-400" title="3 or 4 digits on card back">
                3 digits
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                value={cardDetails.cvv}
                onChange={handleCvvChange}
                placeholder="•••"
                maxLength={4}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs font-mono font-bold text-center tracking-widest focus:outline-none focus:border-pink-500 focus:bg-white bg-stone-50 transition-colors"
                required
              />
              <Lock className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
            </div>
          </div>
        </div>

        {/* Save Card Checkbox */}
        <div className="pt-1 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={cardDetails.saveCard}
              onChange={(e) => setCardDetails(prev => ({ ...prev, saveCard: e.target.checked }))}
              className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500 border-stone-300 accent-pink-600"
            />
            <span className="text-[11px] text-stone-700 font-medium">
              Save card securely for 1-click checkout
            </span>
          </label>

          <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>256-Bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
