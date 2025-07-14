import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  processing: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300",
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!order) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-sm"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 backdrop-blur-sm"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" aria-hidden="true" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-300 dark:border-gray-700">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-wide">
                  Order #{order._id.slice(-5)}
                </Dialog.Title>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User + Date + Status */}
              <div className="mb-5 space-y-1">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>User:</strong> {order.userId?.username || "Unknown"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${statusStyles[order.status]}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <hr className="my-4 border-gray-300 dark:border-gray-700" />

              {/* Product List */}
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-lg">Jersey Items</h3>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
                  {order.products.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center py-3 text-gray-800 dark:text-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-md border border-gray-300 dark:border-gray-600 shadow-sm"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                            📦
                          </div>
                        )}
                        <span className="font-medium text-sm">
                          {item.name} × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-300 text-sm">
                        Rs {formatCurrency(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-4 border-gray-300 dark:border-gray-700" />

              {/* Total */}
              <div className="text-right font-bold text-xl text-indigo-700 dark:text-indigo-300">
                Total: Rs {formatCurrency(order.total)}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
