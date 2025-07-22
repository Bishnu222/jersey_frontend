import React, { useState, useMemo } from 'react';
import { useAdminProduct } from '../hooks/admin/useAdminProduct';
import { useAdminCategory } from '../hooks/admin/useAdminCategory';
import { getBackendImageUrl } from '../utils/backendImage';
import { Plus, Shirt } from 'lucide-react';
import { useCart } from '../auth/CartContext';
import { toast } from 'react-toastify';
// import footballField from '../assets/football-field.svg'; // Uncomment if you have a field SVG

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
    <div
      className="min-h-screen relative"
      style={{
        background: 'radial-gradient(circle at 60% 40%, #a7f3d0 0%, #14532d 100%)',
      }}
    >
      {/* Football field SVG overlay (optional) */}
      {/* <img
        src={footballField}
        alt="Football field background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        style={{ zIndex: 0 }}
      /> */}
      <div className="relative z-10">
        {/* Improved Filter/Search Bar */}
        <div className="max-w-7xl mx-auto pt-12 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="border rounded-xl px-4 py-3 min-w-[180px] bg-white/90 text-gray-800 font-semibold shadow focus:ring-2 focus:ring-green-400"
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
              className="border rounded-xl px-4 py-3 bg-white/90 text-gray-800 font-semibold shadow focus:ring-2 focus:ring-blue-400 min-w-[220px]"
            />
          </div>
        </div>
        {/* Product Grid with glassy effect */}
        <div className="max-w-7xl mx-auto pb-16">
          <div className="rounded-3xl bg-white/60 backdrop-blur-md shadow-2xl p-8">
            {loadingProducts ? (
              <div className="text-center text-gray-200 text-xl py-20">Loading jerseys...</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredProducts.map((jersey) => (
                  <div
                    key={jersey._id}
                    className="relative bg-white/90 border-2 border-yellow-400 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl hover:border-green-500 transition-transform duration-200 p-4 flex flex-col items-center group"
                    style={{ minHeight: 420 }}
                  >
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
      </div>
    </div>
  );
} 