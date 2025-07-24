import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByIdApi } from '../../api/admin/productApi';

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProductByIdApi(id);
        setProduct(res.data.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center text-gray-500">Product not found.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h1 className="text-2xl font-bold mb-4">{product.team} - {product.type}</h1>
      <img
        src={product.productImage ? `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050'}/uploads/${product.productImage}` : '/no-image.png'}
        alt={product.team}
        className="w-64 h-64 object-contain rounded mb-4 mx-auto border"
      />
      <div className="mb-2"><strong>Size:</strong> {product.size}</div>
      <div className="mb-2"><strong>Price:</strong> Rs. {product.price}</div>
      <div className="mb-2"><strong>Category:</strong> {product.categoryId?.name || product.categoryId}</div>
      <div className="mb-2"><strong>Quantity:</strong> {product.quantity}</div>
      <div className="mt-6 text-center">
        <a href="/admin/product" className="text-blue-600 hover:underline">Back to Product List</a>
      </div>
    </div>
  );
} 