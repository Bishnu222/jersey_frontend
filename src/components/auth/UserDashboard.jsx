"use client"

import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { ShoppingCart, Plus } from "lucide-react"
import { getBackendImageUrl } from '../utils/backendImage'
import { useAdminProduct } from '../hooks/admin/useAdminProduct'
import { useCreateOrder } from "../hooks/useCreateOrder"
import UserSidebar from "../components/UserSidebar"
import { AuthContext } from "../auth/AuthProvider"

const JerseyUserDashboard = () => {
  const { user } = useContext(AuthContext)
  const { products, isLoading, isError } = useAdminProduct()
  const { createOrder } = useCreateOrder()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOrderSubmit = async () => {
    if (!selectedProduct) return
    await createOrder({ productId: selectedProduct._id, userId: user._id })
    setSelectedProduct(null)
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <UserSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Browse Jerseys</h1>

        {isLoading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">Loading jerseys...</div>
        ) : isError ? (
          <div className="text-center text-red-500">Failed to load jerseys</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((jersey) => jersey.category !== "Custom Jersey")
              .map((jersey) => (
                <div
                  key={jersey._id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-xl transition p-4 flex flex-col"
                >
                  <img
                    src={getBackendImageUrl(jersey.productImage)}
                    alt={jersey.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-1">
                    {jersey.name}
                  </h2>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                    {jersey.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      Rs {jersey.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(jersey)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Confirm Order</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Are you sure you want to order <strong>{selectedProduct.name}</strong>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrderSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default JerseyUserDashboard
