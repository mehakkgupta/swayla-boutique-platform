import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Save } from 'lucide-react';

export const EditProductModal: React.FC = () => {
  const { isEditProductOpen, setIsEditProductOpen, selectedProduct, updateProduct, boutiqueProfile } = useApp();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price.toString());
      setStock(selectedProduct.stockCount.toString());
      setCategory(selectedProduct.category);
      setDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  if (!isEditProductOpen || !selectedProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(selectedProduct.id, {
      name,
      price: parseFloat(price) || selectedProduct.price,
      stockCount: parseInt(stock) || selectedProduct.stockCount,
      inStock: parseInt(stock) > 0,
      category,
      description
    });
    setIsEditProductOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-sm font-bold text-stone-900">Edit Product Details</h3>
          <button
            onClick={() => setIsEditProductOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Stock (pcs)</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white"
            >
              {boutiqueProfile.categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-3"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Product Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};
