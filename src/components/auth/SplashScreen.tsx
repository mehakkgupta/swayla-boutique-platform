import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div 
      onClick={() => setCurrentScreen('onboarding')}
      className="relative flex-1 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex flex-col items-center justify-center p-6 text-white cursor-pointer select-none overflow-hidden min-h-[700px]"
    >
      {/* Background Boutique Doodles / SVG motifs */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex flex-wrap gap-8 p-6 items-center justify-around">
        <span className="text-4xl transform -rotate-12">👗</span>
        <span className="text-4xl transform rotate-12">👠</span>
        <span className="text-4xl transform -rotate-6">👜</span>
        <span className="text-4xl transform rotate-45">🕶️</span>
        <span className="text-4xl transform -rotate-15">💄</span>
        <span className="text-4xl transform rotate-6">💎</span>
        <span className="text-4xl transform -rotate-45">👒</span>
        <span className="text-4xl transform rotate-12">🪡</span>
        <span className="text-4xl transform -rotate-12">✨</span>
        <span className="text-4xl transform rotate-15">🧵</span>
        <span className="text-4xl transform -rotate-6">🎀</span>
      </div>

      {/* Floating Center Brand Mark */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/30 transform hover:scale-105 transition-transform">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-serif-brand text-5xl font-bold tracking-tight text-white drop-shadow-sm">
          Swayla
        </h1>
        <p className="text-pink-100 text-sm mt-3 font-medium tracking-wide">
          Style that speaks boutique
        </p>
      </div>

      {/* Bottom prompt */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentScreen('onboarding');
          }}
          className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-xs font-semibold tracking-wider uppercase transition-all"
        >
          Tap to Enter
        </button>
      </div>
    </div>
  );
};
