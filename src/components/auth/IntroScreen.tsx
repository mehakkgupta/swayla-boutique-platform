import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Store, UserCheck } from 'lucide-react';

export const IntroScreen: React.FC = () => {
  const { setCurrentScreen, setRole } = useApp();

  const handleRegisterAsBuyer = () => {
    setRole('buyer');
    setCurrentScreen('buyer_register');
  };

  const handleRegisterAsSeller = () => {
    setRole('seller');
    setCurrentScreen('seller_register');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-white via-pink-50/30 to-pink-50/60 min-h-[700px]">
      {/* Top Brand Header */}
      <div className="text-center pt-4">
        <h1 className="font-serif-brand text-4xl font-bold tracking-tight text-pink-600">
          Swayla
        </h1>
        <p className="text-stone-500 text-xs font-medium mt-1 tracking-wide">
          Your boutique, online.
        </p>
      </div>

      {/* Center Boutique Illustration */}
      <div className="flex flex-col items-center justify-center my-auto py-4">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background circles */}
          <div className="absolute w-52 h-52 rounded-full bg-pink-100" />
          
          {/* Stylized boutique hanger & rack */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Rack stand */}
            <div className="w-44 h-48 border-t-4 border-stone-800 rounded-t-lg relative flex justify-around px-4 pt-3">
              {/* Hanging items */}
              <div className="flex flex-col items-center transform -rotate-3 hover:scale-105 transition-transform">
                <span className="text-xs text-stone-500">△</span>
                <span className="text-4xl">👗</span>
              </div>
              <div className="flex flex-col items-center transform rotate-3 hover:scale-105 transition-transform">
                <span className="text-xs text-stone-500">△</span>
                <span className="text-3xl">🧥</span>
              </div>
              <div className="flex flex-col items-center transform -rotate-1 hover:scale-105 transition-transform">
                <span className="text-xs text-stone-500">△</span>
                <span className="text-3xl">👚</span>
              </div>

              {/* Floor items */}
              <div className="absolute -bottom-2 flex gap-4 items-center">
                <span className="text-2xl">👜</span>
                <span className="text-xl">👠</span>
                <span className="text-2xl">🛍️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-4 pb-2">
        {/* Already have an account */}
        <p className="text-center text-xs text-stone-500">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentScreen('login')}
            className="text-pink-600 font-semibold hover:underline"
          >
            Log In
          </button>
        </p>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleRegisterAsBuyer}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-pink-50/50 text-pink-600 border border-pink-200 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Register as Buyer</span>
          </button>

          <button
            onClick={handleRegisterAsSeller}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4" />
            <span>Register as Seller</span>
          </button>
        </div>
      </div>
    </div>
  );
};
