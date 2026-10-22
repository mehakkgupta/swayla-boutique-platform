import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Sparkles,
  Maximize2
} from 'lucide-react';

export const BuyerProductDetail: React.FC = () => {
  const { 
    selectedProduct, 
    setCurrentScreen, 
    addToCart, 
    setIsCartOpen, 
    setIsCheckoutOpen,
    cartCount,
    toggleWishlist,
    isInWishlist,
    setFullscreenImage,
    addToast 
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct?.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct?.colors?.[0]?.name || 'Standard');

  if (!selectedProduct) {
    return (
      <div className="p-6 text-center">
        <p className="text-stone-500">No product found.</p>
        <button onClick={() => setCurrentScreen('buyer_dashboard')} className="mt-3 text-pink-600 font-bold">
          Back to Catalog
        </button>
      </div>
    );
  }

  const isLiked = isInWishlist(selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, 1, selectedSize, selectedColor);
    setIsCheckoutOpen(true);
  };

  const handleOpenFullscreen = () => {
    setFullscreenImage({
      url: selectedProduct.image,
      title: selectedProduct.name
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[700px] relative pb-28">
      {/* Top Floating Header with Back Button */}
      <header className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30">
        <button
          onClick={() => setCurrentScreen('buyer_dashboard')}
          className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-bold text-stone-700 tracking-tight">
          {selectedProduct.boutiqueName || 'Boutique Collection'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-rose-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-pink-600 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Full Size Product Hero Image presentation matching User Request */}
      <div className="relative w-full bg-stone-100/70 border-b border-stone-200 overflow-hidden group">
        <div 
          onClick={handleOpenFullscreen}
          className="w-full h-[380px] sm:h-[440px] flex items-center justify-center cursor-zoom-in relative bg-radial from-pink-50 to-stone-100"
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Fullscreen Expand Badge in Corner */}
          <button
            onClick={(e) => { e.stopPropagation(); handleOpenFullscreen(); }}
            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-lg transition-transform active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-semibold text-[11px]">View Full Size</span>
          </button>

          {/* Badge */}
          {selectedProduct.badge && (
            <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full text-white shadow-md ${
              selectedProduct.badge === 'Best Seller' ? 'bg-amber-500' :
              selectedProduct.badge === 'Limited Stock' ? 'bg-rose-500' : 'bg-pink-600'
            }`}>
              {selectedProduct.badge}
            </span>
          )}
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-5 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              {selectedProduct.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{selectedProduct.rating || 4.9}</span>
              <span className="text-stone-400 font-normal">({selectedProduct.reviewsCount || 34})</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-1.5 leading-snug">
            {selectedProduct.name}
          </h1>

          <div className="flex items-baseline gap-2.5 mt-2.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-pink-600 tabular-nums">
              ₹{selectedProduct.price.toLocaleString('en-IN')}
            </span>
            {selectedProduct.originalPrice && (
              <span className="text-sm text-stone-400 line-through tabular-nums">
                ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full ml-1 border border-emerald-200">
              In Stock · Fast Dispatch
            </span>
          </div>
        </div>

        {/* Sizes Selector */}
        {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-800">Select Size</label>
              <button className="text-[11px] text-pink-600 font-semibold hover:underline">Size Guide</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedSize === size
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors Selector */}
        {selectedProduct.colors && selectedProduct.colors.length > 0 && (
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-2">
              Color Shade: <span className="font-semibold text-pink-600">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {selectedProduct.colors.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    selectedColor === color.name ? 'ring-4 ring-pink-300 scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description & Material Details */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
            Product Story & Details
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            {selectedProduct.description}
          </p>
          {selectedProduct.material && (
            <p className="text-xs text-stone-500 font-medium pt-1">
              Fabric & Composition: <span className="text-stone-800">{selectedProduct.material}</span>
            </p>
          )}
        </div>

        {/* Boutique Seller Banner */}
        <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50/50 rounded-2xl border border-pink-100 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-pink-600 flex items-center justify-center font-bold text-base shadow-sm border border-pink-100">
              👗
            </div>
            <div>
              <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">Local Boutique Partner</span>
              <h5 className="text-xs font-bold text-stone-900">{selectedProduct.boutiqueName || 'Aura Boutique'}</h5>
              <span className="text-[10px] text-stone-400">Jaipur, India · 100% Genuine</span>
            </div>
          </div>
        </div>

        {/* Assurances */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-center text-[10px] text-stone-500">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
            <span>Authentic Guarantee</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-4 h-4 text-pink-600 mb-1" />
            <span>Fast Express Dispatch</span>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-4 h-4 text-stone-600 mb-1" />
            <span>7-Day Return & Exchange</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[412px] mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-stone-200 flex gap-2.5 z-40 shadow-xl">
        <button
          onClick={() => addToCart(selectedProduct, 1, selectedSize, selectedColor)}
          className="flex-1 py-3 px-3 rounded-2xl bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 px-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};
