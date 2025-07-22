import React, { useState, useMemo } from 'react';
import { useAdminProduct } from '../hooks/admin/useAdminProduct';
import { useAdminCategory } from '../hooks/admin/useAdminCategory';
import { getBackendImageUrl } from '../utils/backendImage';
import { Plus, Shirt } from 'lucide-react';
import { useCart } from '../auth/CartContext';
import { toast } from 'react-toastify';

export default function Products() {
  const { products, isLoading: loadingProducts } = useAdminProduct();
  const { categories, isLoading: loadingCategories } = useAdminCategory();
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = Array.isArray(products) ? products : [];
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.categoryId === selectedCategory || p.categoryId?._id === selectedCategory
      );
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.team?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [products, selectedCategory, search]);

  const handleAddToCart = (jersey) => {
    addToCart(jersey);
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-black py-0 px-0">
      {/* Explore Jerseys Title */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg inline-flex items-center gap-3">
          <span className="text-4xl">🟢</span> Explore Jerseys
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filter/Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex gap-3 items-center w-full md:w-auto justify-center">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2 min-w-[160px] bg-white/90 text-gray-800 font-semibold shadow"
              disabled={loadingCategories}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search jerseys, teams..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-2 bg-white/90 text-gray-800 font-semibold shadow"
            />
          </div>
        </div>

        {/* Product Grid */}
        {loadingProducts ? (
          <div className="text-center text-gray-200 text-xl py-20">Loading jerseys...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((jersey) => (
              <div
                key={jersey._id}
                className="relative bg-white/90 border-2 border-yellow-400 rounded-2xl shadow-xl hover:scale-105 transition-transform p-4 flex flex-col items-center group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 rounded-full p-2 shadow-lg">
                  <Shirt size={32} className="text-green-900" />
                </div>
                <img
                  src={getBackendImageUrl(jersey.productImage)}
                  alt={jersey.name}
                  className="w-full h-44 object-contain bg-white rounded-xl border-2 border-green-800 mt-6 mb-3 shadow-md"
                />
                <h2 className="text-lg font-bold text-green-900 text-center mb-1">
                  {jersey.name || jersey.team}
                </h2>
                <p className="text-sm text-center text-gray-700 mb-2">
                  {jersey.description || jersey.type}
                </p>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-xl font-extrabold text-yellow-500">
                    Rs {jersey.price?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(jersey)}
                    className="bg-green-700 hover:bg-green-900 text-white px-4 py-2 rounded-full flex items-center gap-1 font-semibold shadow-lg group-hover:bg-yellow-400 group-hover:text-green-900 transition"
                  >
                    <Plus className="w-5 h-5" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-200 text-xl py-20">No jerseys found. Try a different search or category!</p>
        )}
      </div>
    </div>
  );
} 