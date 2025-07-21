import { useState, useEffect } from "react"
import { fetchUserNotifications, markNotificationRead } from "../services/notificationService"

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    async function loadNotifications() {
      setLoading(true)
      setError(null)
      try {
        let data = await fetchUserNotifications(userId)

        // Filter out any notifications that mention "shipped"
        data = data.filter(n => !/shipped/i.test(n.message))

        setNotifications(data)
        setUnreadCount(data.filter(n => !n.read).length)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [userId])

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId)
      // Optimistically update locally
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      )
      setUnreadCount((count) => Math.max(count - 1, 0))
    } catch (err) {
      console.error(err)
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
  }
}
