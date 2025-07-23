"use client";

import { useFetchOrdersByUser, useDeleteOrder } from "../hooks/useCreateOrder";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { MdRemoveShoppingCart } from "react-icons/md";
import MyOrderCard from "../components/auth/OrderCard";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";

// Helper: Group orders by formatted date
const groupOrdersByDate = (orders) => {
  const grouped = {};
  orders.forEach((order) => {
    const dateKey = new Date(order.date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(order);
  });
  return grouped;
};

export default function Order() {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const { data: orders = [], isLoading, isError } = useFetchOrdersByUser(userId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const deleteOrderMutation = useDeleteOrder();

  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const confirmDelete = () => {
    if (!orderToDelete) return;

    deleteOrderMutation.mutate(orderToDelete, {
      onSuccess: () => {
        toast.success(`Order #${orderToDelete.slice(-5)} deleted`);
        closeDeleteModal();
      },
      onError: () => {
        toast.error("Failed to delete order.");
        closeDeleteModal();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="p-10 max-w-6xl mx-auto space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse h-32 bg-slate-100 dark:bg-gray-700 rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (isError)
    return (
      <p className="p-10 text-center text-red-500 text-lg font-semibold">
        Failed to load your orders. Try again later.
      </p>
    );

  if (orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
        <MdRemoveShoppingCart className="text-6xl mb-4 text-indigo-400 dark:text-indigo-600" />
        <p className="text-2xl font-semibold">You haven't placed any orders yet.</p>
        <p className="text-sm mt-2">Start exploring your favorite jerseys now!</p>
      </div>
    );

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto bg-gray-200 min-h-screen rounded-xl">
      <h1 className="text-3xl font-extrabold mb-8 text-green-700 tracking-wide">
        My Orders
      </h1>

      {/* Render all orders without date grouping */}
      <div className="space-y-8">
        {orders.map((order) => (
          <MyOrderCard
            key={order._id}
            order={order}
            onDelete={openDeleteModal}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}
