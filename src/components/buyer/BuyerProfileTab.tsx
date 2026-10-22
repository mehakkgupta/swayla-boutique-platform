import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  Heart, 
  CreditCard, 
  Tag, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const BuyerProfileTab: React.FC = () => {
  const { 
    buyerName, 
    buyerOrders, 
    wishlist, 
    products, 
    addToCart, 
    setSelectedProductId, 
    setCurrentScreen,
    logout,
    setIsCartOpen,
    setIsSavedItemsModalOpen,
    setIsCouponsModalOpen,
    setIsSavedCardsModalOpen,
    savedCards,
    availableCoupons,
    appliedCoupon
  } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-5 pb-20">
      {/* Profile Card */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-serif-brand font-bold text-2xl shadow-md shadow-pink-500/20">
          {buyerName.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-stone-900">{buyerName}</h3>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-bold">
              Verified Shopper
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">mehak.buyer@swayla.com</p>
          <p className="text-[11px] text-stone-400">+91 98765 43210</p>
        </div>
      </div>

      {/* 3 Metrics */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div 
          onClick={() => setCurrentScreen('buyer_dashboard')}
          className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs cursor-pointer hover:border-pink-300 transition-colors"
        >
          <span className="text-lg font-extrabold text-stone-900 block tabular-nums">
            {buyerOrders.length}
          </span>
          <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
            Total Orders
          </span>
        </div>

        <div 
          onClick={() => setIsSavedItemsModalOpen(true)}
          className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs cursor-pointer hover:border-pink-300 transition-colors group"
        >
          <span className="text-lg font-extrabold text-pink-600 block tabular-nums group-hover:scale-105 transition-transform">
            {wishlist.length}
          </span>
          <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
            Saved Items
          </span>
        </div>

        <div 
          onClick={() => setIsCouponsModalOpen(true)}
          className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs cursor-pointer hover:border-pink-300 transition-colors group"
        >
          <span className="text-lg font-extrabold text-amber-600 block tabular-nums group-hover:scale-105 transition-transform">
            {availableCoupons.length}
          </span>
          <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">
            Coupons
          </span>
        </div>
      </div>

      {/* Wishlist Carousel */}
      {wishlistedProducts.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 
              onClick={() => setIsSavedItemsModalOpen(true)}
              className="text-xs font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider cursor-pointer hover:text-pink-600 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>My Saved Wishlist ({wishlist.length})</span>
            </h4>
            <button 
              onClick={() => setIsSavedItemsModalOpen(true)}
              className="text-[11px] text-pink-600 font-semibold hover:underline"
            >
              View All ({wishlistedProducts.length})
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {wishlistedProducts.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProductId(p.id);
                  setCurrentScreen('buyer_product_detail');
                }}
                className="bg-stone-50 p-2 rounded-2xl border border-stone-200/70 hover:border-pink-200 transition-all cursor-pointer group"
              >
                <img src={p.image} alt={p.name} className="w-full h-24 object-cover rounded-xl mb-1.5" />
                <h5 className="text-[11px] font-bold text-stone-900 truncate group-hover:text-pink-600">{p.name}</h5>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-pink-600 tabular-nums">₹{p.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p, 1);
                      setIsCartOpen(true);
                    }}
                    className="text-[10px] bg-white border border-pink-300 text-pink-600 px-2 py-0.5 rounded-lg font-semibold hover:bg-pink-50"
                  >
                    + Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Settings List */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-4 shadow-xs divide-y divide-stone-100 text-xs">
        <div className="py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-stone-700">
            <MapPin className="w-4 h-4 text-stone-400" />
            <div>
              <span className="font-semibold block">Delivery Address</span>
              <span className="text-[11px] text-stone-400">42 Blossom Crest, Indiranagar, Bengaluru</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div 
          onClick={() => setIsSavedCardsModalOpen(true)}
          className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-pink-50/40 rounded-xl px-1 -mx-1 transition-colors"
        >
          <div className="flex items-center gap-2.5 text-stone-700">
            <CreditCard className="w-4 h-4 text-pink-600" />
            <div>
              <span className="font-semibold block">Saved Payment Methods</span>
              <span className="text-[11px] text-stone-400">
                {savedCards.length > 0 
                  ? `${savedCards.length} Cards Saved (${savedCards[0].brand.toUpperCase()} ${savedCards[0].cardNumber.slice(-4)}) · Tap to Manage`
                  : 'Add credit/debit card for 1-click checkout'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div 
          onClick={() => setIsCouponsModalOpen(true)}
          className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-pink-50/40 rounded-xl px-1 -mx-1 transition-colors"
        >
          <div className="flex items-center gap-2.5 text-stone-700">
            <Tag className="w-4 h-4 text-pink-600" />
            <div>
              <span className="font-semibold block">Coupons & Rewards</span>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {appliedCoupon ? `Active: ${appliedCoupon.code}` : 'SWAYLA50 (50% Off First Order) & 3 more'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        <div className="py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-stone-700">
            <HelpCircle className="w-4 h-4 text-stone-400" />
            <span className="font-semibold">Help & Boutique Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={logout}
        className="w-full py-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/50 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out / Switch User</span>
      </button>
    </div>
  );
};
