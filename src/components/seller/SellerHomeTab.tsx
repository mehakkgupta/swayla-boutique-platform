import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Eye, 
  Package, 
  ArrowUpRight, 
  Store, 
  Plus, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const SellerHomeTab: React.FC = () => {
  const { 
    boutiqueProfile, 
    setCurrentScreen, 
    products, 
    orders, 
    setIsAddProductOpen, 
    setSellerTab,
    setSelectedProductId 
  } = useApp();

  const totalOrdersCount = orders.filter(o => !o.isAbandoned).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const totalViews = products.reduce((acc, p) => acc + p.views, 150);

  return (
    <div className="space-y-6 pb-6">
      {/* Boutique Welcome Banner */}
      <div className="flex items-center justify-between bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/5 p-4 rounded-3xl border border-pink-200/60">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-stone-900 text-base">{boutiqueProfile.name}</h3>
              <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 font-semibold rounded">
                Verified
              </span>
            </div>
            <p className="text-xs text-stone-500">{boutiqueProfile.tagline}</p>
          </div>
        </div>

        {/* View Boutique Button matching Figma */}
        <button
          onClick={() => setCurrentScreen('seller_boutique')}
          className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>View Boutique</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3 Metric Cards matching Figma Dashboard Screenshot */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Orders Card */}
        <div 
          onClick={() => setSellerTab('orders')}
          className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-pink-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold text-stone-600">Orders</span>
            <div className="w-6 h-6 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <ShoppingBag className="w-3 h-3" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold text-stone-900 tabular-nums">25</span>
            <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+10% increase</span>
            </div>
          </div>
        </div>

        {/* Views Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-pink-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold text-stone-600">Views</span>
            <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Eye className="w-3 h-3" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold text-stone-900 tabular-nums">150</span>
            <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+5% increase</span>
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div 
          onClick={() => setSellerTab('products')}
          className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-pink-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold text-stone-600">Products</span>
            <div className="w-6 h-6 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Package className="w-3 h-3" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold text-stone-900 tabular-nums">{products.length}</span>
            <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>+20% increase</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="flex items-center justify-between bg-stone-900 text-white p-4 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Expand Your Collection</h4>
            <p className="text-[11px] text-stone-400">Add trendy items to boost festival sales</p>
          </div>
        </div>
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Pending Orders Alert */}
      {pendingOrdersCount > 0 && (
        <div 
          onClick={() => setSellerTab('orders')}
          className="bg-amber-50 border border-amber-200/80 p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-amber-100/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                {pendingOrdersCount} New Orders Awaiting Acceptance
              </span>
              <span className="text-[11px] text-amber-700">
                Tap to review customer addresses and confirm dispatch
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-700" />
        </div>
      )}

      {/* Featured Products Quick Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-stone-900">Top Performing Items</h4>
          <button 
            onClick={() => setCurrentScreen('seller_boutique')}
            className="text-xs font-semibold text-pink-600 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.slice(0, 4).map(product => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProductId(product.id);
                setCurrentScreen('seller_product_detail');
              }}
              className="bg-white rounded-2xl border border-stone-200/80 p-2.5 hover:border-pink-300 transition-all cursor-pointer group shadow-sm flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50/50 mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback container
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {product.badge && (
                  <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md text-white ${
                    product.badge === 'Best Seller' ? 'bg-amber-500' :
                    product.badge === 'Limited Stock' ? 'bg-rose-500' : 'bg-pink-600'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-stone-900 line-clamp-1">{product.name}</h5>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <span>In Stock:</span>
                    <span className="font-semibold text-stone-800">{product.stockCount} pcs</span>
                  </div>
                </div>
                <div className="mt-1.5 flex items-center justify-between pt-1 border-t border-stone-100">
                  <span className="text-xs font-bold text-stone-900 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-pink-600 font-semibold group-hover:underline">
                    Manage
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
