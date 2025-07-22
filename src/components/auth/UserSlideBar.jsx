"use client"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { getBackendImageUrl } from '../../utils/backendImage';
import React, { useEffect, useState } from 'react';

export default function UserSidebar({
    cart,
    isOpen,
    onClose,
    removeFromCart,
    updateQuantity,
    clearCart,
    onCheckout,
    highlightedId // new prop
}) {
    const subtotal = cart.reduce((total, product) => {
        const addonsTotal = (product.addons || []).reduce(
            (sum, addon) => sum + addon.price * addon.quantity * product.quantity,
            0
        );
        return total + product.price * product.quantity + addonsTotal;
    }, 0);

    // Remove local highlight state, use prop instead

    return (
        <>
            <div
                className={`fixed top-0 right-0 h-screen w-96 bg-[#1a1f3c] shadow-lg transform transition-transform duration-300 z-50
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">Your Jersey Cart</h3>
                    <button
                        onClick={onClose}
                        className="text-red-400 p-2 rounded-lg hover:bg-red-100/10"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
                    ) : (
                        cart.map((product) => (
                            <div key={product._id} className={`border-b border-gray-600 pb-4 transition-all duration-500 ${highlightedId === product._id ? 'bg-yellow-100/30 shadow-lg scale-[1.03]' : ''}`}>
                                <div className="flex gap-4">
                                    <img
                                        src={getBackendImageUrl(product.productImage)}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded border"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold">{product.name}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                disabled={product.quantity <= 1}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-white">{product.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <p className="text-blue-400 mt-1 font-bold text-sm">
                                            Rs {(
                                                product.price * product.quantity +
                                                (product.addons || []).reduce(
                                                    (sum, addon) => sum + addon.price * addon.quantity * product.quantity,
                                                    0
                                                )
                                            ).toLocaleString()}
                                        </p>

                                        {product.addons?.length > 0 && (
                                            <ul className="ml-3 mt-1 text-sm text-gray-300">
                                                {product.addons.map((addon, idx) => (
                                                    <li key={idx}>
                                                        {addon.name} x {addon.quantity} (+Rs {(addon.price * addon.quantity).toLocaleString()})
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="text-red-400 text-sm hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-5 border-t border-gray-700 space-y-4 bg-[#1a1f3c]">
                        <div className="flex justify-between text-lg font-medium text-white">
                            <span>Subtotal</span>
                            <span>Rs {subtotal.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full flex items-center justify-center gap-2 bg-red-100/10 hover:bg-red-100/20 text-red-400 py-2 rounded-lg"
                        >
                            <Trash2 size={16} />
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                />
            )}
        </>
    );
}
