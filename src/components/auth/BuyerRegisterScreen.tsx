import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, User, Mail, Lock, ShoppingBag, Eye, EyeOff } from 'lucide-react';

export const BuyerRegisterScreen: React.FC = () => {
  const { setCurrentScreen, setRole, setBuyerName, addToast } = useApp();
  const [fullName, setFullName] = useState('Mehak Sharma');
  const [emailOrPhone, setEmailOrPhone] = useState('mehak.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      addToast({ title: 'Please accept Terms', message: 'Terms and Conditions agreement is required.', type: 'error' });
      return;
    }

    setRole('buyer');
    setBuyerName(fullName.split(' ')[0] || 'Shopper');
    setCurrentScreen('buyer_home');
    addToast({
      title: `Welcome to Swayla, ${fullName}!`,
      message: 'Explore exclusive picks from curated local boutiques.',
      type: 'success'
    });
  };

  const handleGoogleSignup = () => {
    setRole('buyer');
    setBuyerName('Mehak');
    setCurrentScreen('buyer_home');
    addToast({
      title: 'Google Account Connected',
      message: 'Logged in as Mehak (Google Authenticated).',
      type: 'success'
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white min-h-[700px]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentScreen('intro')}
            className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Buyer Account
          </span>
          <div className="w-9" />
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
            Create Your Account
          </h2>
          <p className="text-stone-500 text-xs mt-1">
            Discover bespoke fashion & handcrafted collections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                required
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter your email or phone"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                required
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create Password"
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

          <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-pink-600 focus:ring-pink-500 border-stone-300"
            />
            <span className="text-xs text-stone-500 leading-snug">
              I accept the <a href="#terms" className="text-pink-600 underline">Terms and Conditions</a> and Privacy Policy.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue to Shopping</span>
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] text-stone-400 uppercase tracking-wider">
            Or sign up with
          </span>
        </div>

        <button
          onClick={handleGoogleSignup}
          type="button"
          className="w-full py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-stone-500">
        Already have an account?{' '}
        <button
          onClick={() => setCurrentScreen('login')}
          className="text-pink-600 font-semibold hover:underline"
        >
          Log In
        </button>
      </div>
    </div>
  );
};
