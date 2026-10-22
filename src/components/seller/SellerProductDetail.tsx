import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Eye, 
  Heart, 
  ShoppingBag, 
  Edit, 
  Tag, 
  Share2, 
  Trash2, 
  Sparkles,
  Maximize2,
  AlertCircle
} from 'lucide-react';

export const SellerProductDetail: React.FC = () => {
  const { 
    selectedProduct, 
    setCurrentScreen, 
    toggleProductLive, 
    deleteProduct, 
    setIsEditProductOpen, 
    setIsDiscountModalOpen,
    setFullscreenImage,
    addToast 
  } = useApp();

  const [isDeleting, setIsDeleting] = useState(false);

  if (!selectedProduct) {
    return (
      <div className="p-8 text-center">
        <p className="text-stone-500">No product selected.</p>
        <button
          onClick={() => setCurrentScreen('seller_dashboard')}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-xl text-xs font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Product Link Copied!',
      message: `Link for "${selectedProduct.name}" copied to clipboard.`,
      type: 'success'
    });
  };

  const handleDelete = () => {
    deleteProduct(selectedProduct.id);
    setCurrentScreen('seller_dashboard');
  };

  const handleOpenFullscreen = () => {
    setFullscreenImage({
      url: selectedProduct.image,
      title: selectedProduct.name
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[700px] pb-8">
      {/* Top Header with Back Button */}
      <header className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30">
        <button
          onClick={() => setCurrentScreen('seller_dashboard')}
          className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h3 className="text-sm font-bold text-stone-900">Manage Product</h3>

        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
          title="Share Product Link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Full-Size Image Container matching User Request */}
      <div className="relative w-full bg-stone-100 border-b border-stone-200 overflow-hidden group">
        <div 
          onClick={handleOpenFullscreen}
          className="w-full h-[360px] sm:h-[420px] flex items-center justify-center cursor-zoom-in relative bg-radial from-pink-50 to-stone-100"
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Full Size badge */}
          <button
            onClick={(e) => { e.stopPropagation(); handleOpenFullscreen(); }}
            className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-lg transition-transform active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-semibold text-[11px]">View Full Size</span>
          </button>

          {selectedProduct.badge && (
            <span className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg text-white shadow-sm ${
              selectedProduct.badge === 'Best Seller' ? 'bg-amber-500' :
              selectedProduct.badge === 'Limited Stock' ? 'bg-rose-500' : 'bg-pink-600'
            }`}>
              {selectedProduct.badge}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 space-y-5">
        {/* Title, Price & Stock Info */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600">
                {selectedProduct.category}
              </span>
              <h2 className="text-xl font-bold text-stone-900 font-display mt-0.5">
                {selectedProduct.name}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xl font-extrabold text-pink-600 tabular-nums">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-xs text-stone-400 line-through tabular-nums block">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs font-semibold text-stone-500 mt-1">
            Current Stock: <span className="text-stone-800 font-bold">{selectedProduct.stockCount} pcs available</span>
          </p>

          <p className="text-xs text-stone-600 leading-relaxed mt-3">
            {selectedProduct.description}
          </p>
        </div>

        {/* Live Metrics Row matching Figma: Views 540, Likes 43, In Cart 21 */}
        <div className="flex items-center justify-around py-3.5 px-4 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <Eye className="w-4 h-4 text-stone-400" />
            <div>
              <span className="font-extrabold text-stone-900 tabular-nums block">{selectedProduct.views}</span>
              <span className="text-[10px] text-stone-400">Total Views</span>
            </div>
          </div>

          <span className="text-stone-300">|</span>

          <div className="flex items-center gap-2 text-stone-600">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <div>
              <span className="font-extrabold text-stone-900 tabular-nums block">{selectedProduct.likes}</span>
              <span className="text-[10px] text-stone-400">Wishlisted</span>
            </div>
          </div>

          <span className="text-stone-300">|</span>

          <div className="flex items-center gap-2 text-stone-600">
            <ShoppingBag className="w-4 h-4 text-pink-500" />
            <div>
              <span className="font-extrabold text-stone-900 tabular-nums block">{selectedProduct.inCart}</span>
              <span className="text-[10px] text-stone-400">In Active Bags</span>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Figma screens */}
        <div className="space-y-2.5 pt-1">
          {/* 1. Edit Details Button */}
          <button
            onClick={() => setIsEditProductOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-pink-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Details & Pricing</span>
          </button>

          {/* 2. Discount Offer Button */}
          <button
            onClick={() => setIsDiscountModalOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-pink-50/50 text-pink-600 border border-pink-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Apply Promotional Discount</span>
          </button>

          {/* 3. Share & Delete Split Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-2xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500" />
              <span>Share Link</span>
            </button>

            <button
              onClick={() => setIsDeleting(true)}
              className="py-2.5 px-3 rounded-2xl border border-rose-200 bg-rose-50/40 hover:bg-rose-100/50 text-rose-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Item</span>
            </button>
          </div>

          {/* 4. Make Live Toggle Row matching Figma */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-stone-800 block">Live in Boutique Catalog</span>
              <span className="text-[10px] text-stone-400">
                {selectedProduct.isLive ? 'Publicly visible to all shoppers' : 'Hidden from store catalog (Draft)'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => toggleProductLive(selectedProduct.id)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                selectedProduct.isLive ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  selectedProduct.isLive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Delete Product?</h4>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to remove "{selectedProduct.name}" from your boutique?
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDeleting(false)}
                className="flex-1 py-2 text-xs rounded-xl border border-stone-200 text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 text-xs rounded-xl bg-rose-600 text-white font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
