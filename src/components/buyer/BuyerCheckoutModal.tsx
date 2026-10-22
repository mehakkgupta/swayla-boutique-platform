import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { CardDetailsEntry, CardDetailsState } from './CardDetailsEntry';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  User, 
  Tag,
  ArrowRight,
  ExternalLink,
  Lock,
  ArrowLeft,
  Check,
  Gift,
  PackageCheck,
  QrCode
} from 'lucide-react';

export const BuyerCheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartCount,
    clearCart, 
    cartTotal, 
    appliedCoupon,
    couponDiscountAmount,
    shippingFee,
    finalOrderTotal,
    createOrder,
    buyerName,
    setCurrentScreen,
    setRole,
    setSellerTab,
    addToast,
    savedCards,
    addSavedCard 
  } = useApp();

  const [step, setStep] = useState<'details' | 'card_entry' | 'processing' | 'success'>('details');
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [processingStage, setProcessingStage] = useState<number>(1);

  // Delivery Form Fields
  const [name, setName] = useState(buyerName || 'Mehak Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('42 Blossom Crest, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');
  
  // Payment Method: 'upi' | 'card' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('card');
  const [selectedCardId, setSelectedCardId] = useState<string>(savedCards[0]?.id || 'new');
  
  // New Card Form Details
  const [cardDetails, setCardDetails] = useState<CardDetailsState>({
    cardNumber: '4532 8901 2345 8921',
    cardholderName: buyerName ? buyerName.toUpperCase() : 'MEHAK SHARMA',
    expiryDate: '08/28',
    cvv: '842',
    saveCard: true
  });

  // Processing Animation Timer
  useEffect(() => {
    if (step === 'processing') {
      const timer1 = setTimeout(() => setProcessingStage(2), 600);
      const timer2 = setTimeout(() => setProcessingStage(3), 1100);
      const timer3 = setTimeout(() => {
        finalizeOrder();
      }, 1600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [step]);

  if (!isCheckoutOpen) return null;

  const handleStartPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // If card payment and new card, check validations
    if (paymentMethod === 'card' && selectedCardId === 'new') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        addToast({
          title: 'Card Details Required',
          message: 'Please complete the card number, expiry, and CVV.',
          type: 'warning'
        });
        return;
      }
    }

    // Start animated processing
    setProcessingStage(1);
    setStep('processing');
  };

  const finalizeOrder = () => {
    // If card was entered and user chose to save it
    if (paymentMethod === 'card' && selectedCardId === 'new' && cardDetails.saveCard) {
      const cleanNum = cardDetails.cardNumber.replace(/\D/g, '');
      const [m, y] = cardDetails.expiryDate.split('/');
      let brand: 'visa' | 'mastercard' | 'rupay' | 'amex' = 'visa';
      if (/^5/.test(cleanNum) || /^2/.test(cleanNum)) brand = 'mastercard';
      if (/^6/.test(cleanNum)) brand = 'rupay';
      if (/^3/.test(cleanNum)) brand = 'amex';

      addSavedCard({
        cardNumber: `•••• •••• •••• ${cleanNum.slice(-4)}`,
        cardholderName: cardDetails.cardholderName || 'CARDHOLDER',
        expiryMonth: m || '12',
        expiryYear: y || '28',
        brand,
        bankName: `${brand.toUpperCase()} Card`
      });
    }

    // Generate Order
    const newOrd = createOrder({
      customerName: name,
      customerPhone: phone,
      customerEmail: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      status: 'pending',
      items: cart.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      })),
      totalAmount: finalOrderTotal,
      address: {
        street,
        city,
        state,
        pincode
      }
    });

    setCreatedOrder(newOrd);
    setStep('success');
    clearCart();

    // Trigger Multi-burst Celebratory Confetti
    try {
      // First burst - center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF4D8D', '#E63E6D', '#FFD700', '#FFFFFF', '#F43F5E']
      });
      // Second burst - left cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#FF4D8D', '#FFB6C1', '#FFD700']
        });
      }, 250);
      // Third burst - right cannon
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#E63E6D', '#FFFFFF', '#FFD700']
        });
      }, 400);
    } catch {
      // ignore
    }

    addToast({
      title: 'Order Confirmed!',
      message: `Order ${newOrd.orderNumber} placed for ₹${finalOrderTotal.toLocaleString('en-IN')}!`,
      type: 'success'
    });
  };

  const handleViewInSellerDashboard = () => {
    setIsCheckoutOpen(false);
    setRole('seller');
    setSellerTab('orders');
    setCurrentScreen('seller_dashboard');
    addToast({
      title: 'Switched to Seller View',
      message: `See ${createdOrder?.orderNumber} awaiting acceptance in Orders tab!`,
      type: 'info'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            {step === 'card_entry' ? (
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : null}
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                {step === 'details' && 'Delivery & Payment'}
                {step === 'card_entry' && 'Enter Card Details'}
                {step === 'processing' && 'Authorizing Payment...'}
                {step === 'success' && 'Order Placed!'}
              </h3>
              <p className="text-[10px] text-stone-500">
                {step === 'details' && `${cartCount} items · ₹${finalOrderTotal.toLocaleString('en-IN')}`}
                {step === 'card_entry' && 'Secure 256-bit encrypted card entry'}
                {step === 'processing' && 'Please do not refresh or close'}
                {step === 'success' && 'Boutique confirmation received'}
              </p>
            </div>
          </div>

          {step !== 'processing' && (
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep('details');
              }}
              className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* STEP 1: DELIVERY & PAYMENT DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleStartPurchase} className="p-4 overflow-y-auto space-y-4 text-xs">
            {/* Delivery Address */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-pink-500" />
                Shipping Destination
              </span>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-stone-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-stone-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-xl border border-stone-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-pink-500" />
                  Payment Method
                </span>
                <span className="text-[10px] text-stone-400 font-normal">Select payment mode</span>
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-pink-500 bg-pink-50/70 text-pink-700 font-bold ring-2 ring-pink-200'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="block text-xs">Card</span>
                  <span className="text-[9px] text-stone-400">Debit / Credit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-pink-500 bg-pink-50/70 text-pink-700 font-bold ring-2 ring-pink-200'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="block text-xs">UPI</span>
                  <span className="text-[9px] text-stone-400">GPay / PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-pink-500 bg-pink-50/70 text-pink-700 font-bold ring-2 ring-pink-200'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="block text-xs">COD</span>
                  <span className="text-[9px] text-stone-400">Cash on Del.</span>
                </button>
              </div>

              {/* CARD PAYMENT DETAILS SECTION */}
              {paymentMethod === 'card' && (
                <div className="p-3.5 bg-stone-50/90 rounded-2xl border border-stone-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-800">
                      Card Selection
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep('card_entry')}
                      className="text-[11px] text-pink-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Full Card Screen</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Saved Cards Picker */}
                  {savedCards.length > 0 && (
                    <div className="space-y-2">
                      {savedCards.map(c => (
                        <label
                          key={c.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                            selectedCardId === c.id
                              ? 'border-pink-500 bg-pink-50/50 ring-1 ring-pink-300'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="selectedCard"
                              checked={selectedCardId === c.id}
                              onChange={() => setSelectedCardId(c.id)}
                              className="accent-pink-600"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-xs text-stone-900">
                                  {c.cardNumber}
                                </span>
                                <span className="text-[9px] uppercase font-bold text-stone-500 bg-stone-100 px-1.5 rounded">
                                  {c.brand}
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-400 block">
                                {c.cardholderName} · Exp {c.expiryMonth}/{c.expiryYear}
                              </span>
                            </div>
                          </div>
                          {selectedCardId === c.id && (
                            <Check className="w-4 h-4 text-pink-600" />
                          )}
                        </label>
                      ))}

                      {/* Option to enter a new card */}
                      <label
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                          selectedCardId === 'new'
                            ? 'border-pink-500 bg-pink-50/50 ring-1 ring-pink-300'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="selectedCard"
                            checked={selectedCardId === 'new'}
                            onChange={() => setSelectedCardId('new')}
                            className="accent-pink-600"
                          />
                          <span className="text-xs font-bold text-stone-800">
                            Enter New Card Details
                          </span>
                        </div>
                        <span className="text-[10px] text-pink-600 font-semibold">
                          Custom
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Inline Card Entry if "new" or no saved cards */}
                  {(selectedCardId === 'new' || savedCards.length === 0) && (
                    <div className="pt-2 border-t border-stone-200 space-y-3">
                      <CardDetailsEntry
                        cardDetails={cardDetails}
                        setCardDetails={setCardDetails}
                        isCompact={true}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* UPI Options */}
              {paymentMethod === 'upi' && (
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
                  <span className="text-[11px] font-bold text-stone-800 block">
                    Instant UPI Payment
                  </span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 font-semibold text-stone-700">
                      GPay
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 font-semibold text-stone-700">
                      PhonePe
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 font-semibold text-stone-700">
                      Paytm
                    </span>
                  </div>
                  <input
                    type="text"
                    defaultValue="mehak@okhdfcbank"
                    placeholder="Enter UPI ID (e.g. yourname@upi)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-stone-200 text-xs font-mono font-medium focus:outline-none focus:border-pink-500"
                  />
                </div>
              )}

              {/* COD Option */}
              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1">
                  <span className="font-bold block">Cash on Delivery</span>
                  <p className="text-[11px] text-amber-700">
                    Pay ₹{finalOrderTotal.toLocaleString('en-IN')} in cash or UPI QR scan to the courier upon delivery.
                  </p>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Coupon ({appliedCoupon.code}):</span>
                  </span>
                  <span className="tabular-nums">-₹{couponDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Delivery:</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between pt-1.5 border-t border-pink-200 font-bold text-sm text-stone-900">
                <span>Final Payable:</span>
                <span className="text-pink-600 font-extrabold tabular-nums">
                  ₹{finalOrderTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Place Order (₹{finalOrderTotal.toLocaleString('en-IN')})</span>
            </button>
          </form>
        )}

        {/* STEP 2: DEDICATED FULL CARD ENTRY PAGE */}
        {step === 'card_entry' && (
          <div className="p-4 overflow-y-auto space-y-4 text-xs">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-stone-900">
                Credit or Debit Card Details
              </h4>
              <p className="text-[11px] text-stone-500">
                Enter your card credentials below. Changes update the live card preview immediately.
              </p>
            </div>

            <CardDetailsEntry
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              isCompact={false}
            />

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="flex-1 py-3 border border-stone-200 hover:bg-stone-50 rounded-xl text-stone-700 font-bold text-xs transition-colors"
              >
                Back to Checkout
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCardId('new');
                  setStep('details');
                  addToast({
                    title: 'Card Details Updated',
                    message: 'Card configured for this purchase.',
                    type: 'success'
                  });
                }}
                className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Use This Card</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ANIMATED PURCHASING / PROCESSING STAGE */}
        {step === 'processing' && (
          <div className="p-8 text-center space-y-6 my-auto">
            {/* Animated Laser Scanning Card Graphic */}
            <div className="relative w-48 h-28 mx-auto rounded-2xl bg-gradient-to-tr from-stone-900 via-rose-950 to-pink-900 p-3 shadow-2xl overflow-hidden border border-pink-500/40 animate-pulse">
              {/* Laser scanning beam line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent blur-xs shadow-lg shadow-pink-500 animate-[bounce_1.5s_infinite]" />
              
              <div className="flex justify-between items-center text-white/70 text-[9px]">
                <div className="w-6 h-5 rounded bg-yellow-400/80 border border-yellow-200" />
                <span className="font-mono text-pink-300 font-bold">3D SECURE</span>
              </div>
              <div className="mt-4 font-mono text-xs text-white tracking-widest text-left">
                •••• •••• •••• 8921
              </div>
              <div className="mt-2 flex justify-between text-[8px] text-white/60">
                <span>{name.toUpperCase()}</span>
                <span className="text-pink-300 font-bold">₹{finalOrderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Glowing Spinner */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 rounded-full border-4 border-pink-100 border-t-pink-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-pink-600">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Multi-step Status Indicator */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-stone-900 font-display">
                {processingStage === 1 && 'Verifying Payment Details...'}
                {processingStage === 2 && 'Connecting to Bank Gateway...'}
                {processingStage === 3 && 'Payment Authorized! Securing Order...'}
              </h4>

              <div className="flex justify-center items-center gap-2 text-xs text-stone-500">
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${processingStage >= 1 ? 'bg-pink-600 scale-125' : 'bg-stone-300'}`} />
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${processingStage >= 2 ? 'bg-pink-600 scale-125' : 'bg-stone-300'}`} />
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${processingStage >= 3 ? 'bg-emerald-600 scale-125' : 'bg-stone-300'}`} />
              </div>

              <p className="text-[11px] text-stone-400">
                Transaction of ₹{finalOrderTotal.toLocaleString('en-IN')} processed with 256-Bit SSL protection
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: CELEBRATORY ORDER CONFIRMED ANIMATION */}
        {step === 'success' && (
          <div className="p-6 text-center space-y-4 overflow-y-auto animate-in zoom-in-95 duration-500">
            {/* Animated Celebratory Gift Box & Expanding Ripple Ring */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              {/* Pulsating outer glowing ripple */}
              <div className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-emerald-500/20 animate-pulse" />
              
              {/* Luxury Boutique Package Icon */}
              <div className="relative w-18 h-18 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 text-white flex items-center justify-center shadow-xl shadow-pink-500/30 transform hover:scale-105 transition-transform">
                <Gift className="w-10 h-10 text-white animate-bounce" />
                {/* Sparkle badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-[10px] shadow">
                  ✨
                </div>
              </div>
            </div>

            {/* Celebration Titles */}
            <div>
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block animate-pulse">
                Order Placed Successfully!
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display mt-0.5">
                Thank You, {name.split(' ')[0]}!
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-mono font-bold mt-1.5">
                <span>ORDER ID:</span>
                <span>{createdOrder?.orderNumber}</span>
              </div>
            </div>

            {/* Order Receipt Card */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-left text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Items Ordered:</span>
                <span className="font-semibold text-stone-900">
                  {createdOrder?.items.reduce((s: number, i: any) => s + i.quantity, 0)} items
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Payment Mode:</span>
                <span className="font-semibold text-stone-900 uppercase">
                  {paymentMethod === 'card' ? 'Debit/Credit Card (•••• 8921)' : paymentMethod.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">3-4 Days Express</span>
              </div>
              <div className="flex items-center justify-between text-stone-600 pt-1.5 border-t border-stone-200">
                <span>Total Amount Paid:</span>
                <span className="font-extrabold text-pink-600 text-sm tabular-nums">
                  ₹{createdOrder?.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Live Tracking Timeline Visual */}
            <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100 text-left space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-pink-900">
                <span className="flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5 text-pink-600" />
                  Live Tracking Status
                </span>
                <span className="text-[10px] text-pink-600 font-mono">
                  {createdOrder?.trackingNo || 'TRK-IN-7829'}
                </span>
              </div>

              {/* Step indicator with active first step */}
              <div className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-1">
                <span className="text-pink-600 font-bold flex items-center gap-0.5">
                  <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping inline-block" />
                  Placed
                </span>
                <span>Packed</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            {/* Seller Console Jump */}
            <div className="p-3 bg-stone-900 text-white rounded-2xl text-left text-xs space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-pink-400 font-bold">
                <Truck className="w-4 h-4" />
                <span>Test Merchant Fulfillment</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-snug">
                This order has automatically arrived in the Seller console. You can switch roles to inspect and mark it dispatched!
              </p>
              <button
                type="button"
                onClick={handleViewInSellerDashboard}
                className="w-full py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>View Order in Seller Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Continue Shopping CTA */}
            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setStep('details');
                setCurrentScreen('buyer_dashboard');
              }}
              className="w-full py-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold"
            >
              Back to Boutique Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
