import React from 'react';
import { useApp } from '../../context/AppContext';
import { SellerTab } from '../../types';
import { SellerHomeTab } from './SellerHomeTab';
import { SellerOrdersTab } from './SellerOrdersTab';
import { SellerInventoryTab } from './SellerInventoryTab';
import { SellerMessagesTab } from './SellerMessagesTab';
import { SellerProfileTab } from './SellerProfileTab';
import { 
  Home, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  User, 
  Menu, 
  Store,
  ExternalLink
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const { 
    sellerTab, 
    setSellerTab, 
    boutiqueProfile, 
    setCurrentScreen,
    orders,
    conversations 
  } = useApp();

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const unreadMessagesCount = conversations.filter(c => c.unread).length;

  const tabs: { id: SellerTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-stone-50/60 min-h-[700px] relative">
      {/* Top Header matching Figma screenshot */}
      <header className="px-5 py-3.5 bg-white border-b border-stone-200/70 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setSellerTab('profile')}
            className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900"
          >
            <Menu className="w-4 h-4" />
          </button>
          <h2 className="text-sm font-bold text-stone-900">Dashboard</h2>
        </div>

        {/* Boutique Icon & Seller Tag */}
        <div 
          onClick={() => setCurrentScreen('seller_boutique')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="text-right">
            <span className="text-xs font-bold text-stone-800 block group-hover:text-pink-600 transition-colors">
              {boutiqueProfile.name}
            </span>
            <span className="text-[10px] text-pink-600 font-semibold uppercase tracking-wider">
              Seller
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
            <Store className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Tab View Container */}
      <main className="flex-1 p-4 sm:p-5 overflow-y-auto">
        {sellerTab === 'home' && <SellerHomeTab />}
        {sellerTab === 'orders' && <SellerOrdersTab />}
        {sellerTab === 'products' && <SellerInventoryTab />}
        {sellerTab === 'messages' && <SellerMessagesTab />}
        {sellerTab === 'profile' && <SellerProfileTab />}
      </main>

      {/* Fixed Bottom Navigation Bar matching Figma screenshots */}
      <nav className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = sellerTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setSellerTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive ? 'text-pink-600' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.id === 'orders' && pendingOrdersCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {pendingOrdersCount}
                  </span>
                )}
                {tab.id === 'messages' && unreadMessagesCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {unreadMessagesCount}
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
