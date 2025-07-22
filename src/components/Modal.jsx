import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay, click to close */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[320px] max-w-full z-10" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
} 