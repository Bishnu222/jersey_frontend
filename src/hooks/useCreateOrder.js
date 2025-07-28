import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderService,
  getAllOrdersService,
  getOrdersByUserService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/orderService";
import { toast } from "react-toastify";

// Create Order Hook
export const useCreateOrder = (onSuccess, paymentMethod = 'online') => {
  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      if (paymentMethod === 'cash') {
        toast.success("Order placed successfully with Cash on Delivery!");
      } else {
        toast.success("Payment successful and order placed successfully!");
      }
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Failed to place order.");
    },
  });
};

// Fetch All Orders Hook
export const useFetchAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersService,
  });
};

// Fetch Orders by User Hook
export const useFetchOrdersByUser = (userId) => {
  return useQuery({
    queryKey: ["orders", "user", userId],
    queryFn: () => getOrdersByUserService(userId),
    enabled: !!userId,
  });
};

// Update Order Status Hook
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusService,
    onSuccess: () => {
      toast.success("Order status updated!");
      queryClient.invalidateQueries(["orders"]);
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });
};

// Delete Order Hook
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrderService,
    onSuccess: () => {
      toast.success("Order deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] }); // safer to invalidate both
    },
    onError: () => {
      toast.error("Failed to delete order.");
    },
  });
};
