import axios from "../api/api.js"; // Adjust this path to your axios instance

// Create a new order
export const createOrderService = async (data) => {
  const response = await axios.post("/orders", data);
  return response.data;
};

// Fetch all orders (admin/user view)
export const getAllOrdersService = async () => {
  const response = await axios.get("/orders");
  return response.data;
};

// Fetch orders by a specific user
export const getOrdersByUserService = async (userId) => {
  const response = await axios.get(`/orders/user/${userId}`);
  return response.data;
};

// Update order status
export const updateOrderStatusService = async ({ orderId, status }) => {
  const response = await axios.patch(`/orders/${orderId}`, { status });
  return response.data;
};

// Delete order
export const deleteOrderService = async (orderId) => {
  const response = await axios.delete(`/orders/${orderId}`);
  return response.data;
};
