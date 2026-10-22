import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, KeyRound, Lock, CheckCircle2, RefreshCw } from 'lucide-react';

export const ForgotPasswordScreen: React.FC = () => {
  const { setCurrentScreen, addToast } = useApp();
  const [step, setStep] = useState<'otp' | 'new_password' | 'success'>('otp');
  const [otp, setOtp] = useState(['5', '2', '8', '9', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto advance focus
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('new_password');
    addToast({
      title: 'Code Verified',
      message: 'Please set your new secure password.',
      type: 'success'
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      addToast({
        title: 'Passwords Mismatch',
        message: 'Please confirm that your passwords match.',
        type: 'error'
      });
      return;
    }

    setStep('success');
    addToast({
      title: 'Password Updated!',
      message: 'You can now sign in with your new password.',
      type: 'success'
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white min-h-[700px]">
      <div>
        {/* Top Back Nav */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              if (step === 'new_password') setStep('otp');
              else setCurrentScreen('login');
            }}
            className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Account Recovery
          </span>
          <div className="w-9" />
        </div>

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
                Verify Phone Number
              </h2>
              <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                Enter the 6-digit OTP received on your registered number <span className="font-semibold text-stone-800">+91 ••••• ••210</span>
              </p>
            </div>

            {/* 6 OTP boxes */}
            <div className="flex justify-between gap-2 my-8">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-2xl bg-stone-50 border-2 border-stone-200 focus:border-pink-500 focus:bg-white focus:outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setOtp(['4', '1', '7', '8', '2', '3']);
                  addToast({ title: 'New OTP Sent', message: 'Demo OTP: 417823', type: 'info' });
                }}
                className="text-xs text-stone-500 hover:text-stone-800 inline-flex items-center gap-1.5"
              >
                <span>Didn't get the code?</span>
                <span className="text-pink-600 font-semibold hover:underline">Resend OTP</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all"
            >
              Verify & Proceed
            </button>
          </form>
        )}

        {step === 'new_password' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
                Reset your password
              </h2>
              <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                Choose a strong password with at least 8 characters.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                  required
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all mt-4"
            >
              Reset Password
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 font-display">
              Password Reset Complete!
            </h2>
            <p className="text-stone-500 text-xs max-w-xs mx-auto">
              Your credentials have been securely updated. You can now log into your Swayla boutique.
            </p>
            <button
              onClick={() => setCurrentScreen('login')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 transition-all mt-6"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-stone-400">
        Protected with 256-bit SSL encryption
      </div>
    </div>
  );
};
