import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ userId, children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io("http://localhost:5050");
    newSocket.emit("join", userId);

    newSocket.on("orderStatusUpdate", (data) => {
      // Filter out notifications with "shipped" in the message
      if (/shipped/i.test(data.message)) {
        return; // Ignore shipped notifications
      }

      setNotifications((prev) => [data, ...prev.slice(0, 4)]); // Keep latest 5
      setUnreadCount((prev) => prev + 1);
    });

    // Listen for real-time product notifications
    newSocket.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev.slice(0, 4)]);
      setUnreadCount((prev) => prev + 1);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const markAllAsRead = () => setUnreadCount(0);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
