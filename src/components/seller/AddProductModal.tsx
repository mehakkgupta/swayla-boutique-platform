import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, Plus, Sparkles, Image as ImageIcon } from 'lucide-react';

export const AddProductModal: React.FC = () => {
  const { isAddProductOpen, setIsAddProductOpen, addProduct, boutiqueProfile } = useApp();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(boutiqueProfile.categories[0] || 'Dresses');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('10');
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/bohemian_dress_1792561618461.jpg');

  if (!isAddProductOpen) return null;

  const presetImages = [
    { label: 'Dress', src: '/src/assets/images/bohemian_dress_1792561618461.jpg' },
    { label: 'Jacket', src: '/src/assets/images/vintage_leather_jacket_1792561588921.jpg' },
    { label: 'Scarf', src: '/src/assets/images/silk_scarf_luxury_1792561589300.jpg' },
    { label: 'Necklace', src: '/src/assets/images/beaded_necklace_gold_1792561589803.jpg' },
    { label: 'Handbag', src: '/src/assets/images/boho_chic_handbag_1792561590481.jpg' },
    { label: 'Sweater', src: '/src/assets/images/cashmere_sweater_1792561618672.jpg' },
    { label: 'Boots', src: '/src/assets/images/ankle_boots_leather_1792561618683.jpg' },
    { label: 'Shades', src: '/src/assets/images/designer_sunglasses_1792561617852.jpg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    addProduct({
      name,
      price: parseFloat(price) || 999,
      category,
      description: description || 'Artisanal piece crafted for your wardrobe.',
      inStock: true,
      stockCount: parseInt(stock) || 10,
      isLive: true,
      badge: 'New',
      image: selectedImage,
      boutiqueName: boutiqueProfile.name
    });

    setIsAddProductOpen(false);
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-sm w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header matching Figma screenshot */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900">Add Product</h3>
          <button
            onClick={() => setIsAddProductOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form matching Figma fields */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Silk Kurti"
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2499"
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Stock Available
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500 bg-white"
            >
              {boutiqueProfile.categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief story about the silhouette, fabric & styling..."
              className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Product Image Upload Section matching Figma */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1.5">
              Product Image
            </label>
            <div className="border-2 border-dashed border-stone-200 rounded-2xl p-3 flex flex-col items-center justify-center bg-stone-50 text-center">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1">
                <Upload className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-stone-800">Upload an image of your product</span>
              <span className="text-[9px] text-stone-400 mt-0.5">Or choose from photo gallery below:</span>

              {/* Gallery choices */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5 w-full">
                {presetImages.map(img => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.src ? 'border-pink-500 ring-2 ring-pink-200' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action button matching Figma "+ Add Product" */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>
        </form>
      </div>
    </div>
  );
};
