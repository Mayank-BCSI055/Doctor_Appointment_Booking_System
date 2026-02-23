import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

const DATE_RANGES = {
  today: "Today",
  week: "Last 7 Days",
  month: "Last 30 Days",
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [range, setRange] = useState("week");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({});
  const [trend, setTrend] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [health, setHealth] = useState({});
  const [audits, setAudits] = useState([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [s, t, a, h, au] = await Promise.all([
        axiosInstance.get("/admin/dashboard-stats", { params: { range } }),
        axiosInstance.get("/admin/booking-trends", { params: { range } }),
        axiosInstance.get("/admin/alerts/overbooked-doctors"),
        axiosInstance.get("/admin/system-health"),
        axiosInstance.get("/admin/audit-preview"),
      ]);

      setStats(s.data);
      setTrend(t.data);
      setAlerts(a.data);
      setHealth(h.data);
      setAudits(au.data);
    } catch (err) {
      setError("Failed to load dashboard data. Please retry.");
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const exportCSV = async (type) => {
    const res = await axiosInstance.get(`/admin/export/${type}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}.csv`;
    link.click();
  };

  /* ---------- STATES ---------- */

  if (loading) {
    return <div className="state">Loading dashboard…</div>;
  }

  if (error) {
    return (
      <div className="state error">
        {error}
        <button onClick={loadDashboard}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <div className="header-controls">
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            {Object.entries(DATE_RANGES).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>

          <button onClick={() => exportCSV("appointments")}>
            ⬇ Export Appointments
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <Stat title="Doctors" value={stats.doctors} />
        <Stat title="Patients" value={stats.patients} />
        <Stat title="Appointments" value={stats.appointments} />
        <Stat title="Revenue" value={`₹ ${stats.revenue}`} />
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="alerts">
          <h2>⚠️ Action Required</h2>
          {alerts.map((a) => (
            <div key={a.doctorId} className="alert-item">
              <span>
                <strong>{a.doctor}</strong> overbooked
                ({a.booked}/{a.capacity})
              </span>

              <div className="alert-actions">
                <button onClick={() =>
                  navigate(`/admin/doctors/${a.doctorId}`)
                }>
                  View Doctor
                </button>
                <button onClick={() =>
                  navigate("/admin/availability")
                }>
                  Manage Slots
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Charts + Health */}
      <div className="grid-2">
        <div className="panel">
          <h2>Booking Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h2>System Health</h2>
          <HealthItem label="API Uptime" value={health.uptime} />
          <HealthItem label="Booking Failures" value={health.bookingFailures} />
          <HealthItem label="Slot Conflicts Prevented" value={health.conflicts} />
        </div>
      </div>

      {/* Audit Preview */}
      <div className="panel">
        <div className="panel-header">
          <h2>Recent Admin Actions</h2>
          <button onClick={() => navigate("/admin/audit-logs")}>
            View All
          </button>
        </div>

        {audits.length === 0 ? (
          <p className="empty">No recent actions</p>
        ) : (
          <ul className="audit-list">
            {audits.map((a) => (
              <li key={a.id}>
                <strong>{a.actor}</strong> {a.action} {a.entity}
                <span>{new Date(a.time).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Stat({ title, value }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function HealthItem({ label, value }) {
  return (
    <div className="health-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
