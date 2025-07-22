import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 relative min-w-[320px] max-w-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
      <div className="fixed inset-0" onClick={onClose} />
    </div>
  );
} 