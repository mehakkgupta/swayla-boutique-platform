import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, X, ShoppingBag, Trash2, ArrowRight, Plus, Check } from 'lucide-react';

export const SavedItemsModal: React.FC = () => {
  const { 
    isSavedItemsModalOpen, 
    setIsSavedItemsModalOpen, 
    wishlist, 
    products, 
    toggleWishlist, 
    addToCart, 
    setSelectedProductId, 
    setCurrentScreen,
    setIsCartOpen,
    setFullscreenImage,
    addToast 
  } = useApp();

  if (!isSavedItemsModalOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach(p => {
      addToCart(p, 1);
    });
    setIsSavedItemsModalOpen(false);
    setIsCartOpen(true);
    addToast({
      title: 'All Saved Items Moved to Bag!',
      message: `${wishlistedProducts.length} items added to your shopping cart.`,
      type: 'success'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Saved Wishlist</h3>
              <p className="text-[10px] text-stone-500">
                {wishlistedProducts.length} Total Saved Items
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSavedItemsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-stone-100">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Your Wishlist is Empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart icon on any boutique dress, boots, or jewelry item to save it for later.
              </p>
              <button
                onClick={() => {
                  setIsSavedItemsModalOpen(false);
                }}
                className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-xs font-bold transition-all"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlistedProducts.map(product => (
              <div
                key={product.id}
                className="pt-3 first:pt-0 flex gap-3 items-center group"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => {
                    setFullscreenImage({ url: product.image, title: product.name });
                  }}
                  className="w-16 h-16 rounded-xl overflow-hidden bg-pink-50 relative shrink-0 cursor-zoom-in border border-stone-100 shadow-xs"
                  title="Click to view full size image"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.badge && (
                    <span className="absolute bottom-1 left-1 text-[8px] font-bold px-1 py-0.2 bg-black/60 text-white rounded">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div 
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setCurrentScreen('buyer_product_detail');
                    setIsSavedItemsModalOpen(false);
                  }}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <span className="text-[10px] text-stone-400 block">{product.boutiqueName || 'Boutique'}</span>
                  <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-pink-600 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {product.stockCount} in stock
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-stone-400 hover:text-rose-500 p-1"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      setIsCartOpen(true);
                      setIsSavedItemsModalOpen(false);
                    }}
                    className="px-2.5 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Move All */}
        {wishlistedProducts.length > 0 && (
          <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex gap-2">
            <button
              onClick={handleMoveAllToBag}
              className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-pink-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag ({wishlistedProducts.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
