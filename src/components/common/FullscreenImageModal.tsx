import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

export const FullscreenImageModal: React.FC = () => {
  const { fullscreenImage, setFullscreenImage } = useApp();

  if (!fullscreenImage) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={() => setFullscreenImage(null)}
    >
      {/* Top Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between text-white py-2 z-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-pink-400 font-bold bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30">
            Full Size Preview
          </span>
          <span className="text-sm font-semibold text-stone-200 truncate max-w-xs sm:max-w-md">
            {fullscreenImage.title}
          </span>
        </div>

        <button
          onClick={() => setFullscreenImage(null)}
          className="w-10 h-10 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
          title="Close Full Screen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full Size Image */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center p-2 overflow-hidden" onClick={e => e.stopPropagation()}>
        <img
          src={fullscreenImage.url}
          alt={fullscreenImage.title}
          className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl filter drop-shadow-2xl transition-transform"
        />
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-stone-400 pb-2 z-10" onClick={e => e.stopPropagation()}>
        <span>Tap outside or press close to exit full screen view</span>
      </div>
    </div>
  );
};
