import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Search, 
  Package, 
  ChevronRight, 
  Check, 
  Sparkles,
  ArrowUpDown,
  Filter
} from 'lucide-react';

export const SellerInventoryTab: React.FC = () => {
  const { 
    products, 
    updateProduct, 
    setSelectedProductId, 
    setCurrentScreen, 
    setIsAddProductOpen 
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Dresses', 'Accessories', 'Jewelry', 'Bags', 'Shoes', 'Tops'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdjustStock = (productId: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const newCount = Math.max(0, prod.stockCount + delta);
    updateProduct(productId, { 
      stockCount: newCount,
      inStock: newCount > 0
    });
  };

  return (
    <div className="space-y-4 pb-16 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-stone-900 font-display">Inventory</h3>
          <p className="text-xs text-stone-500">
            {products.length} Items Listed · {products.reduce((acc, p) => acc + p.stockCount, 0)} units total
          </p>
        </div>

        <button
          onClick={() => setIsAddProductOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-semibold shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-2.5">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items by name, tag, or material..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Inventory Grid matching Figma */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProductId(product.id);
              setCurrentScreen('seller_product_detail');
            }}
            className="bg-white rounded-2xl border border-stone-200/80 p-2.5 hover:border-pink-300 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50 mb-2">
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

              {/* Status pill (Live / Draft) */}
              <span className={`absolute bottom-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                product.isLive ? 'bg-emerald-500/90 text-white' : 'bg-stone-800/80 text-stone-200'
              }`}>
                {product.isLive ? 'Live' : 'Hidden'}
              </span>
            </div>

            {/* Product Meta */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                {product.name}
              </h4>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="font-bold text-pink-600 tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className={`text-[11px] font-semibold tabular-nums ${
                  product.stockCount <= 5 ? 'text-rose-600' : 'text-stone-500'
                }`}>
                  {product.stockCount} in stock
                </span>
              </div>
            </div>

            {/* Quick Stock Controls */}
            <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] text-stone-400 font-medium">Stock:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => handleAdjustStock(product.id, -1, e)}
                  className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center transition-colors"
                  title="Decrease Stock"
                >
                  -
                </button>
                <span className="text-xs font-bold text-stone-800 tabular-nums px-1">
                  {product.stockCount}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleAdjustStock(product.id, 1, e)}
                  className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center transition-colors"
                  title="Increase Stock"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Product button matching Figma screenshot bottom button */}
      <div className="fixed bottom-20 left-0 right-0 max-w-[390px] mx-auto px-6 z-20 pointer-events-none">
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="pointer-events-auto w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs shadow-xl shadow-pink-500/30 hover:from-pink-600 hover:to-rose-600 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};
