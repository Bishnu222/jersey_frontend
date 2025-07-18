// src/components/admin/OrderTable.jsx

import React, { useEffect, useState } from "react";
import { getAllOrdersService } from "../../services/orderService"; // Adjust path if needed

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrdersService();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Products</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order.userId?.username}</td>
                  <td className="py-2 px-4 border-b">{order.userId?.email}</td>
                  <td className="py-2 px-4 border-b">
                    {order.products.map((product, index) => (
                      <div key={index}>
                        <p>
                          <strong>{product.name}</strong> (x{product.quantity}) - Rs {product.price}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">{order.status}</td>
                  <td className="py-2 px-4 border-b">Rs {order.total.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
