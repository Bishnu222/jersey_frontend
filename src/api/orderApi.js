import axios from "./api"; // Make sure this is your configured axios instance

// Fetch all orders (for admin or user)
export const getAllOrdersApi = () => axios.get("/orders");

// Fetch orders by a specific user ID
export const getOrdersByUserApi = (userId) => axios.get(`/orders/user/${userId}`);

// Create a new order (typically called on checkout)
export const createOrderApi = (data) =>
  axios.post("/orders", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Update order status by order ID
export const updateOrderStatusApi = (orderId, status) =>
  axios.put(`/orders/${orderId}/status`, { status });

// Delete an order by ID
export const deleteOrderApi = (orderId) => axios.delete(`/orders/${orderId}`);
