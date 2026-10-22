import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, X, Check, Sparkles, Percent, Truck, ArrowRight, AlertCircle } from 'lucide-react';

export const CouponsModal: React.FC = () => {
  const { 
    isCouponsModalOpen, 
    setIsCouponsModalOpen, 
    availableCoupons, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    cartTotal,
    cartCount,
    setIsCartOpen 
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  if (!isCouponsModalOpen) return null;

  const handleManualApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyCoupon(inputCode.trim());
    if (success) {
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Coupons & Offers</h3>
              <p className="text-[10px] text-stone-500">
                {cartCount > 0 ? `Current Bag: ₹${cartTotal.toLocaleString('en-IN')}` : 'Add items to bag to apply'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCouponsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Manual Code Input */}
        <div className="p-4 border-b border-stone-100 bg-white">
          <form onSubmit={handleManualApply} className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code..."
              className="flex-1 px-3 py-2 text-xs uppercase font-mono font-bold rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              disabled={!inputCode.trim()}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {availableCoupons.map(coupon => {
            const isApplied = appliedCoupon?.code === coupon.code;
            const isEligible = !coupon.minOrderValue || cartTotal >= coupon.minOrderValue;
            const shortfall = coupon.minOrderValue ? Math.max(0, coupon.minOrderValue - cartTotal) : 0;

            // Estimated savings
            let savings = 0;
            if (coupon.discountType === 'percentage') {
              const calc = Math.round((cartTotal * coupon.discountValue) / 100);
              savings = coupon.maxDiscount ? Math.min(calc, coupon.maxDiscount) : calc;
            } else if (coupon.discountType === 'flat') {
              savings = coupon.discountValue;
            } else if (coupon.discountType === 'freeship') {
              savings = 99;
            }

            return (
              <div
                key={coupon.code}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isApplied
                    ? 'border-pink-500 bg-pink-50/40 ring-2 ring-pink-200'
                    : isEligible
                    ? 'border-stone-200/90 bg-white hover:border-pink-200'
                    : 'border-stone-200/50 bg-stone-50/50 opacity-80'
                }`}
              >
                {/* Top Row: Code & Tag */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-xs text-pink-700 bg-pink-100/80 px-2.5 py-1 rounded-lg border border-pink-300 border-dashed">
                      {coupon.code}
                    </span>
                    {coupon.tag && (
                      <span className="text-[9px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                        {coupon.tag}
                      </span>
                    )}
                  </div>

                  {isApplied ? (
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-rose-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => applyCoupon(coupon.code)}
                      disabled={!isEligible}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isEligible
                          ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Apply
                    </button>
                  )}
                </div>

                {/* Title & Description */}
                <h4 className="text-xs font-bold text-stone-900">{coupon.title}</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                  {coupon.description}
                </p>

                {/* Eligibility Status */}
                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  {isApplied ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Active: Saving ₹{savings.toLocaleString('en-IN')} on this order!
                    </span>
                  ) : isEligible && cartTotal > 0 ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      Save ₹{savings.toLocaleString('en-IN')} if applied
                    </span>
                  ) : shortfall > 0 ? (
                    <span className="text-amber-700 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Add ₹{shortfall.toLocaleString('en-IN')} more to unlock
                    </span>
                  ) : (
                    <span className="text-stone-400">Available on all purchases</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
          <button
            onClick={() => {
              setIsCouponsModalOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span>Back to Shopping Bag</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
