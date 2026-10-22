import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles, ChevronRight } from 'lucide-react';

export const BuyerCartModal: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal,
    cartCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscountAmount,
    shippingFee,
    finalOrderTotal,
    setIsCheckoutOpen,
    setIsCouponsModalOpen 
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyCoupon(promoInput.trim());
    if (success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6">
        {/* Header with Total Items */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-pink-600" />
            <h3 className="text-sm font-bold text-stone-900">Your Shopping Bag</h3>
            <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-800">Your bag is empty</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Explore handcrafted dresses, accessories & jewelry from verified local boutiques!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-xs font-bold transition-all shadow-xs"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-pink-50/50 shrink-0 border border-stone-100 shadow-xs"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-stone-400 block">{item.product.boutiqueName || 'Boutique'}</span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    Size: <span className="text-stone-800 font-semibold">{item.selectedSize}</span> · Color: <span className="text-stone-800 font-semibold">{item.selectedColor}</span>
                  </div>
                  <div className="text-xs font-bold text-pink-600 mt-1 tabular-nums">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Quantity Stepper with accurate item counting */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="text-stone-400 hover:text-rose-500 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 bg-stone-100 rounded-xl p-0.5 border border-stone-200">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                      className="w-5 h-5 rounded-lg bg-white text-stone-700 font-bold text-[11px] flex items-center justify-center hover:bg-stone-200 transition-colors"
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-stone-800 tabular-nums px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      className="w-5 h-5 rounded-lg bg-white text-stone-700 font-bold text-[11px] flex items-center justify-center hover:bg-stone-200 transition-colors"
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupons & Bill Summary */}
        {cart.length > 0 && (
          <div className="p-4 bg-stone-50/80 border-t border-stone-100 space-y-3.5 text-xs">
            {/* Applied Coupon Card or View Coupons Trigger */}
            {appliedCoupon ? (
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-pink-600" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-pink-700 text-xs">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                        Applied
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      Saving ₹{couponDiscountAmount.toLocaleString('en-IN')} on this order
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCouponsModalOpen(true)}
                    className="text-[11px] text-pink-600 font-semibold hover:underline"
                  >
                    Change
                  </button>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              /* Trigger to browse coupons */
              <div 
                onClick={() => setIsCouponsModalOpen(true)}
                className="p-3 bg-white border border-dashed border-pink-300 hover:border-pink-500 rounded-2xl flex items-center justify-between cursor-pointer transition-colors group shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                    <Tag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 group-hover:text-pink-600 transition-colors block">
                      View Available Coupons & Offers
                    </span>
                    <span className="text-[10px] text-pink-600 font-semibold">
                      Save up to 50% with SWAYLA50
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-pink-600" />
              </div>
            )}

            {/* Quick manual coupon entry */}
            {!appliedCoupon && (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. SWAYLA50)"
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-mono uppercase font-bold focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  disabled={!promoInput.trim()}
                  className="px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="tabular-nums">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>Final Payable</span>
                <span className="text-pink-600 tabular-nums">
                  ₹{finalOrderTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Proceed to Checkout (₹{finalOrderTotal.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
