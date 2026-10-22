import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tag, Percent, Sparkles, Check } from 'lucide-react';

export const DiscountOfferModal: React.FC = () => {
  const { isDiscountModalOpen, setIsDiscountModalOpen, selectedProduct, applyDiscountToProduct } = useApp();
  const [selectedPercent, setSelectedPercent] = useState<number>(15);
  const [customPercent, setCustomPercent] = useState<string>('');

  if (!isDiscountModalOpen || !selectedProduct) return null;

  const currentPrice = selectedProduct.originalPrice || selectedProduct.price;
  const activeDiscount = customPercent ? parseInt(customPercent) || 0 : selectedPercent;
  const discountedPrice = Math.max(0, Math.round(currentPrice * (1 - activeDiscount / 100)));

  const presets = [10, 15, 20, 25, 30, 50];

  const handleApply = () => {
    if (activeDiscount <= 0 || activeDiscount >= 100) return;
    applyDiscountToProduct(selectedProduct.id, activeDiscount);
    setIsDiscountModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-center">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-pink-500" />
            Apply Discount Offer
          </h3>
          <button
            onClick={() => setIsDiscountModalOpen(false)}
            className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">
          <p className="text-xs text-stone-500">
            Select a promotional discount to attract more boutique buyers:
          </p>

          {/* Preset percentage chips */}
          <div className="grid grid-cols-3 gap-2 my-4">
            {presets.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setSelectedPercent(p);
                  setCustomPercent('');
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedPercent === p && !customPercent
                    ? 'bg-pink-600 text-white shadow-sm ring-2 ring-pink-300'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {p}% OFF
              </button>
            ))}
          </div>

          {/* Price Preview Card */}
          <div className="p-3 bg-pink-50/70 border border-pink-100 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] text-stone-400 block line-through">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-base font-extrabold text-pink-600 tabular-nums">
                ₹{discountedPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">
              Save {activeDiscount}%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs shadow-md shadow-pink-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply Discount Offer</span>
        </button>
      </div>
    </div>
  );
};
