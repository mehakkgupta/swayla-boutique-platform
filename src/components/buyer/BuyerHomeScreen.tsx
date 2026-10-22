import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TRENDING_STORIES, FEATURED_BOUTIQUES } from '../../data/mockData';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Heart, 
  Plus, 
  MapPin, 
  Star, 
  ChevronRight,
  Filter
} from 'lucide-react';

export const BuyerHomeScreen: React.FC = () => {
  const { 
    buyerName, 
    cartCount, 
    setIsCartOpen, 
    products, 
    setSelectedProductId, 
    setCurrentScreen,
    addToCart,
    searchQuery,
    setSearchQuery,
    toggleWishlist,
    isInWishlist,
    setIsCouponsModalOpen,
    applyCoupon 
  } = useApp();

  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('All');

  const categories = ['All', 'Dresses', 'Accessories', 'Jewelry', 'Bags', 'Shoes', 'Tops'];

  const filteredProducts = products.filter(product => {
    if (!product.isLive) return false;
    const matchesCategory = activeFilterCategory === 'All' || product.category === activeFilterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.boutiqueName && product.boutiqueName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5 pb-16">
        {/* Greeting matching Figma */}
        <div>
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
            Hello! {buyerName} 👋
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display mt-0.5 tracking-tight">
            Explore fresh picks from local boutiques!
          </h2>
        </div>

        {/* Search Bar matching Figma screenshot */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products or boutiques"
            className="w-full pl-9 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Promo Hero Banner matching Figma screenshot (50% off first transaction) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-5 text-white shadow-lg shadow-pink-500/20 flex items-center justify-between">
          <div className="space-y-1.5 z-10 max-w-[65%]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-200 bg-pink-900/30 px-2 py-0.5 rounded-full inline-block">
              Code: SWAYLA50
            </span>
            <h3 className="text-base sm:text-lg font-extrabold font-display leading-tight">
              Discount 50% for the first transaction
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => {
                  applyCoupon('SWAYLA50');
                  setIsCouponsModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-white text-pink-600 hover:bg-pink-50 rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Claim 50% Off
              </button>
              <button
                onClick={() => setIsCouponsModalOpen(true)}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors"
              >
                All Coupons
              </button>
            </div>
          </div>

          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md transform rotate-3 shrink-0">
            <img
              src="/src/assets/images/bohemian_dress_1792561618461.jpg"
              alt="Promo Model"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* "Trending Now" circular story bubbles matching Figma */}
        <div>
          <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
            Trending Now
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {TRENDING_STORIES.map(story => (
              <button
                key={story.name}
                type="button"
                onClick={() => setActiveStory(story.name)}
                className="flex flex-col items-center gap-1.5 group shrink-0"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${story.color} p-0.5 shadow-sm transition-transform group-hover:scale-105`}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xl">
                    {story.icon}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-stone-700">
                  {story.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Boutiques matching Figma screenshot */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Featured Boutiques
            </h4>
            <span className="text-xs text-pink-600 font-semibold cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="space-y-2">
            {FEATURED_BOUTIQUES.map(btq => (
              <div
                key={btq.id}
                onClick={() => setCurrentScreen('seller_boutique')}
                className="p-3 bg-stone-50 hover:bg-pink-50/40 rounded-2xl border border-stone-200/70 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={btq.avatar}
                    alt={btq.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-xs font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                        {btq.name}
                      </h5>
                      <span className="text-[10px] text-stone-400">· {btq.city}</span>
                    </div>
                    <p className="text-[10px] text-stone-500 line-clamp-1">{btq.tagline}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full block">
                    {btq.rating} ★
                  </span>
                  <span className="text-[9px] text-stone-400 mt-0.5 block">{btq.itemsCount} designs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Products Catalog Grid */}
        <div id="catalog-grid" className="pt-2">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilterCategory === cat
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                  setCurrentScreen('buyer_product_detail');
                }}
                className="bg-white rounded-2xl border border-stone-200/80 p-2.5 shadow-sm hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50/50 mb-2">
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
                  {/* Heart Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-500 flex items-center justify-center transition-all shadow-xs backdrop-blur-xs"
                    title={isInWishlist(product.id) ? 'Remove from saved' : 'Save item'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] text-stone-400 block">{product.boutiqueName}</span>
                  <h5 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h5>

                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-stone-100">
                    <span className="text-xs font-bold text-pink-600 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="w-7 h-7 rounded-lg bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                      title="Add to Bag"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};
