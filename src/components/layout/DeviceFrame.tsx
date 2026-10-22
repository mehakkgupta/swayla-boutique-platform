import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceMode, toasts, removeToast } = useApp();

  return (
    <div className="flex-1 flex flex-col items-center justify-start min-h-[calc(100vh-50px)] bg-stone-100/90 py-4 sm:py-8 px-2 sm:px-4 relative overflow-x-hidden">
      {deviceMode === 'mobile' ? (
        <div className="relative w-full max-w-[412px] h-[860px] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[9px] border-stone-850 flex flex-col overflow-hidden ring-1 ring-stone-900/10">
          {/* Hardware Notch / Island */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-white z-40 flex items-center justify-between px-6 select-none shrink-0 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-900 tracking-tight">9:41</span>
            
            {/* Dynamic Island pill */}
            <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-stone-950 ml-auto mr-2" />
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-1.5 text-stone-900">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5] fill-current" />
            </div>
          </div>

          {/* Screen Scrollable Viewport */}
          <div className="flex-1 pt-10 overflow-y-auto overflow-x-hidden bg-white relative flex flex-col">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="w-full h-5 bg-white flex items-center justify-center shrink-0 pb-1 z-30">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>
      ) : (
        /* Fluid Responsive Desktop Mode */
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-stone-200 min-h-[820px] flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </div>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className="pointer-events-auto bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 cursor-pointer"
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />}
            <div>
              <p className="text-xs font-semibold text-white">{toast.title}</p>
              {toast.message && <p className="text-[11px] text-stone-300 mt-0.5">{toast.message}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
