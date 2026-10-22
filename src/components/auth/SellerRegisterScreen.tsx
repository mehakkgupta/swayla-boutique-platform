import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Store, 
  Mail, 
  Lock, 
  Palette, 
  Check, 
  Upload, 
  Plus, 
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

export const SellerRegisterScreen: React.FC = () => {
  const { 
    setCurrentScreen, 
    setRole, 
    updateBoutiqueProfile, 
    addProduct, 
    addToast 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 Fields
  const [boutiqueName, setBoutiqueName] = useState('Aura Boutique');
  const [emailOrPhone, setEmailOrPhone] = useState('seller@swayla.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Step 2 Fields (Personalization)
  const [selectedTheme, setSelectedTheme] = useState('#FF4D8D');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Dresses', 'Accessories', 'Jewelry', 'Bags'
  ]);
  const [boutiqueLogo, setBoutiqueLogo] = useState<string>('');

  // Step 3 Fields (Add First Product)
  const [firstProductName, setFirstProductName] = useState('Embroidered Silk Kurti');
  const [firstProductPrice, setFirstProductPrice] = useState('2499');
  const [firstProductCategory, setFirstProductCategory] = useState('Dresses');
  const [firstProductDesc, setFirstProductDesc] = useState('Handcrafted silk kurti with zari embroidery.');
  const [firstProductStock, setFirstProductStock] = useState('15');

  const themes = [
    { name: 'Pink Chic', color: '#FF4D8D', border: 'border-pink-500' },
    { name: 'Pastel Blossom', color: '#F472B6', border: 'border-pink-400' },
    { name: 'Warm Sunset', color: '#F97316', border: 'border-orange-500' },
    { name: 'Elegant Gold', color: '#D97706', border: 'border-amber-600' },
    { name: 'Midnight Glam', color: '#8B5CF6', border: 'border-purple-500' }
  ];

  const availableCategories = [
    'Dresses', 'Shoes', 'Jewelry', 'Bags', 'Tops', 'Accessories', 'Ethnic Wear', 'Footwear', 'Outerwear'
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      addToast({ title: 'Please Accept Terms', message: 'You must accept the Terms & Conditions.', type: 'error' });
      return;
    }
    setStep(2);
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleStep2Submit = () => {
    updateBoutiqueProfile({
      name: boutiqueName,
      email: emailOrPhone.includes('@') ? emailOrPhone : 'seller@swayla.com',
      themeColor: selectedTheme,
      categories: selectedCategories
    });
    setStep(3);
  };

  const handleFinishWithoutProduct = () => {
    setRole('seller');
    setCurrentScreen('seller_dashboard');
    addToast({
      title: 'Boutique Created!',
      message: `Welcome to Swayla, ${boutiqueName}!`,
      type: 'success'
    });
  };

  const handleFinishWithProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstProductName || !firstProductPrice) return;

    addProduct({
      name: firstProductName,
      price: parseInt(firstProductPrice) || 1999,
      category: firstProductCategory,
      description: firstProductDesc,
      inStock: true,
      stockCount: parseInt(firstProductStock) || 10,
      isLive: true,
      badge: 'New',
      image: '/src/assets/images/bohemian_dress_1792561618461.jpg',
      boutiqueName: boutiqueName
    });

    setRole('seller');
    setCurrentScreen('seller_dashboard');
    addToast({
      title: 'Boutique & 1st Product Ready!',
      message: `${firstProductName} has been published to your store!`,
      type: 'success'
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white min-h-[700px]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (step > 1) setStep((step - 1) as 1 | 2);
              else setCurrentScreen('intro');
            }}
            className="w-9 h-9 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* 3 Step Dots */}
          <div className="flex gap-1.5">
            <span className={`h-2 rounded-full transition-all ${step === 1 ? 'w-5 bg-pink-500' : 'w-2 bg-stone-200'}`} />
            <span className={`h-2 rounded-full transition-all ${step === 2 ? 'w-5 bg-pink-500' : 'w-2 bg-stone-200'}`} />
            <span className={`h-2 rounded-full transition-all ${step === 3 ? 'w-5 bg-pink-500' : 'w-2 bg-stone-200'}`} />
          </div>

          <span className="text-[10px] uppercase font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
            Seller {step}/3
          </span>
        </div>

        {/* STEP 1: Account Info */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
                Create Your Account
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                Start selling to thousands of boutique shoppers today.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Boutique Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={boutiqueName}
                  onChange={(e) => setBoutiqueName(e.target.value)}
                  placeholder="Enter your boutique name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
                  required
                />
                <Store className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
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
                I accept the <a href="#terms" className="text-pink-600 underline">Terms and Conditions</a> and Merchant Agreement.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Personalize Boutique */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
                Personalize Boutique
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                Customize your storefront branding, palette, and specialties.
              </p>
            </div>

            {/* Logo Upload Box */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Boutique Logo
              </label>
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-4 flex flex-col items-center justify-center bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer text-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1.5">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-700">Tap to upload boutique logo</span>
                <span className="text-[10px] text-stone-400">PNG or JPG up to 5MB</span>
              </div>
            </div>

            {/* Store Theme */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Store Theme
              </label>
              <div className="flex gap-3">
                {themes.map(t => (
                  <button
                    key={t.color}
                    type="button"
                    onClick={() => setSelectedTheme(t.color)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      selectedTheme === t.color ? 'ring-4 ring-pink-200 scale-110' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: t.color }}
                    title={t.name}
                  >
                    {selectedTheme === t.color && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Product Categories
              </label>
              <p className="text-[11px] text-stone-400 mb-2">Select the collections featured in your shop:</p>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(cat => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-pink-600 text-white shadow-sm'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStep2Submit}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-2"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: Add First Product Decision */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display tracking-tight">
                Add first product now?
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                You can publish your first item immediately or jump right into your dashboard.
              </p>
            </div>

            <form onSubmit={handleFinishWithProduct} className="space-y-3.5 bg-pink-50/40 p-4 rounded-2xl border border-pink-100">
              <span className="text-xs font-bold text-pink-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                Quick First Product Form
              </span>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={firstProductName}
                  onChange={(e) => setFirstProductName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={firstProductPrice}
                    onChange={(e) => setFirstProductPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">Stock (pcs)</label>
                  <input
                    type="number"
                    value={firstProductStock}
                    onChange={(e) => setFirstProductStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={firstProductCategory}
                  onChange={(e) => setFirstProductCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-white"
                >
                  {selectedCategories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publish Item & Open Dashboard</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleFinishWithoutProduct}
                className="text-xs text-stone-500 hover:text-stone-800 font-semibold py-2 px-4 rounded-xl border border-stone-200 w-full hover:bg-stone-50 transition-colors"
              >
                Skip for now · Go to Seller Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 pb-2 text-center text-xs text-stone-400">
        Already registered?{' '}
        <button
          onClick={() => setCurrentScreen('login')}
          className="text-pink-600 font-semibold hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
