import {
  getNotificationsByUserApi,
  markNotificationAsReadApi,
} from "../api/notificationApi"

// Fetch notifications for a specific user
export const fetchUserNotifications = async (userId) => {
  try {
    const response = await getNotificationsByUserApi(userId)
    return response.data
  } catch (error) {
    // Propagate error to caller for handling
    throw error
  }
}

// Mark a single notification as read by ID
export const markNotificationRead = async (notificationId) => {
  try {
    const response = await markNotificationAsReadApi(notificationId)
    return response.data
  } catch (error) {
    // Propagate error to caller for handling
    throw error
  }
}
