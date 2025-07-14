// ORDER HOOKS - jerseyHub

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrderService,
  getAllOrdersService,
  getOrdersByUserService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/orderService";
import { toast } from "react-toastify";

// Create Order
export const useCreateOrder = (onSuccess) => {
  return useMutation({
    mutationFn: createOrderService,
    onSuccess: () => {
      toast.success("Your order has been placed. Thank you!");
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("Failed to place order.");
    },
  });
};

// Get All Orders
export const useFetchAllOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersService,
  });
};

// Get Orders by User
export const useFetchOrdersByUser = (userId) => {
  return useQuery({
    queryKey: ["orders", "user", userId],
    queryFn: () => getOrdersByUserService(userId),
    enabled: !!userId,
  });
};

// Update Order Status
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

// Delete Order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrderService,
    onSuccess: () => {
      toast.success("Order deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] }); // safer pattern
    },
    onError: () => {
      toast.error("Failed to delete order.");
    },
  });
};
