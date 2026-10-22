import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType, UserRole } from '../../types';
import { 
  Smartphone, 
  Monitor, 
  GitFork, 
  User, 
  ShoppingBag, 
  Store, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  LogOut,
  X
} from 'lucide-react';

export const WorkflowNavigator: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    role, 
    isAuthenticated,
    logout,
    buyerName,
    boutiqueProfile,
    deviceMode, 
    setDeviceMode,
    cartCount,
    setIsCartOpen
  } = useApp();

  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);

  const screens: { id: ScreenType; label: string; roleTag: 'both' | 'seller' | 'buyer' }[] = [
    { id: 'login', label: '1. Sign In (Buyer ID / Seller ID)', roleTag: 'both' },
    { id: 'splash', label: '2. Splash Screen', roleTag: 'both' },
    { id: 'onboarding', label: '3. Onboarding (3 Steps)', roleTag: 'both' },
    { id: 'intro', label: '4. Intro & Role Choice', roleTag: 'both' },
    { id: 'buyer_register', label: '5. Buyer Register', roleTag: 'buyer' },
    { id: 'seller_register', label: '6. Seller Register & Store Setup', roleTag: 'seller' },
    { id: 'forgot_password', label: '7. Forgot Password & OTP', roleTag: 'both' },
    { id: 'buyer_dashboard', label: '8. Buyer App (Home, Explore, Orders, Profile)', roleTag: 'buyer' },
    { id: 'buyer_product_detail', label: '9. Buyer Product Detail (Full Size)', roleTag: 'buyer' },
    { id: 'seller_dashboard', label: '10. Seller Dashboard (Orders, Inventory, Chat)', roleTag: 'seller' },
    { id: 'seller_boutique', label: '11. Public Boutique Showcase', roleTag: 'seller' },
    { id: 'seller_product_detail', label: '12. Seller Product Management', roleTag: 'seller' }
  ];

  return (
    <>
      <header className="bg-stone-900 text-stone-100 border-b border-stone-800 text-xs px-3 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50 shadow-md">
        {/* Left: Brand & Workflow reference */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-pink-400">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-serif-brand text-sm sm:text-base text-white">Swayla</span>
            <span className="text-[10px] uppercase tracking-wider text-pink-300 font-normal px-1.5 py-0.5 bg-pink-950/60 border border-pink-500/30 rounded hidden sm:inline">
              Figma Engine
            </span>
          </div>

          <button
            onClick={() => setIsFlowModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 px-2.5 py-1 rounded-md transition-colors"
            title="View User Journey Workflow Chart"
          >
            <GitFork className="w-3.5 h-3.5 text-pink-400" />
            <span>Workflow Chart</span>
          </button>
        </div>

        {/* Center: Current Role Status / Screen Quick Jump */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-stone-800 px-3 py-1 rounded-full border border-stone-700">
              {role === 'buyer' ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[11px] text-stone-200">Buyer: <strong className="text-white">{buyerName}</strong></span>
                </>
              ) : (
                <>
                  <Store className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[11px] text-stone-200">Merchant: <strong className="text-white">{boutiqueProfile.name}</strong></span>
                </>
              )}
            </div>
          ) : (
            <span className="text-[11px] text-pink-300 bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-500/30">
              Sign In Required
            </span>
          )}

          {/* Quick Flow Jump Dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={currentScreen}
              onChange={(e) => setCurrentScreen(e.target.value as ScreenType)}
              aria-label="Select Screen View"
              className="bg-stone-800 text-stone-200 border border-stone-700 rounded-md px-2.5 py-1 text-xs appearance-none pr-7 focus:outline-none focus:border-pink-500 cursor-pointer"
            >
              {screens.map(s => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Right: Viewport Mode & Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-1 text-[11px] text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 px-2.5 py-1 rounded-md transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}

          {/* Device Viewport Mode */}
          <div className="flex items-center bg-stone-800 rounded-lg p-0.5 border border-stone-700">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded-md transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-stone-700 text-pink-400 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Figma Mobile Device Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`p-1 rounded-md transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-stone-700 text-pink-400 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Fluid Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Workflow Diagram Modal */}
      {isFlowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <GitFork className="w-5 h-5 text-pink-400" />
                  Swayla User Journey & Workflow Map
                </h3>
                <p className="text-xs text-stone-400">
                  Separated Buyer & Seller journeys with dedicated logins and order management.
                </p>
              </div>
              <button
                onClick={() => setIsFlowModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branch 1: Authentication */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                    Step 1 · Separate Authentication
                  </span>
                  <div className="space-y-2">
                    <div 
                      onClick={() => { setCurrentScreen('login'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">1. Sign In (Buyer ID or Seller ID)</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                    <div 
                      onClick={() => { setCurrentScreen('forgot_password'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">2. Forgot Password OTP Verification</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                </div>

                {/* Branch 2: Buyer Journey */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                    Step 2 · Buyer Experience
                  </span>
                  <div className="space-y-2">
                    <div 
                      onClick={() => { setCurrentScreen('buyer_dashboard'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">Buyer App (Home, Explore, Orders, Profile)</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                    <div 
                      onClick={() => { setCurrentScreen('buyer_product_detail'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">Product Screen (Full Size Image & Buy Now)</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                </div>

                {/* Branch 3: Seller Journey */}
                <div className="bg-stone-800/60 p-4 rounded-xl border border-stone-700/80 space-y-3 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                    Step 3 · Seller Boutique Management
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div 
                      onClick={() => { setCurrentScreen('seller_dashboard'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">Seller Dashboard</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                    <div 
                      onClick={() => { setCurrentScreen('seller_boutique'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">Boutique Showcase</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                    <div 
                      onClick={() => { setCurrentScreen('seller_product_detail'); setIsFlowModalOpen(false); }}
                      className="p-2.5 rounded-lg bg-stone-700/50 hover:bg-pink-900/40 cursor-pointer flex items-center justify-between border border-stone-600/40"
                    >
                      <span className="font-medium text-stone-200">Seller Product Screen</span>
                      <ArrowRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/40 flex justify-between items-center text-xs text-stone-400">
              <span>App enforces separate authentication for buyer and seller</span>
              <button
                onClick={() => setIsFlowModalOpen(false)}
                className="px-4 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
