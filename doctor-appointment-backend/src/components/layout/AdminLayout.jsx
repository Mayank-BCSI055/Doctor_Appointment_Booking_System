import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "./ThemeToggle";
import NotificationCenter from "../common/NotificationCenter";
import { AuthContext } from "../../auth/AuthContext";
import "./AdminLayout.css";

const SIDEBAR_COLLAPSED_KEY = "admin_sidebar_collapsed";
const SIDEBAR_WIDTH_KEY = "admin_sidebar_width";

export default function AdminLayout() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isResizing = useRef(false);

  const [collapsed, setCollapsed] = useState(
    localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true"
  );

  const [width, setWidth] = useState(
    Number(localStorage.getItem(SIDEBAR_WIDTH_KEY)) || 240
  );

  /* Persist sidebar state */
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed);
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, width);
  }, [width]);

  /* Resize handling */
  useEffect(() => {
    const onMove = (e) => {
      if (!isResizing.current) return;
      setWidth(Math.max(72, Math.min(320, e.clientX)));
    };

    const stop = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
    };
  }, []);

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{ width: collapsed ? 72 : width }}
      >
        <div className="sidebar-header">
          <span className="logo">{collapsed ? "A" : "Admin"}</span>
          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        <nav>
          <SidebarLink
            to="/admin"
            icon="📊"
            label="Dashboard"
            collapsed={collapsed}
          />

          {user?.role === "ADMIN" && (
            <>
              <SidebarLink
                to="/admin/doctors"
                icon="👨‍⚕️"
                label="Doctors"
                collapsed={collapsed}
              />
              <SidebarLink
                to="/admin/availability"
                icon="🗓️"
                label="Availability"
                collapsed={collapsed}
              />
              <SidebarLink
                to="/admin/appointments"
                icon="📅"
                label="Appointments"
                collapsed={collapsed}
              />
              <SidebarLink
                to="/admin/audit-logs"
                icon="🧾"
                label="Audit Logs"
                collapsed={collapsed}
              />
            </>
          )}
        </nav>

        {!collapsed && (
          <div
            className="resize-handle"
            onMouseDown={() => (isResizing.current = true)}
          />
        )}
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header">
          <Breadcrumbs pathname={location.pathname} />
          <div className="header-actions">
            <NotificationCenter />
            <ThemeToggle />
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

/* ---------- Sidebar Link ---------- */

function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <NavLink to={to} className="sidebar-link">
      {({ isActive }) => (
        <>
          <span className={`icon ${isActive ? "active-icon" : ""}`}>
            {icon}
          </span>
          {!collapsed && <span className="label">{label}</span>}
          {collapsed && <span className="tooltip">{label}</span>}
        </>
      )}
    </NavLink>
  );
}
