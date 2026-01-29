import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./NotificationCenter.css";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000); // polling
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  };

  const markAsRead = async (id) => {
    await axiosInstance.patch(`/admin/notifications/${id}/read`);
    fetchNotifications();
  };

  const clearAll = async () => {
    await axiosInstance.delete("/admin/notifications");
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-wrapper">
      <button className="bell" onClick={() => setOpen(!open)}>
        🔔
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>

      {open && (
        <div className="notification-panel">
          <div className="panel-header">
            <span>Notifications</span>
            <button onClick={clearAll} className="clear-btn">
              Clear
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="empty">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`notification ${n.read ? "read" : ""}`}
                onClick={() => markAsRead(n.id)}
              >
                <p className="title">{n.title}</p>
                <p className="message">{n.message}</p>
                <span className="time">
                  {new Date(n.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
