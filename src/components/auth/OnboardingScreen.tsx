import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Store, 
  BarChart3, 
  Truck, 
  ShoppingBag, 
  Palette, 
  ArrowRight 
} from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: 'Your store, your style',
      subtitle: 'Create your own online boutique in just a few taps, no tech skills needed.',
      cta: 'Next',
      illustration: (
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Soft background blob */}
          <div className="absolute w-56 h-56 rounded-full bg-pink-100/80 animate-pulse" />
          
          {/* Main phone mock */}
          <div className="relative z-10 w-36 h-52 bg-white rounded-2xl shadow-xl border-4 border-pink-400 p-2 flex flex-col items-center justify-between">
            <div className="w-8 h-1 bg-stone-200 rounded-full" />
            <div className="w-full flex-1 flex flex-col items-center justify-center p-2 text-center">
              <span className="text-3xl mb-1">👗</span>
              <span className="text-[10px] font-bold text-pink-600">Aura Boutique</span>
              <span className="text-[8px] text-stone-500">Live & Selling</span>
            </div>
            <div className="w-12 h-2 bg-pink-500 rounded-full" />
          </div>

          {/* Floating boutique icons */}
          <div className="absolute -top-2 left-6 bg-white p-2.5 rounded-2xl shadow-lg border border-pink-100 transform -rotate-12">
            <span className="text-xl">👠</span>
          </div>
          <div className="absolute top-4 -right-2 bg-white p-2.5 rounded-2xl shadow-lg border border-pink-100 transform rotate-12">
            <span className="text-xl">👜</span>
          </div>
          <div className="absolute bottom-6 -left-3 bg-white p-2 rounded-2xl shadow-lg border border-pink-100 transform rotate-6">
            <span className="text-lg">✨</span>
          </div>
        </div>
      )
    },
    {
      title: 'Brand it your way',
      subtitle: 'Upload your products, pick your vibe, and stand out with your own shop style.',
      cta: 'Next',
      illustration: (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-56 h-56 rounded-full bg-rose-100/80" />
          
          <div className="relative z-10 grid grid-cols-2 gap-2.5 w-48">
            <div className="bg-white p-3 rounded-xl shadow-md border border-pink-100 flex flex-col items-center">
              <Palette className="w-6 h-6 text-pink-500 mb-1" />
              <span className="text-[10px] font-semibold text-stone-800">Store Theme</span>
              <div className="flex gap-1 mt-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md border border-pink-100 flex flex-col items-center">
              <span className="text-2xl mb-1">📸</span>
              <span className="text-[10px] font-semibold text-stone-800">Product Studio</span>
              <span className="text-[8px] text-pink-600 font-medium">8K Catalogue</span>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-md border border-pink-100 flex flex-col items-center col-span-2">
              <span className="text-[11px] font-serif-brand font-bold text-pink-600">Aura · Handpicked</span>
              <span className="text-[8px] text-stone-400">Custom Domain & Socials</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Smart tools, zero stress',
      subtitle: 'Track orders, view customer insights, and manage your store, all in one place.',
      cta: 'Get Started',
      illustration: (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-56 h-56 rounded-full bg-pink-100/90" />
          
          <div className="relative z-10 w-52 space-y-2">
            <div className="bg-white p-3 rounded-xl shadow-md border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Today's Revenue</span>
                  <span className="text-xs font-bold text-stone-800">₹24,800 (+18%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl shadow-md border border-pink-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-stone-800 block">3 Orders Shipped</span>
                  <span className="text-[9px] text-emerald-600">Arriving today</span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">Live</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      setCurrentScreen('intro');
    }
  };

  const handleSkip = () => {
    setCurrentScreen('intro');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-pink-50/50 to-white min-h-[700px]">
      {/* Top Header with Skip */}
      <div className="flex justify-end">
        {slide < slides.length - 1 ? (
          <button
            onClick={handleSkip}
            className="text-xs font-medium text-stone-400 hover:text-stone-700 px-3 py-1 rounded-full hover:bg-stone-100 transition-colors"
          >
            Skip
          </button>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {/* Middle Illustration & Text */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="mb-6">
          {slides[slide].illustration}
        </div>

        <h2 className="text-2xl font-bold text-stone-900 mb-2.5 font-display tracking-tight max-w-xs">
          {slides[slide].title}
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm max-w-xs leading-relaxed">
          {slides[slide].subtitle}
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-6 pt-4">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                slide === i ? 'w-6 bg-pink-500' : 'w-2 bg-stone-200'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>{slides[slide].cta}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
