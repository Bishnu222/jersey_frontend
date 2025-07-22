import React, { useState, useContext } from 'react';
import { useCart } from '../auth/CartContext';
import { getBackendImageUrl } from '../utils/backendImage';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentMethodModal from '../components/payment/PaymentMethodModal';
import EsewaPayment from '../components/payment/EsewaPayment';
import footballImg from '../assets/home.png'; // Use your football/jersey image here
import { useCreateOrder } from '../hooks/useCreateOrder';
import { AuthContext } from '../auth/AuthProvider';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cashSuccess, setCashSuccess] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const createOrder = useCreateOrder(() => clearCart());

  const subtotal = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    setPaymentModalOpen(true);
  };

  const handleSelectPayment = (method) => {
    setSelectedPayment(method);
    setPaymentModalOpen(false);
  };

  const handleCashConfirm = () => {
    setCashLoading(true);
    // Defensive check for userId
    if (!user?._id) {
      toast.error('Cannot place order: user is not logged in or userId is missing.');
      setCashLoading(false);
      return;
    }
    // Create order in backend
    const orderPayload = {
      userId: user._id,
      products: cart.map(p => ({
        name: p.name || p.team,
        quantity: p.quantity,
        price: p.price,
        productImage: p.productImage,
      })),
      total: subtotal,
      status: 'pending',
      date: new Date().toISOString(),
    };
    console.log('Creating order with payload:', orderPayload);
    createOrder.mutate(orderPayload, {
      onError: (error) => {
        const backendMsg = error?.response?.data?.message;
        toast.error('Order creation failed: ' + (backendMsg || error?.message || 'Unknown error'));
        console.error('Order creation error:', error);
        setCashLoading(false);
      },
      onSuccess: (data) => {
        console.log('Order created successfully:', data);
      }
    });
    setTimeout(() => {
      setCashLoading(false);
      setCashSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen relative bg-gradient-to-br from-green-100 via-white to-green-50 overflow-hidden">
      {/* Football background illustration */}
      <img
        src={footballImg}
        alt="Football background"
        className="absolute opacity-25 w-[700px] h-[700px] object-contain top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
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
                onClick={handleProceedToCheckout}
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
            {/* Payment Modal */}
            <PaymentMethodModal
              isOpen={paymentModalOpen}
              onClose={() => setPaymentModalOpen(false)}
              onSelect={handleSelectPayment}
            />
            {/* Show payment option after selection */}
            {selectedPayment === 'online' && (
              <div className="mt-8">
                <EsewaPayment amount={subtotal} />
              </div>
            )}
            {selectedPayment === 'cash' && (
              <div className="mt-8 text-center">
                {cashSuccess ? (
                  <div className="text-2xl font-bold text-green-700 mb-4">Order placed successfully with Cash on Delivery!</div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-green-700 mb-4">Cash on Delivery Selected</div>
                    <button
                      onClick={handleCashConfirm}
                      disabled={cashLoading}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold text-lg"
                    >
                      {cashLoading ? 'Placing Order...' : 'Confirm Order'}
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 