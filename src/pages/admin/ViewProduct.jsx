import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  const getImageUrl = (filename) => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
    return filename ? `${BASE_URL}/uploads/${filename}` : "/no-image.png";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/admin/product" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
      </div>

      {/* Product Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image - Left Side */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Image</h3>
            <img
              src={getImageUrl(product.productImage)}
              alt={`${product.team} ${product.type} Jersey`}
              className="w-full max-w-md object-contain rounded border"
            />
          </div>

          {/* Text Information - Right Side */}
          <div className="space-y-4 mt-24 text-center">
            {/* Team */}
            <div>
              <p className="text-gray-800 font-semibold text-lg"><strong>Team</strong> = {product.team}</p>
            </div>

            {/* Type */}
            <div>
              <p className="text-gray-800 font-semibold text-lg"><strong>Type</strong> = {product.type}</p>
            </div>

            {/* Size */}
            <div>
              <p className="text-gray-800 font-semibold text-lg"><strong>Size</strong> = {product.size}</p>
            </div>

            {/* Price */}
            <div>
              <p className="text-gray-800 font-semibold text-lg"><strong>Price</strong> = Rs. {product.price}</p>
            </div>


          </div>
        </div>


      </div>
    </div>
  );
} 