"use client"
import React, { useContext } from "react"
import { useNotifications } from "../hooks/useNotification"
import { AuthContext } from "../auth/AuthProvider"
import { Link } from "react-router-dom"

export default function Notifications() {
  const { user } = useContext(AuthContext)
  const {
    notifications,
    unreadCount, // original unread count (not filtered)
    loading,
    error,
    markAsRead,
  } = useNotifications(user?._id)

  // Filter out "shipped" notifications
  const filteredNotifications = notifications.filter(
    (notif) => !/shipped/i.test(notif.message)
  )

  const filteredUnreadCount = filteredNotifications.filter((n) => !n.read).length

  // Mark all notifications as read
  const markAllRead = () => {
    filteredNotifications
      .filter((n) => !n.read)
      .forEach((notif) => markAsRead(notif._id))
  }

  // Format time and date
  const formatDateTime = (isoString) => {
    const date = new Date(isoString)
    const formattedDate = date.toLocaleDateString()
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${formattedDate} ${formattedTime}`
  }

  if (loading) return <div className="p-4 text-center text-gray-600">Loading notifications...</div>
  if (error)
    return <div className="p-4 text-center text-red-600 font-semibold">Error loading notifications</div>

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">Notifications</h1>

      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">No notifications yet.</p>
      )}

      {filteredNotifications.length > 0 && (
        <>
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              You have <strong className="text-indigo-600 dark:text-indigo-400">{filteredUnreadCount}</strong> unread notification
              {filteredUnreadCount !== 1 ? "s" : ""}
            </p>
            {filteredUnreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition"
              >
                Mark all as read
              </button>
            )}
          </div>

          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {filteredNotifications.map((notif) => (
              <li
                key={notif._id}
                className={`p-5 rounded-lg border ${
                  notif.read
                    ? "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-indigo-100 border-indigo-400 text-indigo-900 font-semibold shadow-md"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p>{notif.message}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
                <small className="block mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {formatDateTime(notif.createdAt)}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/normal/dash"
          className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
