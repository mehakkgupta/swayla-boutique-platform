import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FEATURED_BOUTIQUES } from '../../data/mockData';
import { 
  Search, 
  Sparkles, 
  Filter, 
  MapPin, 
  Star, 
  Plus, 
  Tag,
  ChevronRight,
  Maximize2,
  Heart
} from 'lucide-react';

export const BuyerExploreTab: React.FC = () => {
  const { 
    products, 
    setSelectedProductId, 
    setCurrentScreen, 
    addToCart,
    searchQuery,
    setSearchQuery,
    toggleWishlist,
    isInWishlist 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const categories = ['All', 'Dresses', 'Accessories', 'Jewelry', 'Bags', 'Shoes', 'Tops'];

  const filteredProducts = products.filter(p => {
    if (!p.isLive) return false;
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesPrice = p.price <= maxPrice;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.boutiqueName && p.boutiqueName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesPrice && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Search Header */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200/80 shadow-xs space-y-3">
        <h2 className="text-xl font-bold font-display text-stone-900">Explore Collections</h2>
        
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sarees, dresses, boots, jewelry..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          <span className="text-[11px] font-semibold text-stone-500">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-36 accent-pink-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Featured Boutiques Mini Carousel */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
            Verified Boutiques
          </span>
          <span className="text-xs text-pink-600 font-semibold">{FEATURED_BOUTIQUES.length} Studios</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {FEATURED_BOUTIQUES.map(b => (
            <div
              key={b.id}
              className="bg-white p-2.5 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center shadow-xs"
            >
              <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 mb-1" />
              <h5 className="text-[11px] font-bold text-stone-900 truncate w-full">{b.name}</h5>
              <span className="text-[9px] text-stone-400">{b.city}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-stone-900">
            {filteredProducts.length} Fashion Pieces Found
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProductId(product.id);
                setCurrentScreen('buyer_product_detail');
              }}
              className="bg-white rounded-3xl border border-stone-200/80 p-2.5 shadow-sm hover:border-pink-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 mb-2">
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
