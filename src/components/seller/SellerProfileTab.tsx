import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  CreditCard, 
  Share2, 
  Bell, 
  Lock, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Check, 
  Edit3,
  Building
} from 'lucide-react';

export const SellerProfileTab: React.FC = () => {
  const { 
    boutiqueProfile, 
    updateBoutiqueProfile, 
    setCurrentScreen, 
    setRole, 
    addToast 
  } = useApp();

  const [activeModal, setActiveModal] = useState<'payout' | 'social' | 'password' | null>(null);

  // Payout Edit Form
  const [bankName, setBankName] = useState(boutiqueProfile.bankInfo.bankName);
  const [upiId, setUpiId] = useState(boutiqueProfile.bankInfo.upiId);

  // Social Links Form
  const [instagram, setInstagram] = useState(boutiqueProfile.socialLinks.instagram);
  const [whatsapp, setWhatsapp] = useState(boutiqueProfile.socialLinks.whatsapp);

  const handleToggleNotification = (key: 'newOrders' | 'messages' | 'lowStock') => {
    const nextVal = !boutiqueProfile.notifications[key];
    updateBoutiqueProfile({
      notifications: {
        ...boutiqueProfile.notifications,
        [key]: nextVal
      }
    });
  };

  const handleToggle2FA = () => {
    const nextVal = !boutiqueProfile.security.twoFactorEnabled;
    updateBoutiqueProfile({
      security: {
        twoFactorEnabled: nextVal
      }
    });
  };

  const handleLogout = () => {
    addToast({ title: 'Logged Out', message: 'Signed out of seller session.', type: 'info' });
    setCurrentScreen('intro');
  };

  return (
    <div className="space-y-5 pb-8">
      {/* Title */}
      <div>
        <h3 className="text-xl font-bold text-stone-900 font-display">Profile</h3>
        <p className="text-xs text-stone-500">Store settings and merchant configuration</p>
      </div>

      {/* Boutique Avatar & Member Badge matching Figma */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-pink-500/20">
          <Store className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-stone-900 text-base">{boutiqueProfile.name}</h4>
            <span className="text-[10px] bg-pink-100 text-pink-700 px-1.5 py-0.2 rounded font-semibold">
              Owner
            </span>
          </div>
          <p className="text-xs text-stone-500">Member since {boutiqueProfile.memberSince}</p>
          <p className="text-[11px] text-pink-600 font-medium">{boutiqueProfile.email}</p>
        </div>
      </div>

      {/* Section 1: Store Settings */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-3">
        <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Store Settings
        </h5>

        <div className="space-y-1 divide-y divide-stone-100">
          {/* Edit Boutique */}
          <button
            onClick={() => setCurrentScreen('seller_boutique')}
            className="w-full py-2.5 flex items-center justify-between text-left hover:text-pink-600 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Edit3 className="w-4 h-4 text-stone-400 group-hover:text-pink-500" />
              <span className="text-xs font-medium text-stone-800 group-hover:text-pink-600">
                Edit Boutique & Showcase
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Payout Info */}
          <button
            onClick={() => setActiveModal('payout')}
            className="w-full py-2.5 flex items-center justify-between text-left hover:text-pink-600 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-4 h-4 text-stone-400 group-hover:text-pink-500" />
              <span className="text-xs font-medium text-stone-800 group-hover:text-pink-600">
                Payout info ({boutiqueProfile.bankInfo.upiId})
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          {/* Social Media Links */}
          <button
            onClick={() => setActiveModal('social')}
            className="w-full py-2.5 flex items-center justify-between text-left hover:text-pink-600 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-stone-400 group-hover:text-pink-500" />
              <span className="text-xs font-medium text-stone-800 group-hover:text-pink-600">
                Social Media Links
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>

      {/* Section 2: Notification Settings matching Figma toggles */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-3">
        <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Notification Settings
        </h5>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-800">New Orders</span>
            <button
              onClick={() => handleToggleNotification('newOrders')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                boutiqueProfile.notifications.newOrders ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  boutiqueProfile.notifications.newOrders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-800">Messages</span>
            <button
              onClick={() => handleToggleNotification('messages')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                boutiqueProfile.notifications.messages ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  boutiqueProfile.notifications.messages ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-800">Low Stock</span>
            <button
              onClick={() => handleToggleNotification('lowStock')}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                boutiqueProfile.notifications.lowStock ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  boutiqueProfile.notifications.lowStock ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Security */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm space-y-3">
        <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Security
        </h5>

        <div className="space-y-1 divide-y divide-stone-100">
          <button
            onClick={() => setActiveModal('password')}
            className="w-full py-2.5 flex items-center justify-between text-left hover:text-pink-600 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-stone-400 group-hover:text-pink-500" />
              <span className="text-xs font-medium text-stone-800 group-hover:text-pink-600">
                Change Password
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-stone-400" />
              <span className="text-xs font-medium text-stone-800">
                Enable 2FA Authentication
              </span>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                boutiqueProfile.security.twoFactorEnabled ? 'bg-pink-500' : 'bg-stone-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  boutiqueProfile.security.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full py-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100/50 text-rose-600 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>

      {/* Payout Info Modal */}
      {activeModal === 'payout' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-stone-900">Merchant Payout Details</h4>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">UPI ID for Instant Payouts</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 text-xs text-stone-600 rounded-xl border border-stone-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateBoutiqueProfile({
                    bankInfo: { ...boutiqueProfile.bankInfo, bankName, upiId }
                  });
                  setActiveModal(null);
                }}
                className="flex-1 py-2 text-xs text-white bg-pink-600 rounded-xl font-semibold"
              >
                Save Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Links Modal */}
      {activeModal === 'social' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-stone-900">Social Media & WhatsApp</h4>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Instagram Handle</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">WhatsApp Business</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2 text-xs text-stone-600 rounded-xl border border-stone-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateBoutiqueProfile({
                    socialLinks: { ...boutiqueProfile.socialLinks, instagram, whatsapp }
                  });
                  setActiveModal(null);
                }}
                className="flex-1 py-2 text-xs text-white bg-pink-600 rounded-xl font-semibold"
              >
                Save Links
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
