import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CardDetailsEntry, CardDetailsState } from './CardDetailsEntry';
import { CreditCard, X, Plus, Trash2, CheckCircle2, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

export const SavedCardsModal: React.FC = () => {
  const { 
    isSavedCardsModalOpen, 
    setIsSavedCardsModalOpen, 
    savedCards, 
    addSavedCard, 
    deleteSavedCard,
    setDefaultCard,
    buyerName 
  } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCardData, setNewCardData] = useState<CardDetailsState>({
    cardNumber: '',
    cardholderName: buyerName ? buyerName.toUpperCase() : 'MEHAK SHARMA',
    expiryDate: '',
    cvv: '',
    saveCard: true
  });

  if (!isSavedCardsModalOpen) return null;

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardData.cardNumber || !newCardData.expiryDate || !newCardData.cvv) return;

    const [month, year] = newCardData.expiryDate.split('/');
    const cleanNum = newCardData.cardNumber.replace(/\D/g, '');
    let brand: 'visa' | 'mastercard' | 'rupay' | 'amex' = 'visa';
    if (/^5/.test(cleanNum) || /^2/.test(cleanNum)) brand = 'mastercard';
    if (/^6/.test(cleanNum)) brand = 'rupay';
    if (/^3/.test(cleanNum)) brand = 'amex';

    addSavedCard({
      cardNumber: `•••• •••• •••• ${cleanNum.slice(-4)}`,
      cardholderName: newCardData.cardholderName || 'CARDHOLDER',
      expiryMonth: month || '12',
      expiryYear: year || '28',
      brand,
      isDefault: savedCards.length === 0,
      bankName: `${brand.toUpperCase()} Premium Card`
    });

    setIsAddingNew(false);
    setNewCardData({
      cardNumber: '',
      cardholderName: buyerName ? buyerName.toUpperCase() : 'MEHAK SHARMA',
      expiryDate: '',
      cvv: '',
      saveCard: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            {isAddingNew ? (
              <button
                onClick={() => setIsAddingNew(false)}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {isAddingNew ? 'Enter Card Details' : 'Saved Payment Cards'}
              </h3>
              <p className="text-[10px] text-stone-500">
                {isAddingNew ? 'Add credit or debit card securely' : `${savedCards.length} Cards Saved for Express Checkout`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSavedCardsModalOpen(false);
              setIsAddingNew(false);
            }}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isAddingNew ? (
            <form onSubmit={handleSaveCard} className="space-y-4">
              <CardDetailsEntry
                cardDetails={newCardData}
                setCardDetails={setNewCardData}
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!newCardData.cardNumber || !newCardData.expiryDate || !newCardData.cvv}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-pink-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Save Card & Set Active</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {savedCards.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto">
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">No Cards Saved</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Save your Visa, Mastercard, or RuPay card to enjoy instant 1-click checkout.
                  </p>
                </div>
              ) : (
                savedCards.map(card => (
                  <div
                    key={card.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      card.isDefault
                        ? 'border-pink-500 bg-pink-50/40 ring-2 ring-pink-100 shadow-xs'
                        : 'border-stone-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] tracking-wider uppercase shadow-xs">
                          {card.brand}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-stone-900">
                              {card.cardNumber}
                            </span>
                            {card.isDefault && (
                              <span className="text-[9px] bg-pink-100 text-pink-700 font-bold px-1.5 py-0.2 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-500 block mt-0.5">
                            {card.cardholderName} · Exp: {card.expiryMonth}/{card.expiryYear}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {!card.isDefault && (
                          <button
                            onClick={() => setDefaultCard(card.id)}
                            className="text-[10px] font-bold text-pink-600 hover:underline px-1.5 py-1"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteSavedCard(card.id)}
                          className="text-stone-400 hover:text-rose-500 p-1"
                          title="Remove card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Add New Card Button */}
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3 border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-2xl text-pink-600 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-pink-50/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Card</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted with bank-grade 256-bit security</span>
          </div>
          <button
            onClick={() => setIsSavedCardsModalOpen(false)}
            className="text-stone-700 font-bold hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
