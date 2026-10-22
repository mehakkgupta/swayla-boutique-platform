import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Share2, Store, Sparkles, Heart } from 'lucide-react';

export const SellerBoutiqueView: React.FC = () => {
  const { 
    boutiqueProfile, 
    products, 
    setCurrentScreen, 
    setSelectedProductId,
    addToast 
  } = useApp();

  const handleShareBoutique = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      title: 'Store Link Copied!',
      message: 'Share this link with your Instagram & WhatsApp shoppers.',
      type: 'success'
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-[700px]">
      {/* Top Header matching Figma screenshot */}
      <header className="px-5 py-3.5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30">
        <button
          onClick={() => setCurrentScreen('seller_dashboard')}
          className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <h3 className="text-sm font-bold text-stone-900">Your Boutique</h3>

        <button
          onClick={handleShareBoutique}
          className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
          title="Share Store Link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Boutique Info Card matching Figma */}
      <div className="p-6 text-center flex flex-col items-center bg-gradient-to-b from-pink-50/60 to-white border-b border-stone-100">
        <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/10 mb-3 border-2 border-white">
          <span className="text-3xl">👗</span>
        </div>

        <h2 className="font-serif-brand text-2xl font-bold text-stone-900">
          {boutiqueProfile.name}
        </h2>
        <p className="text-xs text-stone-500 mt-1 max-w-xs">
          {boutiqueProfile.tagline}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-stone-600">
          <span className="font-semibold">{products.length} Products</span>
          <span>·</span>
          <span className="text-pink-600 font-semibold">4.9 ★ Rating</span>
          <span>·</span>
          <span>Jaipur & Pan-India</span>
        </div>
      </div>

      {/* Featured Items Grid matching Figma */}
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-500" />
            Featured Items
          </h4>
          <span className="text-xs text-stone-400">Tap item to edit or discount</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProductId(product.id);
                setCurrentScreen('seller_product_detail');
              }}
              className="bg-white rounded-2xl border border-stone-200/80 p-2.5 shadow-sm hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50/40 mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.badge && (
                  <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md text-white shadow-sm ${
                    product.badge === 'Best Seller' ? 'bg-amber-500' :
                    product.badge === 'Limited Stock' ? 'bg-rose-500' : 'bg-pink-600'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Details matching Figma typography */}
              <div>
                <h5 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h5>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-pink-600 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-stone-400 line-through tabular-nums">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
