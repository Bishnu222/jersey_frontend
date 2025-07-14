import { 
  getAllOrdersApi,
  getOrdersByUserApi,
  createOrderApi,
  updateOrderStatusApi,
  deleteOrderApi 
} from "../api/orderApi";

//  Create a new order
export const createOrderService = async (data) => {
  try {
    const response = await createOrderApi(data);
    return response.data;
  } catch (error) {
    console.error("Create order failed:", error);
    throw error;
  }
};

//  Fetch all orders
export const getAllOrdersService = async () => {
  try {
    const response = await getAllOrdersApi();
    return response.data;
  } catch (error) {
    console.error("Fetch all orders failed:", error);
    throw error;
  }
};

//  Fetch orders by user
export const getOrdersByUserService = async (userId) => {
  try {
    const response = await getOrdersByUserApi(userId);
    return response.data;
  } catch (error) {
    console.error(`Fetch orders for user ${userId} failed:`, error);
    throw error;
  }
};

//  Update order status
export const updateOrderStatusService = async ({ orderId, status }) => {
  try {
    const response = await updateOrderStatusApi(orderId, status);
    return response.data;
  } catch (error) {
    console.error(`Update order ${orderId} failed:`, error);
    throw error;
  }
};

//  Delete order
export const deleteOrderService = async (orderId) => {
  try {
    const response = await deleteOrderApi(orderId);
    return response.data;
  } catch (error) {
    console.error(`Delete order ${orderId} failed:`, error);
    throw error;
  }
};
