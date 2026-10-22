import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Lock, Mail, Store, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    setRole, 
    setIsAuthenticated, 
    setBuyerName,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  
  // Buyer fields
  const [buyerIdentifier, setBuyerIdentifier] = useState('mehak.buyer@swayla.com');
  const [buyerPassword, setBuyerPassword] = useState('buyer123');
  
  // Seller fields
  const [sellerIdentifier, setSellerIdentifier] = useState('aura.seller@swayla.com');
  const [sellerPassword, setSellerPassword] = useState('seller123');

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (activeTab === 'buyer') {
      if (!buyerIdentifier || !buyerPassword) {
        setErrorMessage('Please enter your Buyer Login ID and password.');
        return;
      }
      setRole('buyer');
      setIsAuthenticated(true);
      setBuyerName(buyerIdentifier.includes('mehak') ? 'Mehak' : 'Shopper');
      setCurrentScreen('buyer_dashboard');
      addToast({
        title: 'Welcome back!',
        message: 'Logged in as Buyer (Mehak Sharma).',
        type: 'success'
      });
    } else {
      if (!sellerIdentifier || !sellerPassword) {
        setErrorMessage('Please enter your Boutique Seller ID and password.');
        return;
      }
      setRole('seller');
      setIsAuthenticated(true);
      setCurrentScreen('seller_dashboard');
      addToast({
        title: 'Welcome to your Merchant Console!',
        message: 'Signed in as Aura Boutique.',
        type: 'success'
      });
    }
  };

  const handleQuickDemo = (type: 'buyer' | 'seller') => {
    setActiveTab(type);
    if (type === 'buyer') {
      setBuyerIdentifier('mehak.buyer@swayla.com');
      setBuyerPassword('buyer123');
    } else {
      setSellerIdentifier('aura.seller@swayla.com');
      setSellerPassword('seller123');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 bg-white min-h-[700px]">
      <div>
        {/* Brand Header */}
        <div className="text-center pt-2 pb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-rose-500 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-pink-500/25 mb-3">
            <span className="font-serif-brand font-bold text-2xl">S</span>
          </div>
          <h1 className="font-serif-brand text-3xl font-bold tracking-tight text-stone-900">
            Swayla
          </h1>
          <p className="text-stone-500 text-xs mt-1">
            Your boutique fashion & merchant ecosystem
          </p>
        </div>

        {/* Dedicated Separate Login ID Tabs matching User Request */}
        <div className="flex bg-stone-100/90 p-1 rounded-2xl mb-6 border border-stone-200/60">
          <button
            type="button"
            onClick={() => { setActiveTab('buyer'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'buyer'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyer Login</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('seller'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'seller'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Seller Login</span>
          </button>
        </div>

        {/* Tab Description */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-stone-900 font-display">
            {activeTab === 'buyer' ? 'Sign in to Shop' : 'Boutique Merchant Portal'}
          </h2>
          <p className="text-stone-500 text-xs mt-0.5">
            {activeTab === 'buyer'
              ? 'Access your orders, saved addresses, wishlist & bag.'
              : 'Manage live store inventory, orders, chat & revenues.'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {activeTab === 'buyer' ? (
            /* Buyer Login Fields */
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Buyer Login ID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={buyerIdentifier}
                  onChange={(e) => setBuyerIdentifier(e.target.value)}
                  placeholder="Enter your buyer email or phone"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                  required
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          ) : (
            /* Seller Login Fields */
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Boutique Seller ID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={sellerIdentifier}
                  onChange={(e) => setSellerIdentifier(e.target.value)}
                  placeholder="Enter boutique merchant ID or email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                  required
                />
                <Store className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setCurrentScreen('forgot_password')}
                className="text-xs text-pink-600 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={activeTab === 'buyer' ? buyerPassword : sellerPassword}
                onChange={(e) => activeTab === 'buyer' ? setBuyerPassword(e.target.value) : setSellerPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                required
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 1-Click Fast Fill credentials helper */}
          <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-[11px] text-stone-500">
              Demo Credentials:
            </span>
            <button
              type="button"
              onClick={() => handleQuickDemo(activeTab)}
              className="text-pink-600 font-bold hover:underline flex items-center gap-1 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Fill {activeTab === 'buyer' ? 'Buyer ID' : 'Seller ID'}</span>
            </button>
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{activeTab === 'buyer' ? 'Sign In as Buyer' : 'Sign In as Seller'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Bottom Registration Link */}
      <div className="pt-6 pb-2 text-center text-xs text-stone-500 border-t border-stone-100">
        {activeTab === 'buyer' ? (
          <p>
            Don't have a buyer account?{' '}
            <button
              onClick={() => { setRole('buyer'); setCurrentScreen('buyer_register'); }}
              className="text-pink-600 font-bold hover:underline"
            >
              Register as Buyer
            </button>
          </p>
        ) : (
          <p>
            New merchant?{' '}
            <button
              onClick={() => { setRole('seller'); setCurrentScreen('seller_register'); }}
              className="text-pink-600 font-bold hover:underline"
            >
              Create Boutique Account
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
