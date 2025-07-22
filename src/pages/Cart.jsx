import React from 'react';
import { useCart } from '../auth/CartContext';
import { getBackendImageUrl } from '../utils/backendImage';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, onCheckout } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-green-800">My Cart</h1>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Trash2 className="text-6xl mb-4 text-green-400" />
          <p className="text-2xl font-semibold">Your cart is empty.</p>
          <button onClick={() => navigate('/products')} className="mt-6 bg-green-700 hover:bg-green-900 text-white px-6 py-2 rounded-full font-bold">Shop Now</button>
        </div>
      ) : (
        <>
          <div className="space-y-6 mb-8">
            {cart.map((product) => (
              <div key={product._id} className="flex gap-4 items-center bg-white border rounded-xl shadow p-4">
                <img
                  src={getBackendImageUrl(product.productImage)}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded border"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-green-900">{product.name}</h4>
                  <p className="text-gray-600">Rs {product.price?.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product._id, product.quantity - 1)}
                      disabled={product.quantity <= 1}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-semibold">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product._id, product.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xl font-bold text-green-700">Rs {(product.price * product.quantity).toLocaleString()}</span>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 flex flex-col gap-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-700 hover:bg-green-900 text-white font-semibold py-3 rounded-full text-lg"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-full"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
} 