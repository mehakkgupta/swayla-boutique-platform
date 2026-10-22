import React from 'react';
import { useApp } from '../../context/AppContext';
import { BuyerTab } from '../../types';
import { BuyerHomeScreen } from './BuyerHomeScreen';
import { BuyerExploreTab } from './BuyerExploreTab';
import { BuyerOrdersTab } from './BuyerOrdersTab';
import { BuyerProfileTab } from './BuyerProfileTab';
import { 
  Home, 
  Compass, 
  Package, 
  User, 
  ShoppingBag, 
  Heart 
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { 
    buyerTab, 
    setBuyerTab, 
    cartCount, 
    setIsCartOpen,
    buyerOrders,
    wishlist,
    setIsSavedItemsModalOpen 
  } = useApp();

  const activeOrdersCount = buyerOrders.filter(o => o.status !== 'delivered').length;

  const tabs: { id: BuyerTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'profile', label: 'Account', icon: User }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-stone-50/50 min-h-[700px] relative">
      {/* Top Header */}
      <header className="px-5 py-3.5 bg-white border-b border-stone-100 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-pink-600">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
          <h1 className="font-serif-brand text-2xl font-bold tracking-tight text-stone-900">
            Swayla
          </h1>
          <span className="text-[10px] text-pink-600 font-semibold bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100 ml-1">
            Shopper
          </span>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist quick link */}
          <button
            onClick={() => setIsSavedItemsModalOpen(true)}
            className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-rose-500 transition-colors relative"
            title="Saved Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-pink-600 transition-colors"
            title="Shopping Bag"
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

      {/* Main Tab View */}
      <main className="flex-1 p-4 sm:p-5 overflow-y-auto">
        {buyerTab === 'home' && <BuyerHomeScreen />}
        {buyerTab === 'explore' && <BuyerExploreTab />}
        {buyerTab === 'orders' && <BuyerOrdersTab />}
        {buyerTab === 'profile' && <BuyerProfileTab />}
      </main>

      {/* Buyer Dedicated Bottom Navigation Bar */}
      <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = buyerTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setBuyerTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-pink-600' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.id === 'orders' && activeOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeOrdersCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
