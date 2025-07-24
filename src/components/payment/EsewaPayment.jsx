import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function EsewaPayment({ amount, orderPayload, createOrder, clearCart }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handlePayment() {
    setMessage('');
    setLoading(true);
    setSuccess(false);
    // Simulate payment processing delay
    setTimeout(() => {
      // After payment, place the order
      createOrder.mutate(orderPayload, {
        onError: (error) => {
          const backendMsg = error?.response?.data?.message;
          toast.error('Order creation failed: ' + (backendMsg || error?.message || 'Unknown error'));
          setMessage('Order creation failed!');
          setLoading(false);
        },
        onSuccess: (data) => {
          setSuccess(true);
          setMessage('Payment and order placed successfully!');
          clearCart();
          setLoading(false);
        }
      });
    }, 1200);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!success && (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-[#b91c1c] hover:bg-red-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-50 transition"
        >
          {loading ? 'Processing...' : `Pay Rs ${amount} with eSewa`}
        </button>
      )}
      {message && <p className="text-green-600 text-lg font-bold">{message}</p>}
    </div>
  );
}
