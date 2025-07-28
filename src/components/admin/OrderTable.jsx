

import React, { useEffect, useState } from "react";
import { getAllOrdersService, deleteOrderService } from "../../services/orderService";
import { getBackendImageUrl } from '../../utils/backendImage';
import { useUpdateOrderStatus } from '../../hooks/useCreateOrder';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const updateOrderStatus = useUpdateOrderStatus();

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

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    setDeleting(orderId);
    try {
      await deleteOrderService(orderId);
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (error) {
      alert('Failed to delete order.');
    } finally {
      setDeleting(null);
    }
  };

  const handleUpdateStatus = (orderId, status) => {
    updateOrderStatus.mutate(
      { orderId, status },
      {
        onSuccess: (updatedOrder) => {
          setOrders(orders => orders.map(o => o._id === orderId ? { ...o, status } : o));
        }
      }
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">All Orders</h2>
      {loading ? (
        <p className="text-black">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-black">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="py-4 px-4 border-b text-black">User</th>
                <th className="py-4 px-4 border-b text-black">Email</th>
                <th className="py-4 px-4 border-b text-black">Products</th>
                <th className="py-4 px-4 border-b text-black">Status</th>
                <th className="py-4 px-4 border-b text-black">Total</th>
                <th className="py-4 px-4 border-b text-black">Date</th>
                <th className="py-4 px-4 border-b text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 border-b text-black">{order.userId?.username}</td>
                  <td className="py-4 px-4 border-b text-black">{order.userId?.email}</td>
                  <td className="py-6 px-4 border-b">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1">
                        {product.productImage && (
                          <img src={getBackendImageUrl(product.productImage)} alt={product.name} className="w-16 h-16 rounded object-cover border" />
                        )}
                        <span className="font-semibold text-base text-black">{product.name}</span>
                        <span className="text-xs text-black">x{product.quantity}</span>
                        <span className="text-xs text-black">Rs {product.price}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-4 border-b">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-b text-black">Rs {order.total.toFixed(2)}</td>
                  <td className="py-4 px-4 border-b text-black">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 border-b flex gap-2">
                    {order.status === 'pending' && (
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold"
                        onClick={() => handleUpdateStatus(order._id, 'processing')}
                        disabled={updateOrderStatus.isLoading}
                      >
                        {updateOrderStatus.isLoading ? 'Updating...' : 'Mark as Processing'}
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold"
                        onClick={() => handleUpdateStatus(order._id, 'completed')}
                        disabled={updateOrderStatus.isLoading}
                      >
                        {updateOrderStatus.isLoading ? 'Updating...' : 'Mark as Completed'}
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-bold"
                      onClick={() => handleDelete(order._id)}
                      disabled={deleting === order._id}
                    >
                      {deleting === order._id ? 'Deleting...' : 'Delete'}
                    </button>
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
