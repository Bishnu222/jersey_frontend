import { FaTruck, FaStore } from "react-icons/fa";
import React from "react";

export default function OrderTypeModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl text-center space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
          Choose Delivery Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          How would you like to receive your jersey order?
        </p>

        <div className="flex justify-center gap-6">
          {/* Home Delivery */}
          <button
            onClick={() => onSelect("delivery")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl flex flex-col items-center transition duration-200 w-32"
          >
            <FaTruck className="text-3xl mb-2" />
            <span className="text-sm font-medium">Home Delivery</span>
          </button>

          {/* Store Pickup */}
          <button
            onClick={() => onSelect("pickup")}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-4 rounded-xl flex flex-col items-center transition duration-200 w-32"
          >
            <FaStore className="text-3xl mb-2" />
            <span className="text-sm font-medium">Store Pickup</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
